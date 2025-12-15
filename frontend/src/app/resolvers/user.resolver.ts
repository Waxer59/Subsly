import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { UserAccountService } from '../services/user-account.service';

export const userResolver: ResolveFn<boolean> = () => {
  const userService = inject(UserAccountService);
  userService.loadUserAccount();
  return true;
};
