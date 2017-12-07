#!/usr/bin/env bash
ssh ubuntu@vsk "rm -rf /var/www/vsk-me-react && mkdir /var/www/vsk-me-react" && scp -r build/* ubuntu@vsk:/var/www/vsk-me-react
