import { QueueEvents } from 'bullmq';

import { Logger } from '@core/observers/logger';
import { bullConfig, WORKER_KEY } from './Queue';

const queueEvents = new QueueEvents(WORKER_KEY, bullConfig);

queueEvents.on('active', active);

export default queueEvents;

function active(job: { jobId: number | string; prev?: string }) {
  const { jobId } = job;

  const logger = new Logger();
  logger.log({
    type: 'jobs',
    foreignKey: `${jobId}`,
    state: { status: 'active' },
  });
}
