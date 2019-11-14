import { Component, OnDestroy, OnInit } from '@angular/core';
import { PairModel }       from '../../models/pair.model';
import { PairService }     from '../../services/pair.service';
import { ProfilService }   from '../../services/profil.service';
import { StateService }    from '../../services/state.service';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import * as O from '../../outils/management-outils';

@Component({
    selector: 'app-list-pair',
    templateUrl: './list-pair.component.html',
    styleUrls: ['./list-pair.component.scss']
})
export class ListPairComponent implements OnInit {

    public loading: boolean;
    public errorMessage: string;

    public pair_a = new Array<PairModel>();
    private pair_aSub: Subscription;

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
		    this.loading = false;
		    console.log('Dans',here,'getPairs then');
		}
	    ).catch(
		(error) => {
		    this.loading = false;
		    this.errorMessage = error.message;
		}
	    );

    }

    onPairClicked(id: string) {
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00', here);
	console.log('Entrée dans',here,'avec id', id);

	console.log('Dans',here,'navigation vers', '/pairs/single-pair/' + id);

	this.router.navigate(['/pairs/single-pair/' + id]);
    }

    ngOnDestroy() {
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00', here);

	this.pair_aSub.unsubscribe();

	O.unsubscribeLog(here, 'pair_aSub');
	O.exiting_from_function (here);
    }

}
