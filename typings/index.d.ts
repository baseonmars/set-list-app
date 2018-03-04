declare module "*.svg" {
  const content: any;
  export default content;
}

declare type KeyValueObject = { [key: string]: any | KeyValueObject };

declare interface Window {
  __APOLLO_STATE__: KeyValueObject;
}
