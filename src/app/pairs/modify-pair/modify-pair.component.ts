import { Component, OnInit }                  from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router }             from '@angular/router';
import { PairModel } from '../../models/pair.model';
import { StateService }  from '../../services/state.service';
import { PairService } from '../../services/pair.service';
import { Subscription } from 'rxjs';

import * as O from '../../outils/management-outils';

@Component({
    selector: 'app-modify-pair',
    templateUrl: './modify-pair.component.html',
    styleUrls: ['./modify-pair.component.scss']
})
export class ModifyPairComponent implements OnInit {

    pair: PairModel;
    pairForm: FormGroup;
    loading = false;
    errorMessage: string;

    private pairVersion: number;
    
    constructor(private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private stateService: StateService,
		private pairService: PairService) { }

    ngOnInit() {
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00', here);
	
	this.loading = true;
	this.pairForm = this.formBuilder.group({
	    contenu: [null, Validators.required],
	    auteurClePublique: [null, Validators.required],
	});

	this.stateService.mode$.next('form');

	this.route.params.subscribe(
	    (par) => {
		console.log('Dans ngOnInit par',par);
		/* Improve calculer la noteMoyenne pour cet id avec list-notation */
		this.pairService.getPairByObjectId(par.id).then(
		    (pai: PairModel) => {
			console.log('Dans',here,'pai',pai);
			this.pair = pai;
			this.pairForm.get('url').setValue(this.pair.url);
			this.loading = false;
		    }
		);
	    }
	);
    }

    onModifyPair() { /* modifier seulement le Pair */
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00', here);

	this.loading = true;

	const pair = new PairModel();

	pair.url = this.pairForm.get('url').value;

	console.log('Dans',here,'pair',pair);
	
	this.pairService.createNewPair(pair).then(
	    () => {
		this.pairForm.reset();
		this.loading = false;
		this.router.navigate(['/pairs/list-pair']);
	    },
	    (error) => {
		console.log('Dans onModifyPair Erreur', error.status);
		this.loading = false;
		this.errorMessage = error.message;
	    }
	);
    }

}
