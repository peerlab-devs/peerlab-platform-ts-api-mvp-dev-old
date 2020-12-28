export default interface ICreateUserSchema {
  isValid(data: object): Promise<boolean>;
}
