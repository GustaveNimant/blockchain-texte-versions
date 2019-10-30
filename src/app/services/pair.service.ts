import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PairModel } from '../models/pair.model';
import { Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

import * as O from '../outils/management-outils';
import * as process from 'process';

@Injectable({
    providedIn: 'root'
})

export class PairService {

    uri_all = O.uriGet('PairService') + '/api/pairs/';
    
    constructor(private http: HttpClient)
    {
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00', here);
    };

    public pair_a: PairModel[] = [];
    public pair_a$ = new BehaviorSubject<PairModel[]>(this.pair_a);

    public currentPair = new PairModel();
    public currentPair$ = new BehaviorSubject<PairModel>(this.currentPair)
    
    createNewPair(pair: PairModel) {
	let here = O.functionName ();
	console.log('%cEntrée dans Promise','color:#0000aa',here,'avec pair', pair);

	return new Promise((resolve, reject) => {
	    this.http.post(this.uri_all + 'savePair', pair)
		.subscribe( /* POST => createPairCtrl par uri_all */
			    (response) => {
				resolve(response);
			    },
			    (error) => {
				console.log('Dans createNewPair Erreur', error);
				reject(error);
			    },
			    () => {
				console.log('Sortie de createNewPair');
			    }
		);
	});
    }
    
    deletePair(pairObjectId: string) {
	let here = O.functionName ();
	console.log('%cEntrée dans Promise','color:#0000aa',here,'avec pairObjectId',pairObjectId);
	console.log('Dans',here,'uri_all',this.uri_all);
	
	return new Promise((resolve, reject) => {
	    this.http.delete(this.uri_all + pairObjectId).subscribe(
		(response) => {
		    resolve(response);
		},
		(error) => {
		    reject(error);
		}
	    );
	});
    }

    emitCurrentPair(caller) {
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00',here,'avec currentPair',this.currentPair);
	console.log(here,'appelé par',caller);
	
	this.currentPair$.next(this.currentPair);
    }

    emitPairs(caller) {
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00',here,'avec les pairs', this.pair_a);
	this.pair_a$.next(this.pair_a);
    }

    getPairByObjectId(pairObjectId: string) {
	let here = O.functionName();
	console.log('%cEntrée dans Promise','color:#0000aa',here,'avec pairObjectId',pairObjectId);
	console.log('Dans',here,'uri_all',this.uri_all);

	return new Promise((resolve, reject) => {
	    this.http.get(this.uri_all + pairObjectId).subscribe(
		(pai:PairModel) => {
		    if (pai) {
			this.currentPair$.next(pai)
			console.log(here,'emit pai',pai);
		    }
		    resolve(pai);
		},
		(error) => {
		    reject(error);
		}
	    );
	});
    }

    getPairs(caller) {
	let here = O.functionName ();
	console.log('%cEntrée dans Promise','color:#0000ff',here,'avec uri_all',this.uri_all);

	console.log(here,'appelé par',caller);

	return new Promise((resolve, reject) => {
	    this.http.get(this.uri_all).subscribe(
		(pai_a: PairModel[]) => {
		    if (pai_a) {
			this.pair_a = pai_a;
			console.log('Dans',here,'pair_a',pai_a);
			this.emitPairs(here);
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

    modifyPair(id: string, pair: PairModel) { /* update id ? */
	let here = O.functionName ();
	console.log('%cEntrée dans','color!#00aa00','avec id',id, 'et pair', pair);

	return new Promise((resolve, reject) => {
	    this.http.put(this.uri_all + id, pair).subscribe(
		(response) => {
		    resolve(response);
		},
		(error) => {
		    reject(error);
		}
	    );
	});
    }

    providePairByObjectId (pairObjectId: string) {
	let here = O.functionName();
	console.log('%cEntrée dans','color!#00aa00','avec pairObjectId', pairObjectId);

	this.getPairByObjectId (pairObjectId)
	    .then(
		(pai: PairModel) => {
		    console.log('Dans',here,'currentPair\$.next pai',pai);
		},
	    ).catch (
		(error) => {
		    console.log('Dans',here,'getPairByObjectId Erreur', error);
		}
	    );
    }

}
