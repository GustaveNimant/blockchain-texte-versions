import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainMenuComponent }     from './main-menu/main-menu.component';

import { BlocsComponent }                from './blocs/blocs.component';


import { BlockchainComponent }           from './blocs/blockchain/blockchain.component';
import { BroadcastListBlocComponent }    from './blocs/broadcast-list-bloc/broadcast-list-bloc.component';
import { ListBlocComponent }             from './blocs/list-bloc/list-bloc.component';
import { NewBlocComponent }              from './blocs/new-bloc/new-bloc.component';
import { SingleBlocComponent }           from './blocs/single-bloc/single-bloc.component';

import { TextesComponent }                from './textes/textes.component';
import { ListTexteComponent }             from './textes/list-texte/list-texte.component';
import { ModifyTexteComponent }           from './textes/modify-texte/modify-texte.component';
import { NewTexteComponent }              from './textes/new-texte/new-texte.component';
import { NewTexteVersionComponent }       from './textes/new-texte-version/new-texte-version.component';
import { SingleTexteComponent }           from './textes/single-texte/single-texte.component';

import { PairsComponent }                  from './pairs/pairs.component';
import { ListPairComponent }               from './pairs/list-pair/list-pair.component';
import { ModifyPairComponent }             from './pairs/modify-pair/modify-pair.component';
import { NewPairComponent }                from './pairs/new-pair/new-pair.component';
import { SinglePairComponent }             from './pairs/single-pair/single-pair.component';

import { NotationsComponent }             from './notations/notations.component';
import { ByobjectidNotationComponent }    from './notations/byobjectid-notation/byobjectid-notation.component';
import { ListNotationComponent }          from './notations/list-notation/list-notation.component';
import { NewNotationComponent }           from './notations/new-notation/new-notation.component';
import { SingleNotationComponent }        from './notations/single-notation/single-notation.component';

import { ProfilComponent }               from './profils/profil.component';
import { NewProfilComponent }            from './profils/new-profil/new-profil.component';
import { SingleProfilComponent }         from './profils/single-profil/single-profil.component';

import { LoginComponent } from './login/login.component';

const routes: Routes = [
    { path: 'blocs', component: BlocsComponent,
      children: [
	  { path: 'blockchain', component: BlockchainComponent},
	  { path: 'new-bloc', component: NewBlocComponent},
	  { path: 'new-bloc/:id', component: NewBlocComponent},
	  { path: 'broadcast-list-bloc', component: BroadcastListBlocComponent},
	  { path: 'list-bloc', component: ListBlocComponent},
	  { path: 'single-bloc/:id', component: SingleBlocComponent},
	  { path: '', pathMatch: 'full', redirectTo: 'list-bloc' },
	  { path: '**', redirectTo: 'list-bloc' }
      ]
    },
    { path: 'pairs', component: PairsComponent,
      children: [
	  { path: 'new-pair', component: NewPairComponent},
	  { path: 'list-pair', component: ListPairComponent},
	  { path: 'single-pair/:id', component: SinglePairComponent},
	  { path: 'modify-pair/:id', component: ModifyPairComponent},
	  { path: '', pathMatch: 'full', redirectTo: 'list-pair' },
	  { path: '**', redirectTo: 'list-pair' }
      ]
    },
    { path: 'profil', component: ProfilComponent,
      children: [
	  { path: 'new-profil', component: NewProfilComponent},
	  { path: 'new-profil/:id', component: NewProfilComponent},
	  { path: 'single-profil', component: SingleProfilComponent },
	  { path: '', pathMatch: 'full', redirectTo: 'single-profil' },
	  { path: '**', redirectTo: '' }
      ]
    },
    { path: 'textes', component: TextesComponent,
      children: [
	  { path: 'new-texte', component: NewTexteComponent},
	  { path: 'single-texte/:id', component: SingleTexteComponent },
	  { path: 'list-texte', component: ListTexteComponent },
	  { path: 'new-texte-version/:id', component: NewTexteVersionComponent },
	  { path: 'modify-texte/:id', component: ModifyTexteComponent },
	  { path: '', pathMatch: 'full', redirectTo: 'list-texte' },
	  { path: '**', redirectTo: 'list-texte' }
      ]
    },
    { path: 'notations', component: NotationsComponent,
      children: [
	  { path: 'new-notation', component: NewNotationComponent},
	  { path: 'new-notation/:id', component: NewNotationComponent},
	  { path: 'list-notation', component: ListNotationComponent},
	  { path: 'single-notation/:id', component: SingleNotationComponent},
	  { path: 'byobjectid-notation/:texteObjectId', component: ByobjectidNotationComponent},
	  { path: '', pathMatch: 'full', redirectTo: 'list-notation' },
	  { path: '**', redirectTo: 'list-notation' }
      ]
    },
    { path: 'login', component: LoginComponent },
    { path: 'main-menu', component: MainMenuComponent },
    { path: '', pathMatch: 'full', component: MainMenuComponent },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [
	RouterModule.forRoot(routes)
    ],
    exports: [
	RouterModule
    ],
    providers: [
    ]
})
export class AppRoutingModule {}
