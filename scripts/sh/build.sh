#!/bin/bash
if [ $1 == "test" ] || [ $1 == "online" ] || [ $1 == "local" ]
	then
	node scripts/build/conf.js $1
	node scripts/build/html.js
	rm -rf output/$1
	if [ $2 == "watch" ]
        then
        npm run watch
    else
        npm run build
        node scripts/build/conf.js local
    fi
    if [ $2 == "up" ]
        then
        ./scripts/sh/up.sh $1
    fi
fi