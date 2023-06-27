import { Document } from 'mongoose';
import Logger from './Logger';

export default interface LoggerModel extends Logger, Document {
  _doc?: { [key: string]: any };
  createdAt: string | Date;
  updatedAt: string | Date;
}
