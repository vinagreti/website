#!/bin/bash

git add --all
git add -u
git commit -m "Build GH PAGES - To revert this, squash the last commit."
ng build --prod --output-path="./../dist-foeco.temp" --aot --base-href="https://vinagreti.github.io/"
cp ./index.html ./../dist-foeco.temp/404.html
cp ./gh-page.sh ./../dist-foeco.temp/gh-page.sh

git checkout master
rm -r ./*

mv ./../dist-foeco.temp/* ./
git add --all
git add -u
git commit -m "Buil production from master.sh"
git push --force
rm -r ./../dist-foeco.temp
git checkout develop
