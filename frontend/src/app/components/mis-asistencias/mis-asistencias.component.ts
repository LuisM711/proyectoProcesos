import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl, ValidationErrors, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { AppService } from '../../app.service';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-mis-asistencias',
  standalone: true,
  templateUrl: './mis-asistencias.component.html',
  imports: [
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatCardModule,
    MatProgressBarModule,
    MatDividerModule,
    MatListModule,
    MatIconModule,
    MatExpansionModule,
    MatProgressSpinnerModule

  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./mis-asistencias.component.css'],
  providers: [provideNativeDateAdapter()],
})
export class MisAsistenciasComponent {
  private readonly _currentYear = new Date().getFullYear();
  readonly minDate = new Date(this._currentYear - 20, 0, 1);
  readonly maxDate = new Date();
  isLoading = false;
  reporte: any = null;
  error: string | null = null;

  constructor(private appService: AppService, private cd: ChangeDetectorRef) { }
  // private appService = inject(AppService);

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

  consultarAsistencias() {
    if (this.range.invalid) return;

    this.isLoading = true;
    this.error = null;
    this.reporte = null;
    this.cd.markForCheck();

    const startDate = this.formatDate(this.range.value.start!);
    const endDate = this.formatDate(this.range.value.end!);

    this.appService.getMisAsistencias(startDate, endDate).subscribe({
      next: (data) => {
        if (data.resumen) {
          this.reporte = data;
          this.isLoading = false;
          this.cd.markForCheck();
        }
        else {
          this.error = 'No se encontraron asistencias en el rango de fechas seleccionado';
          this.isLoading = false;
          this.cd.markForCheck();
        }

      },
      error: (err) => {
        this.error = 'Error al cargar las asistencias';
        this.isLoading = false;
        this.cd.markForCheck();
        console.error(err);
      }
    });
  }

  private formatDate(date: Date): string {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  }

  getColorForPercentage(percentage: string): string {
    const value = parseInt(percentage);
    if (value >= 90) return 'primary';
    if (value >= 75) return 'accent';
    return 'warn';
  }
}