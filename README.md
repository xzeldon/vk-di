# vk-di

🤖 A TypeScript wrapper around [vk-io](https://github.com/negezor/vk-io)

This repository is an **example** of a runtime dependency injection implementation, metadata reflection and the service provider pattern in TypeScript. 

- Decorators for declarative syntax 🛋
- Runtime Dependency injection support 💉
- Modular structure for better organizaed projects 🏗

## Getting Started

### Install dependencies

```
npm i
```
or
```
yarn install
```
### Getting started
> index.ts (entry point)

Your `index.ts` is the main entry point of your application. Your application consists of at least one "MainModule" and as many other sub-class modules as you want. You define them all here for runtime instantiation.

```ts
const app = new App({
    modules: [
        MainModule
    ],
    on_start() {
        console.log('Bot is up and running');
    }
});

app.launch();
```

>main.module.ts

Your main modules's primary responsibility should be authenticating your bot. Pass a `Client` instance with      `Options` object that contains the `token` field to the constructor and then call `start()` on the `this.client` property. The main module might also be a good place to add global on state change events.

```ts
import { MessageContext } from "vk-io";
import { Client, Module } from "@core/*";

export default class MainModule extends Module {
    constructor() {
        super(new Client({
            token: process.env.TOKEN
        }));

        this.client.start();
    }

    /**
     * The bot will be trigger to message '/ping'.
     * You can also use regular expressions instead of
     * strings.
     */

    @Command('ping', { prefix: '/' })
    on_ping(context: MessageContext) {
        context.send('pong!');
    }
}
```

An example of a fully working bot can be found in `simple-bot` package.

## Inspired by
* [NestJS](https://github.com/nestjs/nest)
* [Angular](https://github.com/angular/angular)
