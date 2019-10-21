import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ProfilModel } from '../models/profil.model';

import * as O from '../outils/outils-management';

@Injectable({
    providedIn: 'root'
})

export class ProfilService {

    uri_all = O.uriGet('ProfilService') + '/api/profils/';

    isAuth$ = new BehaviorSubject<boolean>(false);
    token: string;  /* utilisé dans intercept */
    userId: string; /* utilisé dans intercept */

    public profil_a: ProfilModel[] = [];
    public profil_a$ = new BehaviorSubject<ProfilModel[]>(this.profil_a);

    public currentProfil = new ProfilModel();
    public currentProfil$ = new BehaviorSubject<ProfilModel>(this.currentProfil);
    //    public currentProfil$ = new Subject<ProfilModel>();

    private currentPseudo ='';
    public currentPseudo$ = new BehaviorSubject<string>(this.currentPseudo);

    private loading:boolean = false;

    
    constructor(private router: Router,
		private http: HttpClient)
		{
		    O.constructorLog(O.functionName());
		}

    createNewProfil(profil: ProfilModel) { /* signup */
	let here = O.functionName ();
	console.log('%cEntrée dans Promise','color:#0000aa',here,'avec profil ', profil);
	const uri_signup = this.uri_all + 'signup';
	console.log('Dans',here,'uri_signup',uri_signup);

	return new Promise((resolve, reject) => {
	    this.http.post(uri_signup, profil) /* utilise profilCtrl.js.signup */
		.subscribe(
		    (resp) => {
			this.login (profil.email, profil.password)
			    .then(
				(res) => {
				    resolve(res);
				},
			    ).catch (
				(error) => {
				    console.log('Dans createNewProfil Erreur', error)
				    reject(error);
				}
			    );
		    },
		    (error) => {
			console.log('Dans createNewProfil Erreur, error')
			reject(error);
		    }
		);
	    console.log('Sortie de createNewProfil');
	});
    }

    deleteProfil(id: string) {
	let here = O.functionName ();
	console.log('%cEntrée dans Promise','color:#0000aa',here,'avec id',id);

	console.log('Dans',here,'uri_all',this.uri_all);
	return new Promise((resolve, reject) => {
	    this.http.delete(this.uri_all + id).subscribe(
		(response) => {
		    resolve(response);
		},
		(error) => {
		    reject(error);
		}
	    );
	});
    } // deleteProfil

    emitCurrentProfil(caller) {
	let here = O.functionName ();
	console.log('Entrée dans',here,'appelé par',caller);
	console.log('Avec currentProfil', this.currentProfil);
	this.currentProfil$.next(this.currentProfil);
    }

    emitProfils(caller) {
	let here = O.functionName ();
	console.log('Entrée dans',here,'avec les profils', this.profil_a);
	console.log(here,'appelé par',caller);
	this.profil_a$.next(this.profil_a);
    }

    getProfilByEmail(email: string) {
	let here = O.functionName ();

	console.log('%cEntrée dans Promise','color:#0000aa','avec email', email);	console.log('Dans',here,'uri_all',this.uri_all);
	
	return new Promise((resolve, reject) => {
	    this.http.get(this.uri_all + email).subscribe(
		(com: ProfilModel) => {
		    console.log('Dans',here,'com',com);
		    this.currentProfil = com;
		    this.emitCurrentProfil(here);
		    resolve(com);
		},
		(error) => {
		    console.log('Dans',here,'Erreur', error);
		    reject(error);
		}
	    );
	});
    }

    getProfilById(id: string) {
	let here = O.functionName ();
	console.log('%cEntrée dans Promise','color:#0000aa','avec id',id);

	console.log('Dans',here,'uri_all',this.uri_all);
	
	return new Promise((resolve, reject) => {
	    this.http.get(this.uri_all + id).subscribe(
		(com: ProfilModel) => {
		    console.log('Dans',here,'com',com);
		    if (com) {
			this.currentProfil = com;
			this.emitCurrentProfil(here);
		    }
		    resolve(com);
		},
		(error) => {
		    reject(error);
		}
	    );
	});
    }

    getProfilIdByEmail(email: string) {
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#0000aa','avec email',email);

	this.getProfilByEmail (email)
	    .then(
		(com: ProfilModel) => {
		    console.log('Dans',here,'com', com);
		    return com._id;
		},
	    ).catch (
		(error) => {
		    console.log('Dans',here,'Erreur', error);
		}
	    );
    }

    getProfilPseudoByEmail(email: string) {
	console.log('Entrée dans getProfilPseudoByEmail avec email', email);

	this.getProfilByEmail (email)
	    .then(
		(com: ProfilModel) => {
		    console.log('Dans onLogin getProfilPseudoByEmail com', com);
		    return com.pseudo;
		},
	    ).catch (
		(error) => {
		    console.log('Dans onLogin getProfilPseudoByEmail Erreur', error);
		}
	    );
    }

    getProfilPseudoById(id: string) {
	let here = O.functionName();
	console.log('Entrée dans',here,' avec id', id);

	this.getProfilById (id)
	    .then(
		(com: ProfilModel) => {
		    console.log('Dans',here,'getProfilById com', com);
		    return com.pseudo;
		},
	    ).catch (
		(error) => {
		    console.log('Dans onLogin',here,'Erreur', error);
		}
	    );
    }

    login(email:string, password:string) {
	let here = O.functionName();
	console.log('%cEntrée dans Promise','color:#0000aa','avec email',email,' et password',password); 
	
	const uri_login = this.uri_all + 'login';
	console.log('Dans',here,'uri_login',uri_login);
	
	return new Promise((resolve, reject) => {
	    this.http.post(uri_login,
			   {email: email, password: password})
		.subscribe(
		    (authData: /* get authData from middleware/auth.js from 3000 */
		     { token: string,
		       userId: string
		     }) => {
			 console.log('Dans login.subscribe authData',authData);

			 this.token = authData.token;
			 this.userId = authData.userId;
			 this.isAuth$.next(true);
			 console.log('Dans login.subscribe token', this.token);
			 console.log('Dans login.subscribe userId', this.userId);
			 console.log('Dans login.subscribe isAuth$', this.isAuth$);
			 resolve();
		     },
		    (error) => {
			console.log('Dans login.subscribe Erreur', error, 'pour uri_login', uri_login);
			reject(error);
		    }
		);
	});
    }

    logout() {
	let here = O.functionName();
	console.log('%cEntrée dans','color:#00aa00', here);

	this.isAuth$.next(false);
	this.userId = null;
	this.token = null;
    }


}
