import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';

export interface DialogData {
  superHeroName: string;
  superheroExists: boolean;
  matDialogTitle: string;
  delete: boolean
}

@Component({
  selector: 'app-dialog-overview',
  templateUrl: './dialog-overview.component.html',
  styleUrls: ['./dialog-overview.component.scss']
})
export class DialogOverviewComponent implements OnInit {
  newSuperHeroForm!: FormGroup;
  numMaxCharactersName: number;

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _formBuilder: FormBuilder,
    private _cdref: ChangeDetectorRef
  ) {
    this.numMaxCharactersName = 20;
    // this.data.superheroExists = true;
    // this.data.superHeroName = "";
  }

  ngOnInit(): void {
    this.initNewnewSuperHeroName();
  }

  ngAfterContentChecked() {
    this._cdref.detectChanges()
  }

  initNewnewSuperHeroName() {
    this.newSuperHeroForm = this._formBuilder.group({
      name: [{ value: null, disabled: this.data.delete }, [Validators.required, Validators.maxLength(20)]],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
