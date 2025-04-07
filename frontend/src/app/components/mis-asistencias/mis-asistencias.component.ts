import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl, ValidationErrors, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-mis-asistencias',
  standalone: true,

  templateUrl: './mis-asistencias.component.html',
  imports: [MatFormFieldModule, FormsModule, ReactiveFormsModule, JsonPipe, MatButtonModule, MatInputModule, MatNativeDateModule, MatDatepickerModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./mis-asistencias.component.css'],
  providers: [provideNativeDateAdapter()],
})
export class MisAsistenciasComponent {
  private readonly _currentYear = new Date().getFullYear();
  readonly minDate = new Date(this._currentYear - 20, 0, 1);
  readonly maxDate = new Date();

  readonly range = new FormGroup({
    start: new FormControl<Date | null>(null, [Validators.required]),
    end: new FormControl<Date | null>(null, [Validators.required]),
  }, { validators: this.dateRangeValidator });

  private dateRangeValidator(control: AbstractControl): ValidationErrors | null {
    const group = control as FormGroup;
    const start = group.get('start')?.value;
    const end = group.get('end')?.value;

    if (start && end) {
      return start <= end ? null : { dateRange: true };
    }
    return null;
  }

  get isButtonDisabled() {
    return this.range.invalid || !this.range.value.start || !this.range.value.end;
  }
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };

}