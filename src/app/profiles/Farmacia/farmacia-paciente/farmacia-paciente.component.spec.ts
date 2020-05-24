import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmaciaPacienteComponent } from './farmacia-paciente.component';

describe('FarmaciaPacienteComponent', () => {
  let component: FarmaciaPacienteComponent;
  let fixture: ComponentFixture<FarmaciaPacienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FarmaciaPacienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmaciaPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
