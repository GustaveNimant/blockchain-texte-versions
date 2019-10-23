import { Component, OnDestroy, OnInit }       from '@angular/core';
import { ActivatedRoute, Params, Router }     from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription }               from 'rxjs';
import { ProfilModel }                from '../../models/profil.model';
import { ProfilService }              from '../../services/profil.service';
import { StateService }               from '../../services/state.service';

import * as O from '../../outils/outils-management';

@Component({
    selector: 'app-new-profil',
    templateUrl: './new-profil.component.html',
    styleUrls: ['./new-profil.component.scss']
})

export class NewProfilComponent implements OnInit, OnDestroy {

    public profilForm: FormGroup;
    public loading = false;
    public errorMessage: string;

    public currentEmail: string ='';
    
    constructor(
	private formBuilder: FormBuilder,
	private router: Router,
	private activatedRoute: ActivatedRoute,
	private profilService: ProfilService,
	private stateService: StateService)
	{
	    let here = O.functionName ();
	    console.log('%cEntrée dans','color:#00aa00', here);
	}
    
    ngOnInit() {
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00', here);
	
	this.stateService.mode$.next('form');

	this.activatedRoute.params.subscribe(
	    (params: Params) => {
		console.log('Dans',here,'params', params);
		if (params.id) {
		    this.currentEmail = params.id;
		} 
	    }
	);

	console.log('Dans',here,'currentEmail', this.currentEmail);
	    this.profilForm = this.formBuilder.group({
		pseudo: [null, Validators.required],
		email: [null, Validators.required, Validators.email],
		password: [null, [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
		clePublique: [null, Validators.required],
	    });
    }
    
    onSubmit() {
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00', here);
	
	this.loading = true;

	const profil = new ProfilModel();
	profil.pseudo = this.profilForm.get('pseudo').value;
	profil.email = this.profilForm.get('email').value;
	profil.password = this.profilForm.get('password').value;
	profil.clePublique = this.profilForm.get('clePublique').value;
	profil._id = new Date().getTime().toString();

	console.log('Dans onSubmit profil', profil);

	this.profilService.createNewProfil(profil)
	    .then(
		() => {
		    this.profilForm.reset();
		    this.loading = false;
		    this.router.navigate(['/profils/list-profil']);
		}
	    )
	    .catch(
		(error) => {
		    console.log('Dans onSubmit Erreur', error);
		    this.loading = false;
		    this.errorMessage = error.message;
		    switch (error.status) {
			case 500:
			    const message = 'l\'adresse '+ profil.email +' est déjà enregistrée.\nEntrez une nouvelle adresse';
			    alert (message);
			    break;
			default:
			    break;
		    }
		}
	    );
    }

    ngOnDestroy() {
    }

}
