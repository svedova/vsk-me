#!/usr/bin/env bash
npm run build
ssh vsk "rm -rf /var/www/vsk-me/react && mkdir /var/www/vsk-me/react"
scp -r build/* vsk:/var/www/vsk-me/react
