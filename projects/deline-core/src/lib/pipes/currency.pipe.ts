import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dlnCurrency',
})
export class DlnCurrencyPipe implements PipeTransform {
  transform(
    value: number | string | null | undefined,
    currencyCode: string = 'USD',
    display: 'symbol' | 'code' | 'narrowSymbol' = 'symbol',
    digitsInfo?: string,
  ): string {
    if (value === null || value === undefined || value === '') return '';

    const num = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(num)) return '';

    try {
      return new Intl.NumberFormat('es', {
        style: 'currency',
        currency: currencyCode,
        currencyDisplay: display,
        minimumFractionDigits: digitsInfo ? undefined : 2,
        maximumFractionDigits: digitsInfo ? undefined : 2,
      }).format(num);
    } catch {
      return `${num.toFixed(2)} ${currencyCode}`;
    }
  }
}
