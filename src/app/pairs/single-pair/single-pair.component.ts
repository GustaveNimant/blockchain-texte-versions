import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PairModel }       from '../../models/pair.model';
import { PairService }     from '../../services/pair.service';
import { ProfilService } from '../../services/profil.service';
import { StateService }     from '../../services/state.service';
import { Subscription } from 'rxjs';

import * as M from '../../outils/management-outils';

@Component({
    selector: 'app-single-pair',
    templateUrl: './single-pair.component.html',
    styleUrls: ['./single-pair.component.scss']
})
export class SinglePairComponent implements OnInit, OnDestroy {

    public currentPair: PairModel;
    public currentPairSub: Subscription;

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
		private pairService: PairService,
		private profilService: ProfilService)
		{
		    let here = M.functionName ();
		    console.log('%cEntrée dans','color:#00aa00', here);
		}

    ngOnInit() {
	let here = M.functionName ();
	console.log('%cEntrée dans','color:#00aa00', here);
	
	this.debug = this.stateService.debug;
	console.log('Dans',here,'debug', this.debug);

	this.currentUrl = this.router.url;
	this.stateService.currentUrl$.next(this.currentUrl);
	console.log('Dans',here,' currentUrl', this.currentUrl);

	this.loading = true;

	this.stateService.mode$.next('single-pair');
	
	this.activatedRoute.params.subscribe(
	    (params: Params) => {
		console.log('Dans',here,' params', params);
		this.pairService.getPairByObjectId(params.id)
		    .then(
			(tex: PairModel) => {
			    this.loading = false;
			    this.currentPair = tex;
			    console.log('Dans',here,'getPairByObjectId tex',tex);
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
	
	this.currentPairSub = this.pairService.currentPair$.subscribe(
	    (tex) => {
		console.log('Dans',here,'subscribe tex',tex);
		this.currentPair = tex;
		this.loading = false;
	    }
	);
	
	this.isAuthSub = this.profilService.isAuth$.subscribe(
	    (boo) => {  /* Pour afficher les pairs */
		this.isAuth = boo;
		console.log('Dans',here,' isAuth', this.isAuth);
	    }
	);
	M.exiting_from_function (here);	
    }

    onGoBack() {
	this.router.navigate([this.currentUrl]);
    }

    onGoAllPair() {
	this.router.navigate(['/pairs/list-pair']);
    }

    onModifyPair() {
	this.router.navigate(['/pairs/modify-pair/' + this.currentPair._id]);
    }

    onDelete() {
	this.loading = true;
	this.pairService.deletePair(this.currentPair._id).then(
	    () => {
		this.loading = false;
		this.router.navigate(['/pairs/list-pair']);
	    }
	);
    }
    
    ngOnDestroy() {
	let here = M.functionName ();
	console.log('%cEntrée dans','color:#00aa00', here);
    }

}
