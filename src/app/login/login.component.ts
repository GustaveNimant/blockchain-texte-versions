import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router }                       from '@angular/router';
import { ProfilModel }               from '../models/profil.model';
import { ProfilService }            from '../services/profil.service';
import { StateService }                 from '../services/state.service';
import { Subscription }                 from 'rxjs';

import * as O from '../outils/outils-management';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit, OnDestroy {

    public loginForm: FormGroup;

    public currentUrl: string;
    public currentEmail: string;
    public userId: string;
    public errorMessage: string;
    public errorSubMessage: string;

    private currentUrlSub: Subscription;
    private currentSub: Subscription;

    public loading = false;
    public debug: boolean;
    
    constructor(private stateService: StateService,
		private formBuilder: FormBuilder,
		private router: Router,
		private profilService: ProfilService)
		{
		    O.constructorLog(O.functionName());
		}

    ngOnInit() {
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00', here);
	
	this.debug = this.stateService.debug;
	console.log('Dans',here,'debug', this.debug);

	this.stateService.mode$.next('form');

	this.loginForm = this.formBuilder.group({
	    email: [null, [Validators.required, Validators.email]],
	    password: [null, [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
	});

    	this.currentUrlSub = this.stateService.currentUrl$.subscribe(
	    (url) => {
		this.currentUrl = url;
		console.log('Dans',here,'currentUrl', this.currentUrl);
	    }
	);
    }

    onLogin() {
	let here = O.functionName();
	console.log('%cEntrée dans','color: #00aa00', here);;
	
	this.loading = true;

	const email = this.loginForm.get('email').value;
	const password = this.loginForm.get('password').value;

	console.log('Dans',here,'email', email);
	console.log('Dans',here,'password', password);

	this.profilService.login(email, password)
	    .then(
		() => {
		    this.loginForm.reset();
		    this.loading = false;
		    
		    this.profilService.isAuth$.next(true); /* Improve ? */

		    console.log('Dans onLogin currentUrl >', this.currentUrl,'<');
		    if (this.currentUrl && this.currentUrl != '/login') {
			this.router.navigate([this.currentUrl]);
		    } else {
			this.router.navigate(['/main-menu']);
		    }
		}
	    )
	    .catch(
		(error) => {
		    switch (error.status) {
			case 0:
			    this.errorSubMessage = 'Dans backend lancer nodemon server';
			    break;
			case 401:
			    this.errorSubMessage = 'Créer la profil avec ces paramètres';
			    console.log('Dans onLogin.login navigation vers','/profils/new-profil' + '/' + email);
			    this.router.navigate(['/profils/new-profil' + '/' + email]);
			    break;
			default:
			    this.errorMessage = error.message;
			    break;
		    }
		    console.log('Dans onLogin Erreur', error);
		    this.errorMessage = this.errorSubMessage + ' '+ error.message;
		    this.loading = false;
		}
	    );

    }

    ngOnDestroy() {
	let here = O.functionName();
	console.log('%cEntrée dans','color: #aa0000', here);	
	
	this.currentUrlSub.unsubscribe();
	O.unsubscribeLog(here, 'currentUrlSub');
    }

}
