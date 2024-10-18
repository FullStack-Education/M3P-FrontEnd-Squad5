import { TestBed } from '@angular/core/testing';

import { PaginaLoginService } from './pagina-login.service';

describe('PaginaLoginService', () => {
  let service: PaginaLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaginaLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
