import { TestBed } from '@angular/core/testing';

import { AgentsContexteService } from './agents-contexte.service';

describe('AgentsContexteService', () => {
  let service: AgentsContexteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgentsContexteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
