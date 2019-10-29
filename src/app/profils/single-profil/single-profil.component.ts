import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateService } from '../../services/state.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProfilModel } from '../../models/profil.model';
import { ProfilService } from '../../services/profil.service';
import { Subscription } from 'rxjs';

import * as O from '../../outils/management-outils';

@Component({
    selector: 'app-single-profil',
    templateUrl: './single-profil.component.html',
    styleUrls: ['./single-profil.component.scss']
})

export class SingleProfilComponent implements OnInit, OnDestroy {

    public currentProfil: ProfilModel;
    private userId: string;
    public isAuth: boolean;

    public loading: boolean;
    public debug: boolean;
    
    private isAuthSub: Subscription;

    constructor(private stateService: StateService,
		private router: Router,
		private route: ActivatedRoute,
		private profilService: ProfilService)
		{
		    console.log('Entrée dans constructor');
		};
    
    ngOnInit(){
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00', here);

	this.loading = true;

	this.isAuthSub = this.stateService.debug$.subscribe(
	    (boo) => {this.debug = boo;}
	);

	console.log('Dans',here,'debug', this.debug);

	this.userId = this.profilService.userId ? this.profilService.userId : 'profilID40282382';
	console.log('Dans',here,'userId', this.userId);
	
	this.profilService.getProfilById(this.userId)
	    .then(
		(com: ProfilModel) => {
		    console.log('Dans',here,'com', com);
		    this.loading = false;
		    this.currentProfil = com;
		}
	    );
	
	this.isAuthSub = this.profilService.isAuth$.subscribe(
	    (boo) => {
		this.isAuth = boo;
		console.log('Dans ngOnInit isAuth', this.isAuth);
	    }
	);

    };

    onGoBack() {
	this.router.navigate(['/profils/list-profils']);
    };

    onModify() {
	this.router.navigate(['/profils/list-profils/']);
    };

    onDelete() {
	this.loading = true;
	this.profilService.deleteProfil(this.currentProfil._id)
	    .then(
		() => {
		    this.loading = false;
		    this.router.navigate(['/profils/list-profils']);
		}
	    );
    };

    ngOnDestroy() {
  };

};
