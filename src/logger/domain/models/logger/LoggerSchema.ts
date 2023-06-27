import { Schema, SchemaTypes, model } from 'mongoose';
import ILoggerModel from './LoggerModel';
import { TYPES, ALL_TYPES } from '../../../application/constants/logger';

const schema = new Schema(
  {
    type: {
      type: SchemaTypes.String,
      required: true,
      enum: ALL_TYPES,
    },
    foreignKey: {
      type: SchemaTypes.String,
      required: true,
    },
    config: {},
    state: {},
  },
  {
    autoIndex: false,
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  },
);

schema.index({ id: 'text' });
schema.index({ organization: 1 });

schema.pre('validate', hidrateForeignKey);

export default model<ILoggerModel>('logs', schema);

function hidrateForeignKey(next) {
  if (this.foreignKey) return next();
  this.foreignKey = this._id.toString();
  next();
}
