import dotenv from 'dotenv';

const NODE_ENV = process.env?.NODE_ENV || 'development';

export class Environment {
    config() {
        dotenv.config({path: `src/environments/${NODE_ENV}.env`})
    }
} 