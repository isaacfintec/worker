import '../worker';
import Queue from '../Queue';
import '@src/jobs/testStartegy';
import { Data } from '@src/jobs/testStartegy';

Queue.addJob<Data>({ name: 'payments', data: { foo: 2000, error: false } });
Queue.addJob<Data>({ name: 'payments', data: { foo: 500, error: true } });
