import { Pipe, PipeTransform } from '@angular/core';

export type DlnDateFormat = 'short' | 'medium' | 'long' | 'full' | 'shortDate' | 'mediumDate' | 'longDate' | 'shortTime' | 'mediumTime';

@Pipe({
  name: 'dlnDateFormat',
})
export class DlnDateFormatPipe implements PipeTransform {
  transform(
    value: Date | string | number | null | undefined,
    format: DlnDateFormat = 'mediumDate',
    locale: string = 'es',
  ): string {
    if (value === null || value === undefined || value === '') return '';

    const date = value instanceof Date ? value : new Date(value);
    if (isNaN(date.getTime())) return '';

    const options: Intl.DateTimeFormatOptions = this.getOptions(format);
    try {
      return new Intl.DateTimeFormat(locale, options).format(date);
    } catch {
      return date.toLocaleDateString(locale, options);
    }
  }

  private getOptions(format: DlnDateFormat): Intl.DateTimeFormatOptions {
    switch (format) {
      case 'short': return { dateStyle: 'short', timeStyle: 'short' };
      case 'medium': return { dateStyle: 'medium', timeStyle: 'short' };
      case 'long': return { dateStyle: 'long', timeStyle: 'short' };
      case 'full': return { dateStyle: 'full', timeStyle: 'short' };
      case 'shortDate': return { dateStyle: 'short' };
      case 'mediumDate': return { dateStyle: 'medium' };
      case 'longDate': return { dateStyle: 'long' };
      case 'shortTime': return { timeStyle: 'short' };
      case 'mediumTime': return { timeStyle: 'medium' };
      default: return { dateStyle: 'medium' };
    }
  }
}
