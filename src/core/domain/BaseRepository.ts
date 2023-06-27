import { FilterQuery } from 'mongoose';

import { TExecQuery, execQuery } from '../utils';
import IRepository, { IQueryOptions } from './IRepository';
import { ID } from '../Interface';

export default function factory<T, IModel, Schema>(model: Schema) {
  return class Repository implements IRepository<T, IModel> {
    model: any;

    constructor() {
      this.model = model;
    }

    create(item: T): Promise<any> {
      const mongoDoc = new this.model(item);
      return mongoDoc.save();
    }

    createMany(items: T[]): Promise<any[]> {
      return this.model.create(items);
    }

    find(query: FilterQuery<T>, config?: IQueryOptions) {
      const ref = this.model.find(query);
      const exec: TExecQuery<IModel[]> = execQuery;
      return exec(ref, config);
    }

    findOne(query: FilterQuery<T>, config?: IQueryOptions) {
      const ref = this.model.findOne(query);
      const exec: TExecQuery<IModel> = execQuery;
      return exec(ref, config);
    }

    findById(id: ID, config?: IQueryOptions) {
      const ref = this.model.findById(id);
      const exec: TExecQuery<IModel> = execQuery;
      return exec(ref, config);
    }

    update<U>(id: ID, props: U) {
      return this.model
        .findByIdAndUpdate(id, props, {
          new: true,
        })
        .exec();
    }

    updateOne(query: FilterQuery<T>, toUpdate: T) {
      return this.model.updateOne(query, toUpdate).exec();
    }

    findByEmail<T>(email: string, config?: IQueryOptions): Promise<T> {
      const ref = this.model.findOne({ email });
      const exec: TExecQuery<T> = execQuery;
      return exec(ref, config);
    }
  };
}
