import { Component, OnInit }                  from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router }             from '@angular/router';
import { BlocModel } from '../../models/bloc.model';
import { StateService }  from '../../services/state.service';
import { BlocService } from '../../services/bloc.service';
import { Subscription } from 'rxjs';

import * as B from '../../outils/blockchain-outils';
import * as M from '../../outils/management-outils';

@Component({
    selector: 'app-new-bloc-version',
    templateUrl: './new-bloc-version.component.html',
    styleUrls: ['./new-bloc-version.component.scss']
})

export class NewBlocVersionComponent implements OnInit {

    bloc: BlocModel;
    blocForm: FormGroup;
    loading = false;
    errorMessage: string;

    private blocVersion: number;
    
    constructor(private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private stateService: StateService,
		private blocService: BlocService) { }

    ngOnInit() {
	let here = M.functionName ();
	console.log('%cEntrée dans','color:#00aa00', here);

	this.loading = true;
	this.blocForm = this.formBuilder.group({
	    contenu: [null, Validators.required],
	});

	this.stateService.mode$.next('form');

	this.route.params.subscribe(
	    (par) => {
		console.log('Dans ngOnInit par',par);
		
		/* Improve calculer la noteMoyenne pour cet id avec list-notation */

		this.blocService.getBlocByObjectId(par.id).then(
		    (tex: BlocModel) => {
			console.log('Dans',here,'tex',tex);
			this.bloc = tex;
			this.blocForm.get('contenu').setValue(this.bloc.contenu);
			this.loading = false;
		    }
		);
	    }
	);
    }

    onNewBlocVersion() {
	let here = M.functionName ();
	console.log('%cEntrée dans','color:#00aa00', here);

	this.loading = true;

	let blocNew = new BlocModel();
        blocNew = this.bloc;

	blocNew.contenu = this.blocForm.get('contenu').value;
	blocNew.auteurClePublique = this.blocForm.get('auteurClePublique').value;

	blocNew._id = this.bloc._id;
	blocNew.__v = (this.bloc.__v +1);

	console.log('Dans onNewBlocVersion blocNew', blocNew);
	
	this.blocService.createNewBlocVersion(this.bloc._id, blocNew).then(
		() => {
		this.blocForm.reset();
		this.loading = false;
		this.router.navigate(['/blocs/list-bloc']);
	    },
	    (error) => {
		console.log('Dans onNewBlocVersion Erreur', error.status);
		this.loading = false;
		this.errorMessage = error.message;
	    }
	);
    }

}
