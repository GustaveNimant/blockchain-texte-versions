import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BlocModel } from '../models/bloc.model';
import { Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

import * as M from '../outils/management-outils';
import * as process from 'process';

@Injectable({
    providedIn: 'root'
})

export class BlocService {

    uri_all = M.uriGet('BlocService') + '/api/blocs/';
    
    constructor(private http: HttpClient)
    {
	let here = M.functionName ();
	console.log('%cEntrée dans','color:#00aa00', here);
    };

    public bloc_a: BlocModel[] = [];
    public bloc_a$ = new BehaviorSubject<BlocModel[]>(this.bloc_a);

    public currentBloc = new BlocModel();
    public currentBloc$ = new BehaviorSubject<BlocModel>(this.currentBloc)
    
    createNewBloc(bloc: BlocModel) {
	let here = M.functionName ();
	console.log('%cEntrée dans Promise','color:#0000aa',here,'avec bloc', bloc);

	return new Promise((resolve, reject) => {
	    this.http.post(this.uri_all + 'saveBloc', bloc)
		.subscribe( /* POST => createBlocCtrl par uri_all */
			    (response) => {
				resolve(response);
			    },
			    (error) => {
				console.log('Dans createNewBloc Erreur', error);
				reject(error);
			    },
			    () => {
				console.log('Sortie de createNewBloc');
			    }
		);
	});
    }
    
    createNewBlocVersion(blocObjectId: string, bloc: BlocModel) { /* blocObjectId  conservé */
	let here = M.functionName ();
	console.log('%cEntrée dans Promise','color:#0000aa',here,'avec blocObjectId',blocObjectId);

	return new Promise((resolve, reject) => {
	    this.http.post(this.uri_all + blocObjectId, bloc).subscribe(
		(response) => {
		    resolve(response);
		},
		(error) => {
		    reject(error);
		}
	    );
	});
    }

    deleteBloc(blocObjectId: string) {
	let here = M.functionName ();
	console.log('%cEntrée dans Promise','color:#0000aa',here,'avec blocObjectId',blocObjectId);
	console.log('Dans',here,'uri_all',this.uri_all);
	
	return new Promise((resolve, reject) => {
	    this.http.delete(this.uri_all + blocObjectId).subscribe(
		(response) => {
		    resolve(response);
		},
		(error) => {
		    reject(error);
		}
	    );
	});
    }

    emitCurrentBloc(caller) {
	let here = M.functionName ();
	console.log('%cEntrée dans','color:#00aa00',here,'avec currentBloc',this.currentBloc);
	console.log(here,'appelé par',caller);
	
	this.currentBloc$.next(this.currentBloc);
    }

    emitBlocs(caller) {
	let here = M.functionName ();
	console.log('%cEntrée dans','color:#00aa00',here,'avec les blocs', this.bloc_a);
	this.bloc_a$.next(this.bloc_a);
    }

    getBlocByObjectId(blocObjectId: string) {
	let here = M.functionName();
	console.log('%cEntrée dans Promise','color:#0000aa',here,'avec blocObjectId',blocObjectId);
	console.log('Dans',here,'uri_all',this.uri_all);

	return new Promise((resolve, reject) => {
	    this.http.get(this.uri_all + blocObjectId).subscribe(
		(tex:BlocModel) => {
		    if (tex) {
			this.currentBloc$.next(tex)
			console.log(here,'emit tex',tex);
		    }
		    resolve(tex);
		},
		(error) => {
		    reject(error);
		}
	    );
	});
    }

    getBlocs(caller) {
	let here = M.functionName ();
	console.log('%cEntrée dans Promise','color:#0000ff',here,'avec uri_all',this.uri_all);

	console.log(here,'appelé par',caller);

	return new Promise((resolve, reject) => {
	    this.http.get(this.uri_all).subscribe(
		(tex_a: BlocModel[]) => {
		    if (tex_a) {
			this.bloc_a = tex_a;
			console.log('Dans',here,'bloc_a',tex_a);
			this.emitBlocs(here);
		    }
		},
		(error) => {
		    console.log('Dans',here,'Erreur', error);
		    console.log('Dans',here,'error.status', error.status);
		    switch (error.status) {
			case 0:
			    console.log('Dans',here,'run nodemon server');
			    break;
			default:
			    break;
		    }
		},
		() => {
		    console.log('%cSortie de','color:#aa0000', here);
		}
	    );
	});
	
    }

    modifyBloc(id: string, bloc: BlocModel) { /* update id ? */
	let here = M.functionName ();
	console.log('%cEntrée dans','color!#00aa00','avec id',id, 'et bloc', bloc);

	return new Promise((resolve, reject) => {
	    this.http.put(this.uri_all + id, bloc).subscribe(
		(response) => {
		    resolve(response);
		},
		(error) => {
		    reject(error);
		}
	    );
	});
    }

    provideBlocByObjectId (blocObjectId: string) {
	let here = M.functionName();
	console.log('%cEntrée dans','color!#00aa00','avec blocObjectId', blocObjectId);

	this.getBlocByObjectId (blocObjectId)
	    .then(
		(tex: BlocModel) => {
		    console.log('Dans',here,'currentBloc\$.next tex',tex);
		},
	    ).catch (
		(error) => {
		    console.log('Dans',here,'getBlocByObjectId Erreur', error);
		}
	    );
    }

}
