import { UserAccountService } from '@/services/user-account.service';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { filter, map, take } from 'rxjs';

export const dashboardRedirectGuard: CanActivateFn = () => {
  const userService = inject(UserAccountService);
  const router = inject(Router);

  userService.loadUserAccount();

  return userService.userAccount$.pipe(
    filter((user) => user !== undefined),
    take(1),
    map((user) => {
      if (user) {
        router.navigate(['dashboard']);
        return false;
      }
      return true;
    }),
  );
};
