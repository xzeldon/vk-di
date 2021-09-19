# Example bot application

This directory contains an example a general purpose bot applicaiton with trivia stuff like random cat pictures and reaction to text messages. Let's start with an overview of the structure of our folders.

    .
    └── simple-bot/ <-- root directory
        ├── node_modules
        ├── src/ <-- source code files
        │   ├── commands/ <-- command's folder
        │   │   ├── cat <-- 'cat' command
        │   │   ├── help <-- 'help' command
        │   │   └── match <-- 'match' command
        │   ├── index.ts <-- entry point
        │   └── main.module.ts <-- main module
        ├── .env.example <-- env var example file
        └── package.json

## First launch

First of all, copy `.env.example` to bot root directory, rename it to `.env` and replace the token with the real one. You should get something like this:

    .
    └── simple-bot/
        ├── node_modules
        ├── src/
        │   ├── commands/
        │   │   ├── cat
        │   │   ├── help
        │   │   └── match
        │   ├── index.ts
        │   └── main.module.ts
        ├── .env.example
        ├── .env <-- renamed file
        └── package.json


Some useful `package.json` scripts:
- `npm run build` or `yarn build` — build all packages
- `npm run watch` or `yarn watch`— incremental rebuild when source files change on disk
- `npm run clean` or `yarn clean` — remove `dist` folder inside all packages

Finally, to launch the bot, build project as described above. Now you can start the bot with `node ./packages/simple-bot/dist/index.js` (If you are in the root directory of the entire project).