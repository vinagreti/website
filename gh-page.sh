#!/bin/bash

if [[ $1 ]]; then
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
  git checkout develop
  rm -r gh-page ;
else
  echo 'OOOOOPS... Inform the target branch :D'
fi
