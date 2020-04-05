import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectKeys'
})
export class ObjectKeysPipe implements PipeTransform {
  transform<T>(value: T): Array<keyof T> {
    return Object.keys(value) as Array<keyof T>;
  }
}
