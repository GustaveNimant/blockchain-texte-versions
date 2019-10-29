import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProfilService }   from '../../services/profil.service';
import { NotationService } from '../../services/notation.service';
import { StateService }    from '../../services/state.service';
import { TexteService }    from '../../services/texte.service';
import { Router } from '@angular/router';
import { TexteModel }    from '../../models/texte.model';
import { ProfilModel }   from '../../models/profil.model';
import { NotationModel } from '../../models/notation.model';

import { Subscription } from 'rxjs';
import { filter, map, scan, take, tap, toArray } from 'rxjs/operators';
import { arrayCountSumAverageRms, sumOfArray, averageOfArray, varianceOfArray, rmsOfArray }  from '../../outils/statistics-outils';

import * as O from '../../outils/management-outils';

@Component({
    selector: 'app-list-texte',
    templateUrl: './list-texte.component.html',
    styleUrls: ['./list-texte.component.scss']
})

export class ListTexteComponent implements OnInit, OnDestroy {

    public loading: boolean;
    public errorMessage: string;

    private currentUrl: string;

    private isAuth: boolean;
    private isAuthSub: Subscription;

    private verboseSub: Subscription;
    public verbose: boolean;

    public texte_a = new Array<TexteModel>();
    private texte_aSub: Subscription;

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
		private texteService: TexteService,
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
	    (boo) => {  /* Pour afficher les textes */
		this.isAuth = boo;
		console.log('Dans',here,'isAuth', this.isAuth);
	    }
	);

	console.log('\nDEBUG------- avant this.texteService.texte_a$.subscribe ---------\n');

	this.texte_aSub = this.texteService.texte_a$
			      .subscribe(
				  (tex_a) => {
				      this.texte_a = tex_a;
				      console.log('Dans',here,'subscribe tex_a',tex_a);
				  },
				  (error) =>
				      {console.log(error)
				      },
				  () => {
				      console.log('fait');
				  }
			      );

	console.log('\nDEBUG------- après this.texteService.texte_a$.subscribe ---------\n');
	console.log('\nDEBUG------- avant this.texteService.getTextes  ---------\n');	this.loading = false;

	this.texteService.getTextes(here) /* afficher les textes */
	    .then(
		() => {
		    this.loading = false;
		    console.log('Dans',here,'getTextes then');
		    this.loading = false;
		}
	    ).catch(
		(error) => {
		    this.loading = false;
		    this.errorMessage = error.message;
		}
	    );

	console.log('\nDEBUG------- après this.texteService.getTextes  ---------\n');

    }

    onTexteClicked(id: string) {
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00', here);
	console.log('Entrée dans',here,'avec id', id);

	console.log('Dans',here,'navigation vers', '/textes/single-texte/' + id);

	this.router.navigate(['/textes/single-texte/' + id]);
    }

    ngOnDestroy() {
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00', here);

	this.texte_aSub.unsubscribe();

	O.unsubscribeLog(here, 'texte_aSub');
	O.exiting_from_function (here);
    }

}
