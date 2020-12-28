import { container } from 'tsyringe';

import ISchema from '@modules/users/providers/SchemaValidationProvider/shared/models/ISchema';
import YupCreateUserSchemaValidation from '@modules/users/providers/SchemaValidationProvider/CreateUserSchemaValidation/implementations/YupCreateUserSchemaValidation';

const providers = {
  yup: YupCreateUserSchemaValidation,
};

container.registerSingleton<ISchema>('CreateUserSchema', providers.yup);
