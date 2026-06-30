import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dlnTruncate',
})
export class DlnTruncatePipe implements PipeTransform {
  transform(
    value: string | null | undefined,
    maxLength: number = 100,
    ellipsis: string = '...',
  ): string {
    if (value === null || value === undefined) return '';
    if (value.length <= maxLength) return value;
    return value.substring(0, maxLength) + ellipsis;
  }
}
