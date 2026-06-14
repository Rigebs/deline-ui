import { InjectionToken, Signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

export interface DlnControl {
  focused: Signal<boolean>;
  disabled: Signal<boolean>;
  hasError: boolean;
  formControl: FormControl | null;
  id: string;
  stateChanges: Observable<void>;
}

export const DLN_CONTROL = new InjectionToken<DlnControl>('DLN_CONTROL');
