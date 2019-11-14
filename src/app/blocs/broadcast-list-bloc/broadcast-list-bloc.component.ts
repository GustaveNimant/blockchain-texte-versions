import { Component, OnDestroy, OnInit } from '@angular/core';

import { ProfilModel }   from '../../models/profil.model';
import { ProfilService }   from '../../services/profil.service';
import { StateService }    from '../../services/state.service';

import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import * as O from '../../outils/management-outils';

@Component({
    selector: 'app-broadcast-list-bloc',
    templateUrl: './broadcast-list-bloc.component.html',
    styleUrls: ['./broadcast-list-bloc.component.scss']
})

export class BroadcastListBlocComponent implements OnInit, OnDestroy {

    public loading: boolean;
    public errorMessage: string;

    private currentUrl: string;

    private isAuth: boolean;
    private isAuthSub: Subscription;

    private verboseSub: Subscription;
    public verbose: boolean;

    private profil_aSub:Subscription;
    private profil_a = new Array<ProfilModel>();
    private currentProfil = new ProfilModel();

    private pseudo_a = new Array<string>();
    private currentPseudo: string;

    public debug: boolean;
    
    constructor(private stateService: StateService,
		private profilService: ProfilService,
		private router: Router)
		{
		    let here = O.functionName ();
		    console.log('%cEntrée dans','color:#00aa00', here);
		}

    ngOnInit() {
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00', here);

	this.debug = this.stateService.debug;
	console.log('Dans',here,'debug', this.debug);

	this.loading = true;
	this.stateService.mode$.next('list');

	this.currentUrl = this.router.url;
	this.stateService.currentUrl$.next(this.currentUrl);
	console.log('Dans',here,'currentUrl', this.currentUrl);

	this.verboseSub = this.stateService.verbose$.subscribe(
	    (boo) => {
		this.verbose = boo;
	    }
	);
	console.log('Dans',here,'subscribe.verbose', this.verbose);

	this.isAuthSub = this.profilService.isAuth$.subscribe(
	    (boo) => {  /* Pour afficher les blocs */
		this.isAuth = boo;
		console.log('Dans',here,'isAuth', this.isAuth);
	    }
	);

    }

    onBroadcastListBloc() {
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00', here);

	O.exiting_from_function (here);
    }

    ngOnDestroy() {
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00', here);

	O.unsubscribeLog(here, 'bloc_aSub');
	O.exiting_from_function (here);
    }

}
