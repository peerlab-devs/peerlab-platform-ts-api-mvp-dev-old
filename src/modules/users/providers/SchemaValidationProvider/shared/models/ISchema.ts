export default interface ISchema {
  isValid(data: object): Promise<boolean>;
}
