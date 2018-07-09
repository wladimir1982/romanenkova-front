import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AppRoutingModule} from './app-routing.module';

import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {IndexModule} from './pages/_index/index.module';
import {Page404Module} from './pages/_page404/page404.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    IndexModule,
    Page404Module
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
