import { Worker, Job } from 'bullmq';

import '../core/config';
import { isTestEnvironment } from './core/utils';

if (!isTestEnvironment()) import('./core/db');

import JobOps from './jobs/JobHandler';
import { Logger } from './core/observers/logger';
import './QueueEvents';

import { bullConfig, WORKER_KEY } from './Queue';

const worker = new Worker(WORKER_KEY, dispatchProcess, {
  ...bullConfig,
  removeOnComplete: {
    age: 120 * 3600, // keep up to 5 days
    count: 1000, // keep up to 1000 jobs
  },
  removeOnFail: {
    age: 120 * 3600, // keep up to 5 days
  },
});

worker.on('completed', completed);
worker.on('failed', failed);
worker.on('error', (error) => {
  // log the error
  console.log('worker: ', `Worker error: ${error.message}`);
});

async function dispatchProcess(job) {
  try {
    const { name, data } = job || {};
    const handler = JobOps.handlers[name] || null;

    if (!handler) return console.log('worker', 'Job not found...');

    console.log('worker: ', 'Job found...');
    return handler({ ...data });
  } catch (error) {
    console.log(error);
  }
}

function completed(job: Job, returnvalue: any) {
  const { name, data, id } = job;
  const config = { name, data };
  const state = { status: 'completed', returnvalue };
  const query = { type: 'jobs', foreignKey: id };

  type Config = typeof config;
  type State = typeof data;

  const logger = new Logger();
  logger.update<Config, State>({ query, set: { config, state } });
  console.log('worker: ', 'Job Completed...');
}

function failed(job: Job, error: Error) {
  const { name, data, id } = job;
  const config = { name, data };
  const state = { status: 'failed', error: error.message };
  const query = { type: 'jobs', foreignKey: id };

  type Config = typeof config;
  type State = typeof data;

  const logger = new Logger();
  logger.update<Config, State>({ query, set: { config, state } });
  console.log('worker: ', 'Job Failed...');
}
