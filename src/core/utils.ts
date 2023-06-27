import { IQueryOptions } from './domain/IRepository';

export const isTestEnvironment = (): boolean => {
  const { NODE_ENV } = process.env;
  return NODE_ENV === 'test';
};

export type TExecQuery<T> = (query: any, config: IQueryOptions) => Promise<T>;

export const populateRef = (ref: any, populateArray: string[]) =>
  populateArray.map((textProp) => ref.populate(textProp));

export const execQuery = (query: any, config: IQueryOptions) => {
  const {
    skip = null,
    limit = null,
    sort = null,
    lean = false,
    populate = null,
    select = null,
  } = config || {};
  if (skip) query.skip(skip);
  if (limit) query.limit(limit);
  if (sort) query.sort(sort);
  if (populate) populateRef(query, populate);
  if (select) query.select(select);
  if (lean) query.lean();
  return query.exec();
};
