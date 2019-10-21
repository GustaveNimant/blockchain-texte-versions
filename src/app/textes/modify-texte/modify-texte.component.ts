import { Component, OnInit }                  from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router }             from '@angular/router';
import { TexteModel } from '../../models/texte.model';
import { StateService }  from '../../services/state.service';
import { TexteService } from '../../services/texte.service';
import { Subscription } from 'rxjs';

import * as O from '../../outils/outils-management';

@Component({
    selector: 'app-modify-texte',
    templateUrl: './modify-texte.component.html',
    styleUrls: ['./modify-texte.component.scss']
})
export class ModifyTexteComponent implements OnInit {

    texte: TexteModel;
    texteForm: FormGroup;
    loading = false;
    errorMessage: string;

    private texteVersion: number;
    
    constructor(private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private stateService: StateService,
		private texteService: TexteService) { }

    ngOnInit() {
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00', here);
	
	this.loading = true;
	this.texteForm = this.formBuilder.group({
	    contenu: [null, Validators.required],
	    clePublique: [null, Validators.required],
	});

	this.stateService.mode$.next('form');

	this.route.params.subscribe(
	    (par) => {
		console.log('Dans ngOnInit par',par);
		/* Improve calculer la noteMoyenne pour cet id avec list-notation */
		this.texteService.getTexteByObjectId(par.id).then(
		    (tex: TexteModel) => {
			console.log('Dans',here,'tex',tex);
			this.texte = tex;
			this.texteForm.get('contenu').setValue(this.texte.contenu);
			this.texteForm.get('clePublique').setValue(this.texte.clePublique);
			this.loading = false;
		    }
		);
	    }
	);
    }

    onModifyTexte() { /* modifier seulement le Texte */
	console.log('Entrée dans onModifyTexte');
	this.loading = true;

	const texte = new TexteModel();

	texte.contenu = this.texteForm.get('contenu').value;
	texte.clePublique = this.texteForm.get('auteurclepublique').value;

	texte._id = this.texte._id;
	texte.__v = (this.texte.__v +1);

	console.log('Dans onModifyTexte texte', texte);
	
	this.texteService.createNewTexte(texte).then(
		() => {
		this.texteForm.reset();
		this.loading = false;
		this.router.navigate(['/textes/list-texte']);
	    },
	    (error) => {
		console.log('Dans onModifyTexte Erreur', error.status);
		this.loading = false;
		this.errorMessage = error.message;
	    }
	);
    }

}
