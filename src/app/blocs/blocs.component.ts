import { Component, OnInit } from '@angular/core';
import { StateService } from '../services/state.service';
import { ProfilService } from '../services/profil.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blocs',
  templateUrl: './blocs.component.html',
  styleUrls: ['./blocs.component.scss']
})

export class BlocsComponent implements OnInit {

    public titre: string;
    public isAuth: boolean;
    private isAuthSub: Subscription;
    private currentUrl: string;

    constructor(private stateService: StateService,
		private profilService: ProfilService,
		private router: Router)
		{
		    console.log('Entrée dans constructor');
		}

    ngOnInit() {
	console.log('Entrée dans ngOnInit');

	this.titre = "Les blocs"

	this.isAuthSub = this.profilService.isAuth$.subscribe(
	    (boo) => {  /* Pour afficher les blocs */
		this.isAuth = boo;
		console.log('Dans ngOnInit isAuth', this.isAuth);
	    }
	);

	this.stateService.currentUrl$.next(this.router.url);
	console.log('Dans ngOnInit this.router.url', this.router.url);
	
    }

}
