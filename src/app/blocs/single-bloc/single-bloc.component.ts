import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BlocModel }       from '../../models/bloc.model';
import { BlocService }     from '../../services/bloc.service';
import { ProfilService } from '../../services/profil.service';
import { StateService }     from '../../services/state.service';
import { Subscription } from 'rxjs';

import * as O from '../../outils/management-outils';

@Component({
    selector: 'app-single-bloc',
    templateUrl: './single-bloc.component.html',
    styleUrls: ['./single-bloc.component.scss']
})
export class SingleBlocComponent implements OnInit, OnDestroy {

    public currentBloc: BlocModel;
    public currentBlocSub: Subscription;

    public loading: boolean;
    private auteurId: string;
    public isAuth: boolean;
    public errorMessage: string;

    public debug: boolean;
    private trace: boolean;

    private currentUrl: string;

    public isAuthSub: Subscription;
    
    constructor(private stateService: StateService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private blocService: BlocService,
		private profilService: ProfilService)
		{
		    let here = O.functionName ();
		    console.log('%cEntrée dans','color:#00aa00', here);
		}

    ngOnInit() {
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00', here);
	
	this.debug = this.stateService.debug;
	console.log('Dans',here,'debug', this.debug);

	this.currentUrl = this.router.url;
	this.stateService.currentUrl$.next(this.currentUrl);
	console.log('Dans',here,' currentUrl', this.currentUrl);

	this.loading = true;

	this.stateService.mode$.next('single-bloc');
	
	this.activatedRoute.params.subscribe(
	    (params: Params) => {
		console.log('Dans',here,' params', params);
		this.blocService.getBlocByObjectId(params.id)
		    .then(
			(blo: BlocModel) => {
			    this.loading = false;
			    this.currentBloc = blo;
			    console.log('Dans',here,'getBlocByObjectId blo',blo);
			}
		    ).catch(
			(error) => {
			    switch (error.status) {
				case 401:
				    this.onGoBack()
				    break;
				default:
				    this.errorMessage = error.message;
				    break;
			    }
			    console.log('Dans',here,' Erreur', error);
			    this.loading = false;
			}
		    );
	    }
	);
	
	this.currentBlocSub = this.blocService.currentBloc$.subscribe(
	    (blo) => {
		console.log('Dans',here,'subscribe blo',blo);
		this.currentBloc = blo;
		this.loading = false;
	    }
	);
	
	this.isAuthSub = this.profilService.isAuth$.subscribe(
	    (boo) => {  /* Pour afficher les blocs */
		this.isAuth = boo;
		console.log('Dans',here,' isAuth', this.isAuth);
	    }
	);
	O.exiting_from_function (here);	
    }

    onCreateNewBloc() {
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00', here);

	this.router.navigate(['/blocs/new-bloc/' + this.currentBloc._id]);
    }

    onDeleteBloc() {
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00', here);

	this.loading = true;
	this.blocService.deleteBloc(this.currentBloc._id).then(
	    () => {
		this.loading = false;
		this.router.navigate(['/blocs/list-bloc']);
	    }
	);
    }
    
    onDisplayNotation() {
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00', here);
	console.log('Dans',here,'navigation vers /notations/byobjectid-notation/'+this.currentBloc._id);

	this.router.navigate(['/notations/byobjectid-notation/' + this.currentBloc._id]);
    }
    
    onGoBack() {
	this.router.navigate([this.currentUrl]);
    }

    onGoAllBloc() {
	this.router.navigate(['/blocs/list-bloc']);
    }

    onNotate() {
	console.log('Entrée dans onNotate navigation vers /notations/new-notation/'+this.currentBloc._id);
	this.router.navigate(['/notations/new-notation/' + this.currentBloc._id]);
    }

    onAverageNote() {
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00', here);
	console.log('Dans',here,'navigation vers /notations/sum-notation/'+this.currentBloc._id);

	this.router.navigate(['/notations/sum-notation/' + this.currentBloc._id]);
    }

    onModifyBloc() {
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00', here);

	this.router.navigate(['/blocs/modify-bloc/' + this.currentBloc._id]);
    }

    ngOnDestroy() {
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00', here);
    }

}
