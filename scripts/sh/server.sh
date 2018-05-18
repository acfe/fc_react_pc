#!/bin/bash
node scripts/build/conf.js local
node scripts/build/html.js
npm run start