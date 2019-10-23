import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription }       from 'rxjs';
import { StateService }        from '../services/state.service';
import { ProfilService }       from '../services/profil.service';
import { Router }             from '@angular/router';
import { ProfilModel } from '../models/profil.model';

import * as O from '../outils/outils-management';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit, OnDestroy {

    public mode: string;
    public isAuth: boolean;
    public debug: boolean;
    public trace: boolean;
    public verbose: boolean;

    private modeSub: Subscription;
    private currentPseudoSub: Subscription;
    private currentEmailSub: Subscription;
    private isAuthSub: Subscription;
    private verboseSub: Subscription;

    private currentEmail: string;
    public pseudo: string;

    private currentProfil = new ProfilModel();

    constructor(private stateService: StateService,
		private profilService: ProfilService,
		private router: Router)
		{
		    O.constructorLog(O.functionName());
		};

    ngOnInit() {
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00', here);

	this.modeSub = this.stateService.mode$.subscribe(
	    (mod) => {
		this.mode = mod;
	    }
	);
	console.log('Dans',here,'subscribe.mode',this.mode);
	
	this.isAuthSub = this.profilService.isAuth$.subscribe(
	    (boo) => {
		this.isAuth = boo;
	    }
	);
	console.log('Dans',here,'subscribe.isAuth', this.isAuth);

	this.verboseSub = this.stateService.verbose$.subscribe(
	    (boo) => {
		this.verbose = boo;
	    }
	);
	console.log('Dans',here,'subscribe.verbose', this.verbose);

	console.log('Dans',here,'avant pseudo', this.pseudo);
	if (this.pseudo == undefined) {
	    //this.currentProfil = this.currentProfilProviderService.currentProfilBuild ();
	    //this.pseudo = this.currentProfil.pseudo;
	    this.onGetPseudo ();
	}
	console.log('Dans',here,'après pseudo', this.pseudo);
	
	O.exiting_from_function (here);
    }

    onGetPseudo () {
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00', here);

	this.currentEmailSub = this.stateService.currentEmail$.subscribe(
	    (ema) => {
		this.currentEmail = ema;
		console.log('Dans',here,'subscribe currentEmail as', this.currentEmail);
	    }
	);

	if (this.currentEmail == undefined) {
	    this.pseudo = undefined;
	} else {
	    this.profilService.getProfilByEmail (this.currentEmail)
		.then(
		    (com: ProfilModel) => {
			console.log('Dans',here,' getProfilIdByEmail com', com);
			this.currentProfil = com;
			this.pseudo = com.pseudo;
		    },
		).catch (
		    (error) => {
			console.log('Dans',here,'getProfilByEmail Erreur', error);
		    }
		);
	}
	console.log('Dans',here,'from getProfilByEmail pseudo',this.pseudo);
	
	O.exiting_from_function (here);
    }
    
    onLogout() {
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00', here);

	this.profilService.logout();
	console.log('Dans',here,'navigation vers /main-menu');
	this.router.navigate(['/main-menu']);
    }

    onBackToMainMenu() {
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00', here);

	this.router.navigate(['/main-menu']);
    }

    onDebugSwitch() {
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00', here);

	this.stateService.debugSwitch();
	this.debug = this.stateService.debug;
	console.log('Dans',here,'debug', this.debug);
    }

    onTraceSwitch() {
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00', here);

	this.stateService.traceSwitch();
	this.trace = this.stateService.trace;
	console.log('Dans',here,'trace', this.trace);
    }

    onVerboseSwitch() {
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00', here);

	this.stateService.verboseSwitch();
	this.verbose = this.stateService.verbose;
	console.log('Dans',here,'verbose', this.verbose);
    }

    onIrpProvider() {
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00', here);
	this.router.navigate(['/irp-provider']);
}

ngOnDestroy() {
    console.log('Entrée dans ngOnDestroy');
    this.modeSub.unsubscribe();
    //	this.isAuthSub.unsubscribe();
}

}
