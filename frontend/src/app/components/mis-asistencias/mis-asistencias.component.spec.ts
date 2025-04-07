import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisAsistenciasComponent } from './mis-asistencias.component';

describe('MisAsistenciasComponent', () => {
  let component: MisAsistenciasComponent;
  let fixture: ComponentFixture<MisAsistenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MisAsistenciasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisAsistenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
