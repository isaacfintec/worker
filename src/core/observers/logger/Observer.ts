import { EventEmitter } from 'events';

import LoggerRepository from '../../../logger/domain/repositories/logger';
import ILogger from '../../../logger/domain/models/logger/Logger';

type Input = ILogger & { action: string };

export default class LoggerObserver {
  emitter: EventEmitter;
  chanel: string;

  constructor(emitter: EventEmitter, chanel: string) {
    this.emitter = emitter;
    this.chanel = chanel;
  }

  errorHandler(err) {
    console.error(`Process handler it failed with: ${err.message}`);
    console.error(err.stack);
  }

  listen() {
    const { emitter, chanel, doOperation, errorHandler } = this;
    emitter.on(chanel, doOperation.bind(this));
    emitter.on('error', errorHandler);
  }

  async saveLog(inputData: ILogger): Promise<any> {
    console.log('saveLog');
    const loggerRepo = new LoggerRepository();
    return loggerRepo.create(inputData);
  }

  updateLog({ query, set }) {
    console.log('updateLog');
    const loggerRepo = new LoggerRepository();
    return loggerRepo.updateOne(query, set);
  }

  get handlers() {
    const { saveLog, updateLog } = this;
    const _handlers = {
      save: (doc) => saveLog(doc),
      update: (props) => updateLog(props),
      default: () => console.log('STRATEGY NOT FOUND'),
    };
    return _handlers;
  }

  doOperation(logInputData: Input): Promise<unknown> {
    const { handlers } = this;
    const { action, ...props } = logInputData;
    const handler = handlers[action] || handlers.default;
    return handler(props);
  }
}
