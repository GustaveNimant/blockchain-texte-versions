import { Component, OnDestroy, OnInit } from '@angular/core';
import { PairModel }       from '../../models/pair.model';
import { PairService }     from '../../services/pair.service';
import { ProfilService }   from '../../services/profil.service';
import { StateService }    from '../../services/state.service';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import * as O from '../../outils/management-outils';

@Component({
    selector: 'app-connect-all-pair',
    templateUrl: './connect-all-pair.component.html',
    styleUrls: ['./connect-all-pair.component.scss']
})

export class ConnectAllPairComponent implements OnInit {

    public loading: boolean;
    public errorMessage: string;

    constructor(private stateService: StateService,
		private pairService: PairService,
		private profilService: ProfilService,
		private router: Router)
		{
		    let here = O.functionName ();
		    console.log('%cEntrée dans','color:#00aa00', here);
		}

    ngOnInit() {
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00', here);

	this.pairService.connectAllPair(here) /* afficher les pairs */
	    .then(
		() => {
		    this.loading = false;
		    console.log('Dans',here,'connectAllPair then');
		}
	    ).catch(
		(error) => {
		    this.loading = false;
		    console.log('Dans',here,'connectAllPair error',error.message);
		    this.errorMessage = error.message;
		}
	    );

    }

    ngOnDestroy() {
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00', here);

	O.unsubscribeLog(here, 'pair_aSub');
	O.exiting_from_function (here);
    }

}
