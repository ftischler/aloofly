import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'abs'
})
export class AbsPipe implements PipeTransform {
  transform(signedNumber: number): number {
    return Math.abs(signedNumber);
  }
}
