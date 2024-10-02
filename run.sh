#!/bin/sh
npx prisma generate;
npx prisma migrate deploy;
pm2-runtime ./index.js;