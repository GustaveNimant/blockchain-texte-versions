#!/bin/bash

args=$*
argnumber=$#

script=`basename $0`
host=$1
shift;port=$1
last=2

if [ $argnumber -ne $last ] 
then
    echo -e "Usage :\n$script <host> <port>\n"
    echo -e "Example :\n$script 88.191.137.54 3000\n"
    exit 1
fi

curl -H "Content-type:application/json" --data '{"index" : 1, "typeContenu": "texte","contenu": "Ceci est un deuxième texte","horodatage": "23 octobre 2019","hashPrecedent": "snsjhjd","hashCourant": "atztzyezyey","auteurClePublique": "adsrsstzyetzye"}' http://${host}:${port}/api/blocs/mineBloc

