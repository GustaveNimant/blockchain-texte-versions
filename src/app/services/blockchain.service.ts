import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BlocModel }       from '../models/bloc.model';
import { BlockchainModel } from '../models/blockchain.model';
import { Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

import * as O from '../outils/outils-management';
import * as process from 'process';

@Injectable({
    providedIn: 'root'
})

export class BlockchainService {

    uri_all = 'http://localhost:3000/api/blockchain/';
    
    constructor(private http: HttpClient)
    {
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00', here);
    };

    private blockchain = new BlockchainModel();
    public blockchain$ = new BehaviorSubject<BlockchainModel>(this.blockchain);

    emitBlockchain(caller) {
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00',here,'avec la blockchain', this.blockchain);
	this.blockchain$.next(this.blockchain);
    }

    getBlockchain(caller) {
	let here = O.functionName ();
	console.log('%cEntrée dans Promise','color:#0000ff',here,'avec uri_all',this.uri_all);

	console.log(here,'appelé par',caller);

	return new Promise((resolve, reject) => {
	    this.http.get(this.uri_all).subscribe(
		(blo: BlockchainModel) => {
		    if (blo) {
			this.blockchain = blo;
			console.log('Dans',here,'blockchain',blo);
			this.emitBlockchain(here);
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

}
