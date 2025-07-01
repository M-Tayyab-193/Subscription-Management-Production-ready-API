import {Client as WorkflowClient} from '@upstash/workflow';
import { QSTASH_URL, QSTASH_TOKEN } from './env.js';

export const upstashWorkflowClient = new WorkflowClient({
    base: process.env.QSTASH_URL,
    token: process.env.QSTASH_TOKEN,
});

console.log("QSTASH TOKEN: ", process.env.QSTASH_TOKEN);
