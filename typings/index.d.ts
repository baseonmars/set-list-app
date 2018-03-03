declare module "*.svg" {
  const content: any;
  export default content;
}

declare module "just-debounce" {
  const debounce: <T>(fn: T, interval: number) => T;
  export default debounce;
}

declare type KeyValueObject = { [key: string]: any | KeyValueObject };

declare interface Window {
  __APOLLO_STATE__: KeyValueObject;
}
