import { TestBed } from '@angular/core/testing';

import { CursosExtraService } from './cursos-extra.service';

describe('CursosExtraService', () => {
  let service: CursosExtraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CursosExtraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
