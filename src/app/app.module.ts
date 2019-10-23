import { MatProgressSpinnerModule } from '@angular/material';

import { ProfilInterceptor }     from './interceptors/profil-interceptor';

import { AppRoutingModule }         from './app-routing.module';
import { BrowserAnimationsModule }          from '@angular/platform-browser/animations';
import { BrowserModule }                    from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule }                         from '@angular/core';



import { AppComponent } from './app.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { HeaderComponent } from './header/header.component';

import { TextesComponent }               from './textes/textes.component';

import { ListTexteComponent }             from './textes/list-texte/list-texte.component';
import { ModifyTexteComponent }           from './textes/modify-texte/modify-texte.component';
import { NewTexteComponent }              from './textes/new-texte/new-texte.component';
import { NewTexteVersionComponent }       from './textes/new-texte-version/new-texte-version.component';
import { SingleTexteComponent }           from './textes/single-texte/single-texte.component';


import { PairsComponent }       from './pairs/pairs.component';
import { ListPairComponent }         from './pairs/list-pair/list-pair.component';
import { ModifyPairComponent }       from './pairs/modify-pair/modify-pair.component';
import { NewPairComponent }          from './pairs/new-pair/new-pair.component';
import { SinglePairComponent }       from './pairs/single-pair/single-pair.component';

import { NotationsComponent }       from './notations/notations.component';
import { ListNotationComponent }    from './notations/list-notation/list-notation.component';
import { NewNotationComponent }     from './notations/new-notation/new-notation.component';
import { SingleNotationComponent }  from './notations/single-notation/single-notation.component';
import { ByobjectidNotationComponent }     from './notations/byobjectid-notation/byobjectid-notation.component';

import { ProfilComponent }        from './profils/profil.component';
import { NewProfilComponent }       from './profils/new-profil/new-profil.component';
import { SingleProfilComponent }    from './profils/single-profil/single-profil.component';

import { LoginComponent }           from './login/login.component';
import { DernierBlocComponent }     from './dernier-bloc/dernier-bloc.component';

@NgModule({
    declarations: [
	AppComponent,
	PairsComponent,
	ByobjectidNotationComponent,
	ProfilComponent,
	HeaderComponent,
	ListPairComponent,
	ListNotationComponent,
	ListTexteComponent,
	LoginComponent,
	MainMenuComponent,
	ModifyPairComponent,
	ModifyTexteComponent,
	NewPairComponent,
	NewProfilComponent,
	NewNotationComponent,
	NewTexteComponent,
	NewTexteVersionComponent,
	NotationsComponent,
	SinglePairComponent,
	SingleProfilComponent,
	SingleNotationComponent,
	SingleTexteComponent,
	TextesComponent,
	DernierBlocComponent,
    ],
    imports: [
	BrowserModule,
	AppRoutingModule,
	FormsModule,
	ReactiveFormsModule,
	BrowserAnimationsModule,
	MatProgressSpinnerModule,
	HttpClientModule
    ],
    providers: [
	{
	    provide: HTTP_INTERCEPTORS,
	    useClass: ProfilInterceptor,
	    multi: true
	}
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
