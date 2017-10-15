#!/bin/bash
 
git add --all
git add -u
git commit -m "Build GH PAGES - To revert this, squash the last commit."
ng build --prod --output-path="./../dist-foeco.temp" --aot --base-href="./"
cp ./404.html ./../dist-foeco.temp/

git checkout gh-pages
find . -type f -not -nem='.gitignore' -print0 | xargs -0 rm --

mv ./../dist-foeco.temp/* ./
git add --all
git add -u
git commit -m "Buil production from gh-pages.sh"
git push --force
rm -r ./../dist-foeco.temp
git checkout master
