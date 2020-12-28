import * as Yup from 'yup';

import ICreateUserSchema from '../models/ICreateUserSchema';

const YupObjectSchema = Yup.object();

class YupCreateUserSchema implements ICreateUserSchema {
  private schema: typeof YupObjectSchema;

  constructor() {
    this.schema = Yup.object().shape({
      name: Yup.string().required(),
      surname: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    });
  }

  public async isValid(data: object): Promise<boolean> {
    /** Get true or false */
    const result = await this.schema.isValid(data);

    /** If result is true, return true, else return false */
    return !!result;
  }
}

export default YupCreateUserSchema;
