import { FormControl } from '@angular/forms';

const EMAIL_REGEXP =
    /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

export function validateEmail(c: FormControl): {[key: string]: any} {
  return EMAIL_REGEXP.test(c.value) ? null : {
    validateEmail: true
  };
}
