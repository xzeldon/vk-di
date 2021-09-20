import dotenv from 'dotenv-safe';
import * as path from 'path';

import { App } from "@core/*";
import MainModule from './main.module';
import HelpModule from './commands/help/help.module';
import CatModule from './commands/cat/cat.module';
import MatchModule from './commands/match/match.module';

dotenv.config({
    path: path.resolve(__dirname, '..', '.env'),
    example: path.resolve(__dirname, '..', '.env.example')
});

const app = new App({
    modules: [
        MainModule,
        HelpModule,
        CatModule,
        MatchModule
    ],
    on_start() {
        console.log('Bot is up and running');
    }
});

app.launch();