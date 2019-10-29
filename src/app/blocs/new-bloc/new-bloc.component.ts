import { ActivatedRoute, Router }             from '@angular/router';
import { BlocModel }        from '../../models/bloc.model';
import { BlocService }      from '../../services/bloc.service';
import { Component, OnDestroy, OnInit }       from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfilModel }        from '../../models/profil.model';
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

    public loading = false;

    public errorMessage: string;
    public debug: boolean;

    public blocForm: FormGroup;
    private blocPrecedent: BlocModel;

    private currentEmailSub: Subscription;
    private currentEmail: string;

    private irpRegisterSub: Subscription;
    private irpRegister= new Object();
    
    private currentProfil = new ProfilModel();
    
    constructor(
	private blocService: BlocService,
	private formBuilder: FormBuilder,
	private profilService: ProfilService,
	private route: ActivatedRoute,
	private stateService: StateService,
    	private router: Router,
    )	{
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
		(pro: ProfilModel) => {
		    console.log('Dans',here,'getProfilByEmail currentProfil', pro);
		    this.currentProfil = pro;
		},
	    ).catch (
		(error) => {
		    console.log('Dans',here,'getProfilByEmail Erreur', error);
		}
	    );

	this.loading = true;
	this.blocForm = this.formBuilder.group({
	    contenu: [null],
	    auteurClePublique: ['uneCléPublique'] 
	});
	
	this.route.params.subscribe(
	    (par) => {
		console.log('Dans ngOnInit par',par);
		
		/* Improve calculer la noteMoyenne pour cet id avec list-notation */

		this.blocService.getBlocByObjectId(par.id).then(
		    (blo: BlocModel) => {
			console.log('Dans',here,'blo',blo);
			this.blocPrecedent = blo;
			this.blocForm.get('contenu').setValue(this.blocPrecedent.contenu);
			this.loading = false;
		    }
		);
	    }
	);

    }

    onSubmit() {
	console.log('Entrée dans onSubmit');
	
	this.loading = true;

	/* copie le contenu du blocForm */
	var bloc = new BlocModel();
	bloc = this.blocPrecedent;
	
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
