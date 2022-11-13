import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { SuperHero } from 'src/app/models/super-hero.model';
import { SuperHerosService } from 'src/app/services/super-heroes.service';
import { MatPaginator } from '@angular/material/paginator';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogOverviewComponent } from 'src/app/components/dialog-overview/dialog-overview.component';
import { MatListOption } from '@angular/material/list';
import { SpinnerService } from 'src/app/services/spinner.service';
import { HttpClient } from '@angular/common/http';
import { SUPERHEROS } from 'src/app/mocks/mock-super-heros';

@Component({
  selector: 'app-super-hero',
  templateUrl: './super-hero.component.html',
  styleUrls: ['./super-hero.component.scss']
})

export class SuperHeroComponent implements OnInit {
  private _subscriptions: Subscription[] = [];
  allSuperHeros: SuperHero[];
  showSuperHeros: SuperHero[];
  pageSize: number;
  pageIndex: number;
  lengthResults: number;
  inputValue = '';
  superHerosForm!: FormGroup;
  numMaxCharactersFilter: number;

  superHeroName: string;
  superHeroSelected!: SuperHero;
  selectedElement: boolean;

  constructor(
    private _superHerosService: SuperHerosService,
    private _formBuilder: FormBuilder,
    public dialog: MatDialog,
    private _spinnerService: SpinnerService,
    private http: HttpClient
  ) {
    this.allSuperHeros = [];
    this.showSuperHeros = [];
    this.pageSize = 5;
    this.pageIndex = 0;
    this.numMaxCharactersFilter = 10;
    this.lengthResults = 0;
    this.superHeroName = "";
    this.selectedElement = false;
  }

  ngOnInit(): void {
    this.initSuperHerosForm();
    this.getAllSuperHeros();
  }

  initSuperHerosForm() {
    this.superHerosForm = this._formBuilder.group({
      filter: [null, Validators.maxLength(this.numMaxCharactersFilter)]
    });
  }

  openCreateDialog(superHeroName: string, superheroExists: boolean = false): void {
    const dialogRef = this.dialog.open(DialogOverviewComponent, {
      width: '250px',
      data: {
        superHeroName: superHeroName.toUpperCase(),
        superheroExists: superheroExists,
        matDialogTitle: 'Nuevo superhéroe',
        delete: false
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.superHeroName = result;
      if (this.superHeroName) {
        this.createNewSuperHero(this.superHeroName);
      }
    });
  }

  openEditDialog(superHeroName: string, superheroExists: boolean = false): void {
    if (this.superHeroSelected) {
      const dialogRef = this.dialog.open(DialogOverviewComponent, {
        width: '250px',
        data: {
          superHeroName: this.superHeroSelected.name,
          superheroExists: superheroExists,
          matDialogTitle: 'Editar superhéroe',
          delete: false
        },
      });

      dialogRef.afterClosed().subscribe(result => {
        this.superHeroName = result;
        if (this.superHeroName) {
          this.superHeroSelected.name = this.superHeroName;
          this.updateSuperHero(this.superHeroSelected);
        }
      });
    }
  }

  openDeleteDialog(superHeroName: string, superheroExists: boolean = false): void {
    if (this.superHeroSelected) {
      const dialogRef = this.dialog.open(DialogOverviewComponent, {
        width: '250px',
        data: {
          superHeroName: this.superHeroSelected.name,
          superheroExists: superheroExists,
          matDialogTitle: '¿Está seguro de borrar superhéroe?',
          delete: true
        },
      });

      dialogRef.afterClosed().subscribe(result => {
        this.superHeroName = result;
        if (this.superHeroName) {
          this.deleteSuperHero();
        }
      });
    }
  }

  getAllSuperHeros() {
    this._subscriptions.push(
      this._superHerosService.
        getAllSuperHeros().
        subscribe(
          allSuperHeros => {
            this.allSuperHeros = allSuperHeros;
            this.showSuperHeros = this.allSuperHeros.slice(0, this.pageSize);
            this.lengthResults = this.allSuperHeros.length;
          }
        )
    );
  }

  getSuperHeros(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;

    this.calculateSuperHeros();
  }

  calculateSuperHeros() {
    let sliceStart = this.pageIndex * this.pageSize;
    let sliceEnd = sliceStart + this.pageSize;
    this.showSuperHeros = this.allSuperHeros.slice(sliceStart, sliceEnd);
    this.lengthResults = this.allSuperHeros.length;
  }

  createNewSuperHero(name: string) {
    this.http.get<any>('https://httpbin.org/get').subscribe(data => {
      this._subscriptions.push(
        this._superHerosService.
          getSuperHeroByName(name).
          subscribe(
            superHero => {
              if (superHero) {
                this.openCreateDialog(superHero.name, true);
              } else {
                this._subscriptions.push(
                  this._superHerosService.
                    createNewSuperHero(name.toLocaleUpperCase()).
                    subscribe(
                      numSuperHeros => {
                        console.log(numSuperHeros);
                        this.lengthResults = numSuperHeros;
                        this.pageIndex = Math.ceil(this.lengthResults / this.pageSize) - 1;
                        this.calculateSuperHeros();
                      }
                    )
                );
              }
            }
          )
      );
    });
  }

  updateSuperHero(superHero: SuperHero) {
    this.http.get<any>('https://httpbin.org/get').subscribe(data => {
      this._subscriptions.push(
        this._superHerosService.
          updateSuperHero(superHero.id, superHero.name.toLocaleUpperCase()).
          subscribe(
            superHeroName => {
              console.log('superHeroName: ', superHeroName);
            }
          )
      );
    });
  }

  deleteSuperHero() {
    this.http.get('https://httpbin.org/get').pipe().subscribe(data => {
      this._subscriptions.push(
        this._superHerosService.
          deleteSuperHero(this.superHeroSelected.id).
          subscribe(
            superHeroDeleted => {
              this.selectedElement = false;
              let event = {
                pageIndex: this.pageIndex,
                pageSize: this.pageSize
              }
              this.getSuperHeros(event);
            }
          )
      );
    });
  }

  applyFilter(event: any) {
    let filter = this.superHerosForm.get('filter')?.value;
    this.getAllSuperHerosIncludeName(filter);
  }

  getAllSuperHerosIncludeName(filter: string) {
    this._subscriptions.push(
      this._superHerosService.
        getAllSuperHerosIncludeName(filter).
        subscribe(
          superHeros => {
            this.allSuperHeros = superHeros;
            this.pageIndex = 0;
            this.lengthResults = superHeros.length;
            this.calculateSuperHeros();
          }
        )
    );
  }

  onClickSuperHero(event: any) {
    this.superHeroSelected = event;
    this.selectedElement = true;
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach(subs => {
      subs.unsubscribe();
    });
  }

}
