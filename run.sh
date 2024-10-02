#!/bin/sh
# run infinite loop
tail -f /dev/null;

npx prisma generate;
npx prisma migrate deploy;
pm2-runtime ./index.js;