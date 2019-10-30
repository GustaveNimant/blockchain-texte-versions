import { Component, OnDestroy, OnInit } from '@angular/core';

import { BlocModel }    from '../../models/bloc.model';
import { BlocService }    from '../../services/bloc.service';
import { PairModel }    from '../../models/pair.model';
import { PairService }    from '../../services/pair.service';
import { ProfilModel }   from '../../models/profil.model';
import { ProfilService }   from '../../services/profil.service';
import { StateService }    from '../../services/state.service';

import { Router } from '@angular/router';

import { WebSocket } from 'ws';

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

    public bloc_a = new Array<BlocModel>();
    private bloc_aSub: Subscription;

    public pair_a = new Array<PairModel>();
    private pair_aSub: Subscription;

    private profil_aSub:Subscription;
    private profil_a = new Array<ProfilModel>();
    private currentProfil = new ProfilModel();

    private pseudo_a = new Array<string>();
    private currentPseudo: string;

    private participantCount: number;
    private sum: number;
    private average: number;
    private rms: number;

    public debug: boolean;
    public socket_a = new Array<WebSocket>();
    
    constructor(private stateService: StateService,
		private profilService: ProfilService,
		private blocService: BlocService,
		private pairService: PairService,
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

	this.bloc_aSub = this.blocService.bloc_a$
			     .subscribe(
				 (blo_a) => {
				     this.bloc_a = blo_a;
				     console.log('Dans',here,'subscribe blo_a',blo_a);
				 },
				 (error) =>
				     {console.log(error)
				     },
				 () => {
				     console.log('fait');
				 }
			     );

	this.blocService.getBlocs(here) /* afficher les blocs */
	    .then(
		() => {
		    console.log('Dans',here,'getBlocs then');
		}
	    ).catch(
		(error) => {
		    this.errorMessage = error.message;
		}
	    );

	this.pair_aSub = this.pairService.pair_a$
			     .subscribe(
				 (pai_a) => {
				     this.pair_a = pai_a;
				     console.log('Dans',here,'subscribe pai_a',pai_a);
				 },
				 (error) =>
				     {console.log(error)
				     },
				 () => {
				     console.log('fait');
				 }
			     );
	
	this.pairService.getPairs(here) /* afficher les pairs */
	    .then(
		() => {
		    console.log('Dans',here,'getPairs then');
		}
	    ).catch(
		(error) => {
		    this.errorMessage = error.message;
		}
	    );
	this.loading = false;
    }

    onBroadcastListBloc() {
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00', here);

	console.log('Dans',here,'bloc_a',this.bloc_a);
	console.log('Dans',here,'pair_a',this.pair_a);

	this.pair_a.forEach (pai =>
	    this.socket_a.push (new WebSocket(pai.url)) 
	);
	
	console.log('Dans',here,'socket_a',this.socket_a);
	O.exiting_from_function (here);
    }

    ngOnDestroy() {
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00', here);

	this.bloc_aSub.unsubscribe();

	O.unsubscribeLog(here, 'bloc_aSub');
	O.exiting_from_function (here);
    }

}
