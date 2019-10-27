import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProfilService }   from '../../services/profil.service';
import { NotationService } from '../../services/notation.service';
import { StateService }    from '../../services/state.service';
import { BlocService }    from '../../services/bloc.service';
import { Router } from '@angular/router';
import { BlocModel }    from '../../models/bloc.model';
import { BlockchainModel }    from '../../models/blockchain.model';
import { ProfilModel }   from '../../models/profil.model';
import { NotationModel } from '../../models/notation.model';

import { Subscription } from 'rxjs';
import { filter, map, scan, take, tap, toArray } from 'rxjs/operators';
import { arrayCountSumAverageRms, sumOfArray, averageOfArray, varianceOfArray, rmsOfArray }  from '../../outils/outils-statistics';

import * as O from '../../outils/outils-management';

@Component({
    selector: 'app-blockchain',
    templateUrl: './blockchain.component.html',
    styleUrls: ['./blockchain.component.scss']
})

export class BlockchainComponent implements OnInit, OnDestroy {

    public loading: boolean;
    public errorMessage: string;

    private currentUrl: string;

    private isAuth: boolean;
    private isAuthSub: Subscription;

    private verboseSub: Subscription;
    public verbose: boolean;

    public bloc_a = new Array<BlocModel>();
    private bloc_aSub: Subscription;

    private profil_aSub:Subscription;
    private profil_a = new Array<ProfilModel>();
    private currentProfil = new ProfilModel();

    private pseudo_a = new Array<string>();
    private currentPseudo: string;

    private participantCount: number;
    private sum: number;
    private average: number;
    private rms: number;

    private notation_aSub:Subscription;
    private notation_a = new Array<NotationModel>();
    private currentNotation_a = new Array<NotationModel>();

    public debug: boolean;

    constructor(private stateService: StateService,
		private profilService: ProfilService,
		private notationService: NotationService,
		private blocService: BlocService,
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

	console.log('\nDEBUG------- avant this.blocService.bloc_a$.subscribe ---------\n');

	this.bloc_aSub = this.blocService.bloc_a$
			      .subscribe(
				  (tex_a) => {
				      this.bloc_a = tex_a;
				      console.log('Dans',here,'subscribe tex_a',tex_a);
				  },
				  (error) =>
				      {console.log(error)
				      },
				  () => {
				      console.log('fait');
				  }
			      );

	console.log('\nDEBUG------- après this.blocService.bloc_a$.subscribe ---------\n');
	console.log('\nDEBUG------- avant this.blocService.getBlocs  ---------\n');	this.loading = false;

	this.blocService.getBlocs(here) /* afficher les blocs */
	    .then(
		() => {
		    this.loading = false;
		    console.log('Dans',here,'getBlocs then');
		    this.loading = false;
		}
	    ).catch(
		(error) => {
		    this.loading = false;
		    this.errorMessage = error.message;
		}
	    );

	console.log('\nDEBUG------- après this.blocService.getBlocs  ---------\n');

    }

    onBlocClicked(id: string) {
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00', here);
	console.log('Entrée dans',here,'avec id', id);

	console.log('Dans',here,'navigation vers', '/blocs/single-bloc/' + id);

	this.router.navigate(['/blocs/single-bloc/' + id]);
    }

    ngOnDestroy() {
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00', here);

	this.bloc_aSub.unsubscribe();

	O.unsubscribeLog(here, 'bloc_aSub');
	O.exiting_from_function (here);
    }

}
