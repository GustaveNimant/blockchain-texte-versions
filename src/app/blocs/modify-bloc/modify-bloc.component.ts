import { Component, OnInit }                  from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router }             from '@angular/router';
import { BlocModel } from '../../models/bloc.model';
import { StateService }  from '../../services/state.service';
import { BlocService } from '../../services/bloc.service';
import { Subscription } from 'rxjs';

import * as O from '../../outils/outils-management';

@Component({
    selector: 'app-modify-bloc',
    templateUrl: './modify-bloc.component.html',
    styleUrls: ['./modify-bloc.component.scss']
})
export class ModifyBlocComponent implements OnInit {

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
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00', here);
	
	this.loading = true;
	this.blocForm = this.formBuilder.group({
	    contenu: [null, Validators.required],
	    auteurClePublique: [null, Validators.required],
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
			this.blocForm.get('auteurClePublique').setValue(this.bloc.auteurClePublique);
			this.loading = false;
		    }
		);
	    }
	);
    }

    onModifyBloc() { /* modifier seulement le Bloc */
	console.log('Entrée dans onModifyBloc');
	this.loading = true;

	const bloc = new BlocModel();

	bloc.contenu = this.blocForm.get('contenu').value;
	bloc.auteurClePublique = this.blocForm.get('auteurclepublique').value;

	bloc._id = this.bloc._id;
	bloc.__v = (this.bloc.__v +1);

	console.log('Dans onModifyBloc bloc', bloc);
	
	this.blocService.createNewBloc(bloc).then(
		() => {
		this.blocForm.reset();
		this.loading = false;
		this.router.navigate(['/blocs/list-bloc']);
	    },
	    (error) => {
		console.log('Dans onModifyBloc Erreur', error.status);
		this.loading = false;
		this.errorMessage = error.message;
	    }
	);
    }

}
