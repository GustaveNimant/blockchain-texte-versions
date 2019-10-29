import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateService }  from '../services/state.service';
import { ProfilService } from '../services/profil.service';
import { Subscription }  from 'rxjs';

import * as O from '../outils/management-outils';

@Component({
    selector: 'app-profil',
    templateUrl: './profil.component.html',
    styleUrls: ['./profil.component.scss']
})

export class ProfilComponent implements OnInit, OnDestroy {

    public isAuth: boolean;
    private isAuthSub: Subscription;

    constructor(private stateService: StateService,
		private profilService: ProfilService) { }
    
    ngOnInit() {
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00', here);

	this.isAuthSub = this.profilService.isAuth$.subscribe(
	    (boo) => { 
		this.isAuth = boo;
		console.log('Dans',here,'isAuth', this.isAuth);
	    }
	);
    }
    
    ngOnDestroy() {
    }
}
