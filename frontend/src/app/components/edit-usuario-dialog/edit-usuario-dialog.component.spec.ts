import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUsuarioDialogComponent } from './edit-usuario-dialog.component';

describe('EditUsuarioDialogComponent', () => {
  let component: EditUsuarioDialogComponent;
  let fixture: ComponentFixture<EditUsuarioDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditUsuarioDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditUsuarioDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
