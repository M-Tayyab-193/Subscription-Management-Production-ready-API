import { Client as WorkflowClient } from "@upstash/workflow";

export const upstashWorkflowClient = new WorkflowClient({
  base: process.env.QSTASH_URL,
  token: process.env.QSTASH_TOKEN,
});

console.log("NODE ENV:", process.env);
console.log("QSTASH TOKEN:", process.env.QSTASH_TOKEN);
