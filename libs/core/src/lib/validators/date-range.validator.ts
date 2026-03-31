import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Validador de grupo que verifica que la fecha "desde" no sea posterior a la fecha "hasta".
 * Se aplica al FormGroup que contiene ambos controles.
 *
 * @param fromControl Nombre del control de fecha inicio
 * @param toControl Nombre del control de fecha fin
 */
export function dateRangeValidator(fromControl: string, toControl: string): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const from = group.get(fromControl)?.value;
    const to = group.get(toControl)?.value;

    if (!from || !to) return null;

    const fromDate = from instanceof Date ? from : new Date(from);
    const toDate = to instanceof Date ? to : new Date(to);

    if (fromDate > toDate) {
      return { dateRange: true };
    }

    return null;
  };
}
