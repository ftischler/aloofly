import { KeyValue } from '@angular/common';

export function keyValuesToObject<V>(keyValue: Array<KeyValue<string, V>>): {[key: string]: V} {
  return keyValue.reduce((acc, {key, value}) => ({...acc, [key]: value}), {});
}
