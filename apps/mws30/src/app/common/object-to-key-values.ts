import { KeyValue } from '@angular/common';

export function objectToKeyValues<V>(object: {
  [key: string]: V;
}): Array<KeyValue<string, V>> {
  let keyValue: Array<KeyValue<string, V>> = [];

  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      keyValue = [...keyValue, { key, value: object[key] }];
    }
  }

  return keyValue;
}
