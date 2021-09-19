import { Client, Module } from "@core/*";

export default class MainModule extends Module {
    constructor() {
        super(new Client({
            token: process.env.TOKEN
        }));

        this.client.start();
    }
}