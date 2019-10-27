import { Router }                             from '@angular/router';
import { Component, OnDestroy, OnInit }       from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfilModel }        from '../../models/profil.model';
import { BlocModel }        from '../../models/bloc.model';
import { BlocService }      from '../../services/bloc.service';
import { ProfilService }     from '../../services/profil.service';
import { StateService }      from '../../services/state.service';

import { Subscription } from 'rxjs';

import * as O from '../../outils/outils-management';

@Component({
    selector: 'app-new-bloc',
    templateUrl: './new-bloc.component.html',
    styleUrls: ['./new-bloc.component.scss']
})

export class NewBlocComponent implements OnInit, OnDestroy {

    public blocForm: FormGroup;
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
	private blocService: BlocService,
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
    	console.log('Dans ngOnInit debug', this.debug);

	this.profilService.getProfilByEmail (this.currentEmail)
	    .then(
		(com: ProfilModel) => {
		    console.log('Dans ngOnInit getProfilByEmail com', com);
		    this.currentProfil = com;
		},
	    ).catch (
		(error) => {
		    console.log('Dans ngOnInit getProfilByEmail Erreur', error);
		}
	    );

	/* initialisation */
	this.blocForm = this.formBuilder.group({
	    contenu: [null],
	    auteurClePublique: ['uneCléPublique'] 
	});
	
    }

    onSubmit() {
	console.log('Entrée dans onSubmit');
	
	this.loading = true;

	/* copie le contenu du blocForm */
	const bloc = new BlocModel();

	bloc.contenu = this.blocForm.get('contenu').value;
	bloc.auteurClePublique = this.blocForm.get('auteurClePublique').value;
	bloc._id = new Date().getTime().toString();

	console.log('Dans onSubmit bloc', bloc);
	
	this.blocService.createNewBloc(bloc)
	    .then(
		() => {
		    this.blocForm.reset();
		    this.loading = false;
		    this.router.navigate(['/blocs/list-bloc']);
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
