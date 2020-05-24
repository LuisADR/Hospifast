import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretarioAgendaComponent } from './secretario-agenda.component';

describe('SecretarioAgendaComponent', () => {
  let component: SecretarioAgendaComponent;
  let fixture: ComponentFixture<SecretarioAgendaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecretarioAgendaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecretarioAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
