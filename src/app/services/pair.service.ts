import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PairModel } from '../models/pair.model';
import { Subject } from 'rxjs';

import * as O from '../outils/outils-management';

@Injectable({
    providedIn: 'root'
})

export class PairService {

    uri_all = O.uriGet('PairService') + '/api/pairs/';
    uri_new = this.uri_all;

    constructor(private http: HttpClient) {
	console.log('Entrée dans constructor');
    };

    private pairs: PairModel[] = [];

    public pairs$ = new Subject<PairModel[]>();

    createNewPair(pair: PairModel) {
	console.log('Entrée dans createNewPair avec pair', pair);

	return new Promise((resolve, reject) => {
	    this.http.post(this.uri_all, pair) /* POST => createPairCtrl par uri_all */
		.subscribe(
		    (response) => {
			console.log('Dans createNewPair respons est', response);
			resolve(response);
		    },
		    (error) => {
			console.log('Erreur dans createNewPair');
			reject(error);
		    },
		    () => {
			console.log('Sortie de createNewPair');
		    }
		);
	});
    }

    deletePair(id: string) {
	console.log('Entrée dans deletePair avec id',id);

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
    }
    emitPairs() {
	console.log('Entrée dans emitPair avec pairs', this.pairs);
	this.pairs$.next(this.pairs);
    }

    getPairs() {
	console.log('Entrée dans getPairs avec uri', this.uri_all);

	this.http.get(this.uri_all).subscribe(
	    (par_a: PairModel[]) => {
		if (par_a) {
		    this.pairs = par_a;
		    this.emitPairs();
		}
	    },
	    (error) => {
		console.log('Dans getPairs Erreur:', error);
	    },
	    () => {console.log('getPairs fini !')}
	);
    }

    getPairById(id: string) {
	console.log('Entrée dans getPairById avec id', id);

	return new Promise(
	    (resolve, reject) => {
		this.http.get(this.uri_all + id).subscribe(
		    (response) => {
			resolve(response);
		    },
		    (error) => {
			reject(error);
		    }
		);
	    });
    }
    
    modifyPair(id: string, pair: PairModel) {
	console.log('Entrée dans modifyPair avec id',id, 'et pair', pair);

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

}
