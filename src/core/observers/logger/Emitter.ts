import { EventEmitter } from 'events';
import Observer from './Observer';

export type DefaultConfig = { ref: string; url: string };
export type DefaultState = { [key: string]: any };
export type LogTypes = 'loggEntries' | 'jobs';
export interface Input<Config = DefaultConfig, State = DefaultState> {
  config?: Config;
  state: State;
}

export default class Logger extends EventEmitter {
  chanel: string;
  observer: any;

  constructor(chanelName?: string) {
    super();
    this.chanel = chanelName || 'Logger';
    this.observer = new Observer(this, this.chanel);
    this.observer.listen();
  }

  log<Config = undefined, State = undefined>(props: {
    type: LogTypes;
    config?: Config;
    state?: State;
    foreignKey?: string | number;
  }) {
    super.emit(this.chanel, { action: 'save', ...props });
  }

  update<Config = undefined, State = undefined>(props: {
    query: { [key: string]: unknown };
    set: Input<Config, State>;
  }) {
    super.emit(this.chanel, { action: 'update', ...props });
  }

  stopListen() {
    const { chanel, observer } = this;
    super.removeListener(chanel, observer);
    return super.listeners(chanel);
  }
}
