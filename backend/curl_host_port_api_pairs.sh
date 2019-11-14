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

curl http://localhost:${port}/api/pairs
