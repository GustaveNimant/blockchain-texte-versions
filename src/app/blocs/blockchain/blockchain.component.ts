import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProfilService }   from '../../services/profil.service';
import { StateService }    from '../../services/state.service';
import { BlockchainService } from '../../services/blockchain.service';
import { BlockchainModel }   from '../../models/blockchain.model';
import { BlocModel }         from '../../models/bloc.model';
import { ProfilModel }   from '../../models/profil.model';
import { NotationModel } from '../../models/notation.model';

import { Subscription } from 'rxjs';

import { Router } from '@angular/router';


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

    public blockchain = new BlockchainModel();
    private blockchainSub: Subscription;

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

    constructor(private stateService: StateService,
		private profilService: ProfilService,
		private blockchainService: BlockchainService,
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

	console.log('\nDEBUG------- avant this.blockchainService.blockchain$.subscribe ---------\n');

	this.blockchainSub = this.blockchainService.blockchain$
			      .subscribe(
				  (blo) => {
				      this.blockchain = blo[0];
				      console.log('Dans',here,'subscribe blo',blo);
				  },
				  (error) =>
				      {console.log(error)
				      },
				  () => {
				      console.log('fait');
				  }
			      );

	console.log('\nDEBUG------- après this.blockchainService.blockchain$.subscribe ---------\n');
	console.log('\nDEBUG------- avant this.blockchainService.getBlocs  ---------\n');	this.loading = false;

	this.blockchainService.getBlockchain(here) /* afficher les blocs */
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

	console.log('\nDEBUG------- après this.blockchainService.getBlocs  ---------\n');

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

	this.blockchainSub.unsubscribe();

	O.unsubscribeLog(here, 'blockchainSub');
	O.exiting_from_function (here);
    }

}
