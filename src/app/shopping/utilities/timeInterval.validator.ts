import { ValidatorFn, AbstractControl } from '@angular/forms';

export function timeIntervalValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const timeInSeconds = control.value % 1000;
    return timeInSeconds ? { invalidInterval: { value: control.value } } : null;
  };
}
