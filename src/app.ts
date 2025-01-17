import { HeliusClient } from './clients/Helius'
import { ReaderTwitter, ProcessorWallet, ResponderTwitter } from './models/';
import { Pipeline } from './Pipeline';
import { PollingManager } from './PollingManager';
import { DatabaseHandler } from './db/'
import { Pool } from 'pg';
import dotenv from 'dotenv';

// Load environment-specific variables
if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

const pool = new Pool({
    user: process.env.DB_USER, // Your DB username
    host: process.env.DB_HOST, // Cloud DB host
    database: process.env.DB_NAME, // Database name
    password: process.env.DB_PASSWORD, // Password
    port: 5432, // Default PostgreSQL port
});

const HELIUS_API_KEY = process.env.HELIUS_API_KEY || '';

const db = new DatabaseHandler(pool);
const reader = new ReaderTwitter(db);
const processor = new ProcessorWallet(new HeliusClient(HELIUS_API_KEY));
const responder = new ResponderTwitter();

const pipeline = new Pipeline(reader, processor, responder);
const pollingManager = new PollingManager(pipeline, 1); // Poll every 1 minute
pollingManager.start();