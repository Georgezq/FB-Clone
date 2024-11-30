import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { yetAuthGuard } from './yet-auth.guard';

describe('yetAuthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => yetAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
