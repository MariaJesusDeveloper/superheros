import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './modules/angular-material/angular-material.module';
import { SuperHeroComponent } from './components/super-hero/super-hero.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogOverviewComponent } from './components/dialog-overview/dialog-overview.component';
import { InputUpperCaseDirective } from './directives/uppercase.directive';
import { SpinnerInterceptor } from './interceptors/spinner-interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    SuperHeroComponent,
    DialogOverviewComponent,
    InputUpperCaseDirective,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ],
  exports: [
    NgxSpinnerModule
  ],
  providers:
  [
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
