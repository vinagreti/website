#!/bin/bash

git add --all
git add -u
git commit -m "Saving/Commiting current branch"
ng build --prod --aot --base-href="https://vinagreti.github.io/"
cp ./index.html ./dist/404.html

git checkout $1
rm -r ./*
mv ./dist/* ./
git add --all
git commit -m "Buil $1 from ${git branch}"
git push --force
git checkout develop
