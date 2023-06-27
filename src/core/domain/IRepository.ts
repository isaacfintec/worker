import { Document, FilterQuery } from 'mongoose';

export interface IQueryOptions {
  lean?: boolean;
  populate?: string[];
  skip?: number;
  limit?: number;
  select?: string; // +password
  sort?: 1 | -1;
}

export default interface IRepository<T, M> {
  create(item: T): Promise<Document<M>>;
  find(query: FilterQuery<T>, config?: IQueryOptions): Promise<M[]>;
  findById(id: string, config?: IQueryOptions): Promise<M>;
  findOne(query: FilterQuery<T>, config?: IQueryOptions): Promise<M>;
  updateOne(query: FilterQuery<T>, item: T): Promise<any>;
}
