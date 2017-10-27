#!/bin/bash

if [[ $1 && $2 ]]; then
  if [[ $2 == 'ngjhg98745345igASfg34gDFGs3' ]]; then
    BRANCH="$(git branch -v)"
    rm -r gh-page ;
    git add . && \
    git add -u && \
    git commit -m "Saving/Commiting current branch" ;
    ng build --prod --base-href="https://vinagreti.github.io/" && \
    cp ./index.html ./dist/404.html && \
    mv dist/ gh-page && \
    git checkout $1 && \
    ls | grep -v gh-page | grep -v node_modules | grep -v tsconfig.app.json | xargs rm -r && \
    mv gh-page/* ./ && \
    git add . && \
    git commit -m "GH-PAGE Build ${BRANCH} into $1" && \
    git push --force && \
    git checkout develop &&
    rm -r gh-page &&
    cp gh-page.sh ../.gh-page.sh
  else
      echo 'OOOOOPS... Second parameter is not valid'
  fi
elif [[ $1 ]]; then
  cp gh-page.sh ../.gh-page.sh &&
  ./../.gh-page.sh $1 'ngjhg98745345igASfg34gDFGs3'
  rm -- "$0"
else
  echo 'OOOOOPS... Inform the target branch :D'
fi
