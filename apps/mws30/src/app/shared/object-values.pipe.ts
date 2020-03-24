import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectValues'
})
export class ObjectValuesPipe implements PipeTransform {
  transform<T>(value: {[key: string]: T}): T[] {
    return Object.values(value);
  }
}
