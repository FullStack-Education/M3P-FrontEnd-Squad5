import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotasAlunosComponent } from './notas-alunos.component';

describe('NotasAlunosComponent', () => {
  let component: NotasAlunosComponent;
  let fixture: ComponentFixture<NotasAlunosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotasAlunosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotasAlunosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
