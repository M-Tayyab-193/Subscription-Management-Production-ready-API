import {Client as WorkflowClient} from '@upstash/workflow';
import { QSTASH_URL, QSTASH_TOKEN } from './env.js';

export const upstashWorkflowClient = new WorkflowClient({
    base: QSTASH_URL,
    token: QSTASH_TOKEN,
});