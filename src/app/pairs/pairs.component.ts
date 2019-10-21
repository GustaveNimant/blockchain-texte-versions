import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateService }  from '../services/state.service';
import { ProfilService } from '../services/profil.service';

import * as O from '../outils/outils-management';

@Component({
  selector: 'app-pairs',
  templateUrl: './pairs.component.html',
  styleUrls: ['./pairs.component.scss']
})

export class PairsComponent implements OnInit, OnDestroy {

    constructor(private stateService: StateService,
		private profilService: ProfilService) { }
    
    ngOnInit() {
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00', here);

//	this.profilService.isAuth$.next(false);
	this.profilService.userId = '';
	this.profilService.token = '';
	
    }
    
    ngOnDestroy() {
    }
    
}
