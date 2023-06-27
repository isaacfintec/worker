import JobOps, { TOperation } from './JobHandler';

type Response = string | number;
export type Data = { foo: number; error: boolean };

const testStrategy: TOperation<Data, Promise<Response> | never> = (data) => {
  return new Promise((resolve, reject) => {
    if (data.error) reject('!Ups');
    setTimeout(() => {
      resolve(200);
    }, 5000);
  });
};

JobOps.addOperation({ name: 'payments', operation: testStrategy });

export default testStrategy;
