# Willforge 

## une communauté produit des milliers de versions d'un texte ##

Une communauté (par exemple le peuple français) désire produire un texte qui fasse consensus (sa nouvelle Constitution par exemple)

Il est bien sûr hors de question de rassembler physiquement plusieurs millions de Français dans un même espace et de permettre à chacun de s’exprimer à la tribune. Or, nous ne sommes plus au temps des sans-culottes, chacun dispose aujourd’hui d’un ordinateur ou d’un smartphone donnant accès à Internet.

Utilisons ces nouveaux outils pour mettre en chantier la démocratie directe et participative que nous appelons de nos vœux

Seulement, si chaque participant envoie son propre texte et que ce texte est en même temps adressé pour accord (ou correction) à chaque rédacteur, nous voyons d’ici le chaos engendré.

Il nous faut donc un protocole informatique d’évaluation des différentes versions, de manière qu’au bout d’un laps de temps fixé à l’avance nous parvenions à ceci :<br>
Chaque participant étant à la fois rédacteur de son texte, lecteur et juge de ceux qui lui sont confiés, on fera en sorte que

* chaque version soit évaluée par un nombre identique de participants
* chaque participant évalue un nombre à peu près identique de versions
* La version la plus consensuelle sera ainsi sélectionnée

## protocole d'évaluation ##

La communauté s’est organisée en un réseau __peer to peer__ (pair à pair) dans laquelle sont enregistrés tous les participants et toutes les versions. Ainsi, chaque membre (par exemple Léon) peut se connecter quand il le veut et aussi longtemps qu’il le veut,

À chacune de ses connexions, le réseau procure à Léon une dizaine de versions prises au hasard dans la base de données. Léon les examine et attribue à chacune une note allant de -5 à +5, laquelle note est enregistrée dans la base de données en même temps que l’identifiant de Léon.

La même chose en ce qui concerne Léa, Léo, etc

## Différentes étapes : ##

Chaque étape consistera à distribuer des paquets de 10 versions prises au hasard, à des participants, pris eux aussi au hasard, pour qu’ils les notent

La première étape se terminera lorsqu’un nombre de versions (par exemple 1000) auront obtenu 100 notes de 100 participants différents. On calculera alors, pour chaque version, la moyenne de ces 100 notes. Puis on sélectionnera le dixième des versions les mieux notées, lesquelles feront l’objet de la deuxième étape. Les autres versions seront éliminées.

## Étapes suivantes :##

* Lors de la deuxième étape, on procédera comme précédemment. Mais cette fois, on demandera à 1000 participants de les noter, et les nouvelles notes seront enregistrées dans la base de données. Dès qu’un nombre prédéfini de versions auront obtenu 1000 notes, on sélectionnera comme précédemment 10% des meilleures moyennes.
En fin de deuxième étape, on n’aura donc conservé qu’un pourcent (1%) des versions de départ. 

* Au fur et à mesure des étapes, on multipliera ainsi le nombre de notations par dix tout en divisant par dix le nombre de versions

## Dernière étape :##

On distribuera, pour notation, les versions provenant des différents processus de sélection à l’ensemble des participants. La version la mieux notée sera considérée comme consensuelle.

##remarques ## 
Nous n'avons pas décrit ici la façon dont les différentes versions sont introduites initialement dans le réseau. 

On remarquera que la procédure utilisée pour l'adoption du [préambule de la Charte commune des Gilets Jaunes](https://charte.lalignejaune.fr/) revient à ne distribuer qu'une seule version du texte que l'on accepte ou refuse.

Le protocole décrit ici est assez primitif et peut subir de nombreuses améliorations. On pourrait fournir l'historique des modifications des versions avec la possibilité de visualiser les différences. On pourrait aussi imaginer qu'au lieu de noter les versions de -5 à +5 on utilise [la méthode du Jugement majoritaire](https://fr.wikipedia.org/wiki/Jugement_majoritaire). 

Il faut noter qu'un participant peut aussi bien être un individu qu'un collectif dont la version est issue d'un travail de groupe.

# Angular8crud
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.1.1.
 rxjs 6.4.0 typescript 3.4.5 angular/material 8.0.2.

## Frontend server
Go to src/app and Run `ng serve`. Navigate to `http://localhost:4200/`.

## Backend server
Go to backend and Run `nodemon server` . Navigate to `http://localhost:3000/`. 


