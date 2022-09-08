import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { GoalComponent } from './goal/goal.component';
import {MenubarModule} from 'primeng/menubar';
import {HttpClientModule} from '@angular/common/http';
import {DataViewModule} from 'primeng/dataview';
import {ButtonModule} from 'primeng/button';
import { FormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GoalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    MenubarModule,
    HttpClientModule,
    DataViewModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ 
    FormBuilder
    //FormGroup
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
