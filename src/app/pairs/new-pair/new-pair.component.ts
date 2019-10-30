import { Router }                             from '@angular/router';
import { Component, OnDestroy, OnInit }       from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfilModel }        from '../../models/profil.model';
import { PairModel }          from '../../models/pair.model';
import { PairService }        from '../../services/pair.service';
import { ProfilService }     from '../../services/profil.service';
import { StateService }      from '../../services/state.service';

import { Subscription } from 'rxjs';

import * as M from '../../outils/management-outils';

@Component({
    selector: 'app-new-pair',
    templateUrl: './new-pair.component.html',
    styleUrls: ['./new-pair.component.scss']
})

export class NewPairComponent implements OnInit, OnDestroy {

    public pairForm: FormGroup;
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
	private pairService: PairService,
	private profilService: ProfilService,
    	private router: Router)
	{
	    let here = M.functionName ();
	    console.log('%cEntrée dans','color:#00aa00', here);
	}

    ngOnInit() {
	let here = M.functionName ();
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
	this.pairForm = this.formBuilder.group({
	    url: [null],
	    auteurClePublique: ['uneCléPublique'] 
	});
	
    }

    onSubmit() {
	console.log('Entrée dans onSubmit');
	
	this.loading = true;

	/* copie le url du pairForm */
	const pair = new PairModel();

	pair.url = this.pairForm.get('url').value;
	pair._id = new Date().getTime().toString();

	console.log('Dans onSubmit pair', pair);
	
	this.pairService.createNewPair(pair)
	    .then(
		() => {
		    this.pairForm.reset();
		    this.loading = false;
		    this.router.navigate(['/pairs/list-pair']);
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
