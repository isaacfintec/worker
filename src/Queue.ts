import { Queue, QueueEvents } from 'bullmq';

const {
  REDIS_PREFIX,
  REDIS_PORT,
  REDIS_HOST,
  REDIS_USER,
  REDIS_KEY,
  WORKER_NAME,
  ENV,
} = process.env;

export const redisConfig = {
  port: +REDIS_PORT,
  host: REDIS_HOST,
  username: REDIS_USER,
  password: REDIS_KEY,
};

export const WORKER_KEY = WORKER_NAME || ENV || 'worker';

export interface JobOperation<
  D =
    | { [key: string]: unknown }
    | number[]
    | string[]
    | { [key: string]: unknown }[],
> {
  name: string;
  data: D;
}

export const bullConfig = {
  prefix: REDIS_PREFIX,
  connection: redisConfig,
};

Object.freeze(bullConfig);

type TBullConfig = typeof bullConfig;

class BullQueue {
  queue: Queue | null;
  readonly workerName: string;
  private config: TBullConfig;

  constructor(name: string, config: TBullConfig) {
    this.queue = null;
    this.workerName = name;
    this.config = config;
  }

  private init() {
    const { workerName, config } = this;

    if (this.queue) return this.queue;

    this.queue = new Queue(workerName, config);
    return this.queue;
  }

  addJob<D>(props: JobOperation<D>) {
    const { name, data } = props;

    if (!this.queue) this.init();

    return this.queue.add(name, data);
  }
}

const biyecoQueue = new BullQueue(WORKER_KEY, bullConfig);

export default biyecoQueue;
