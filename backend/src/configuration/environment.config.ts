import dotenv from 'dotenv';

const NODE_ENV = process.env?.NODE_ENV || 'development';

export const Environment = () => {
    dotenv.config({path: `src/configuration/environments/${NODE_ENV}.env`})
} 