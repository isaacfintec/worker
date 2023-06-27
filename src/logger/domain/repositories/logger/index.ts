import RepositoryFactory from '@core/domain/BaseRepository';
import LoggerSchema from '../../models/logger/LoggerSchema';
import LoggerModel from '../../models/logger/LoggerModel';
import Logger from '../../models/logger/Logger';

export default RepositoryFactory<Logger, LoggerModel, typeof LoggerSchema>(
  LoggerSchema,
);
