import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { SigninComponent } from "./signin/signin.component";
import { DataService } from "./data.service";
import { ReactiveFormsModule } from "@angular/forms";
import { SignupComponent } from "./signup/signup.component";
import { TasklistComponent } from "./tasklist/tasklist.component";
import { AddoreditcomponentComponent } from "./addoreditcomponent/addoreditcomponent.component";
import { StoreModule } from "@ngrx/store";
import { Reducer } from "./store/reducer/reducer";
import { EffectsModule } from "@ngrx/effects";
import { AppEffect } from "./store/effects/appEffects";

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    TasklistComponent,
    AddoreditcomponentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ app: Reducer }),
    EffectsModule.forRoot([AppEffect]),
  ],
  providers: [DataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
