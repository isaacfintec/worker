import { Job } from 'bullmq';
import { Primitive } from '@core/Interface';

export type TOperation<
  In =
    | Primitive
    | { [key: string]: unknown }
    | number[]
    | string[]
    | { [key: string]: unknown }[],
  Out = Promise<any> | number | string | void | never,
> = (data: In) => Out;

/**
 * The propouse for this constructor is handle all operations task fort the job worker
 */

class JobOps {
  jobs: { [key: string]: TOperation };
  constructor() {
    this.jobs = {};
  }

  get handlers() {
    return this.jobs;
  }

  addOperation<In, Out>({
    name,
    operation,
  }: {
    name: string;
    operation: TOperation;
  }) {
    if (this.jobs[name]) {
      /**
       * For debug only
       */
      console.log('Operation already exist with that name');
      return;
    }

    Object.assign(this.jobs, {
      [name]: operation,
    });
  }
}

const biyecoOps = new JobOps();

export default biyecoOps;
