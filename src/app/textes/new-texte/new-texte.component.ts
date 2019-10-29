import { Router }                             from '@angular/router';
import { Component, OnDestroy, OnInit }       from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfilModel }        from '../../models/profil.model';
import { TexteModel }        from '../../models/texte.model';
import { TexteService }      from '../../services/texte.service';
import { ProfilService }     from '../../services/profil.service';
import { StateService }      from '../../services/state.service';

import { Subscription } from 'rxjs';

import * as O from '../../outils/management-outils';

@Component({
    selector: 'app-new-texte',
    templateUrl: './new-texte.component.html',
    styleUrls: ['./new-texte.component.scss']
})

export class NewTexteComponent implements OnInit, OnDestroy {

    public texteForm: FormGroup;
    public loading = false;
    public errorMessage: string;
    public debug: boolean;
    
    private currentEmailSub: Subscription;
    private currentEmail: string;

    private irpRegisterSub: Subscription;
    private irpRegister= new Object();
    
    private currentProfil = new ProfilModel();
    
    constructor(
	private formBuilder: FormBuilder,
	private stateService: StateService,
	private texteService: TexteService,
	private profilService: ProfilService,
    	private router: Router)
	{
	    let here = O.functionName ();
	    console.log('%cEntrée dans','color:#00aa00', here);
	}

    ngOnInit() {
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00', here);
	
	this.stateService.mode$.next('form');

	this.debug = this.stateService.debug;
    	console.log('Dans',here,'debug', this.debug);

	this.profilService.getProfilByEmail (this.currentEmail)
	    .then(
		(com: ProfilModel) => {
		    console.log('Dans',here,'getProfilByEmail com', com);
		    this.currentProfil = com;
		},
	    ).catch (
		(error) => {
		    console.log('Dans',here,'getProfilByEmail Erreur', error);
		}
	    );

	/* initialisation */
	this.texteForm = this.formBuilder.group({
	    contenu: [null],
	    auteurClePublique: ['uneCléPublique'] 
	});
	
    }

    onSubmit() {
	console.log('Entrée dans onSubmit');
	
	this.loading = true;

	/* copie le contenu du texteForm */
	const texte = new TexteModel();

	texte.contenu = this.texteForm.get('contenu').value;
	texte.auteurClePublique = this.texteForm.get('auteurClePublique').value;
	texte._id = new Date().getTime().toString();

	console.log('Dans onSubmit texte', texte);
	
	this.texteService.createNewTexte(texte)
	    .then(
		() => {
		    this.texteForm.reset();
		    this.loading = false;
		    this.router.navigate(['/textes/list-texte']);
		}
	    )
	    .catch(
		(error) => {
		    console.log('Dans onSubmit Erreur est', error);
		    this.loading = false;
		    this.errorMessage = error.message;
		}
	    );
    }

    ngOnDestroy() {
    }

}
