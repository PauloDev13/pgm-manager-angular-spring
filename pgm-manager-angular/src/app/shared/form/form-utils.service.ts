import { Injectable } from '@angular/core';
import {
  AbstractControl,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormUtilsService {
  validateAllFormFields(formGroup: UntypedFormGroup): void {
    Object.keys(formGroup.controls).forEach(field => {
      const control: AbstractControl<unknown> | null = formGroup.get(field);
      control?.markAsTouched({ onlySelf: true });

      if (control instanceof UntypedFormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  getErrorMessage(
    formGroup: UntypedFormGroup,
    formGroupName: string,
    fieldName: string,
  ): string {
    const group = formGroup.get(formGroupName);
    const field: UntypedFormControl = group?.get(
      fieldName,
    ) as UntypedFormControl;

    return this.getErrorMessageFormField(field);
  }

  private getErrorMessageFormField(field: UntypedFormControl): string {
    if (field.hasError('required')) {
      return 'Campo obrigatório.';
    }

    if (field.hasError('minlength')) {
      const requiredLength: number = field.errors
        ? field.errors['minlength']['requiredLength']
        : 5;
      return `Campo deve ter no mínimo ${requiredLength} caracteres.`;
    }

    if (field.hasError('maxlength')) {
      const requiredLength: number = field.errors
        ? field.errors['maxlength']['requiredLength']
        : 100;
      return `Campo deve ter no máximo ${requiredLength} caracteres.`;
    }

    if (field.hasError('isCpfExists')) {
      return 'CPF já cadastrado';
    }

    return 'Campo inválido.';
  }
}
