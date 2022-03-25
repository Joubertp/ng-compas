import { TestBed } from '@angular/core/testing';

import { AgentContexteService } from './agent-contexte.service';

describe('AgentContexteService', () => {
  let service: AgentContexteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgentContexteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
