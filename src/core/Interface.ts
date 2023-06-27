import { Types } from 'mongoose';

export type ID = Types.ObjectId | string;
export type Primitive =
  | number
  | string
  | null
  | boolean
  | undefined
  | bigint
  | symbol;
