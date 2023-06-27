export default interface ILogger {
  type: string;
  foreignKey: string;
  config: { [key: string]: any };
  state: { [key: string]: any };
}

export interface UpdateLog {
  config?: { [key: string]: any };
  state: { [key: string]: any };
}
