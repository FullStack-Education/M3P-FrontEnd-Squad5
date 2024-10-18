import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDocenteComponent } from './card-docente.component';

describe('CardDocenteComponent', () => {
  let component: CardDocenteComponent;
  let fixture: ComponentFixture<CardDocenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardDocenteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
