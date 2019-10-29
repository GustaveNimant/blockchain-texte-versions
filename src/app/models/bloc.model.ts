export class BlocModel {
    index: number;
    typeContenu: string;
    contenu: string;
    horodatage: string;
    auteurClePublique: string;
    hashPrecedent: string;
    hashCourant: string;
    _id: string; /* texteObjectId*/
    __v: number;

    copyOfBloc (bloc){
	this.index= bloc.index;
	this.typeContenu= bloc.typeContenu;
	this.contenu= bloc.contenu;
	this.horodatage= bloc.horodatage;
	this.auteurClePublique= bloc.auteurClePublique;
	this.hashPrecedent= bloc.hashPrecedent;
	this.hashCourant= bloc.hashCourant;	
    }
}
