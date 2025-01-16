import { HeliusClient } from './clients/Helius'
import { ReaderTwitter, ProcessorWallet, ResponderTwitter } from './models/';
import { Pipeline } from './Pipeline';
import { PollingManager } from './PollingManager';
import dotenv from 'dotenv';

dotenv.config();

const HELIUS_API_KEY = process.env.HELIUS_API_KEY || '';

const reader = new ReaderTwitter();
const processor = new ProcessorWallet(new HeliusClient(HELIUS_API_KEY));
const responder = new ResponderTwitter();


const pipeline = new Pipeline(reader, processor, responder);
const initialParams = { since_id: 1, until_id: 2 };
const pollingManager = new PollingManager(pipeline, 1, initialParams); // Poll every 1 minute
pollingManager.start();