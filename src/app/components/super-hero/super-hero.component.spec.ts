import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { SuperHeroComponent } from './super-hero.component';

describe('SuperHeroComponent', () => {
  let component: SuperHeroComponent;
  let fixture: ComponentFixture<SuperHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperHeroComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        HttpClientModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuperHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('initSuperHerosForm', () => {
    expect(component).toBeTruthy();
  });

  it('openCreateDialog', () => {
    expect(component).toBeTruthy();
  });

  it('openEditDialog', () => {
    expect(component).toBeTruthy();
  });

  it('openDeleteDialog', () => {
    expect(component).toBeTruthy();
  });

  it('getAllSuperHeros', () => {
    expect(component).toBeTruthy();
  });

  it('getSuperHeros', () => {
    expect(component).toBeTruthy();
  });

  it('calculateSuperHeros', () => {
    expect(component).toBeTruthy();
  });

  it('createNewSuperHero', () => {
    expect(component).toBeTruthy();
  });

  it('updateSuperHero', () => {
    expect(component).toBeTruthy();
  });

  it('deleteSuperHero', () => {
    expect(component).toBeTruthy();
  });

  it('applyFilter', () => {
    expect(component).toBeTruthy();
  });

  it('getAllSuperHerosIncludeName', () => {
    expect(component).toBeTruthy();
  });

  it('onClickSuperHero', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnDestroy', () => {
    expect(component).toBeTruthy();
  });
});
