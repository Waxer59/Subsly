import { Component, OnInit, signal } from '@angular/core';
import { BrnDialogImports } from '@spartan-ng/brain/dialog';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmDialogImports } from '@spartan-ng/helm/dialog';
import { GoogleIcon } from '@common/icons/google-icon/google-icon';
import { LucideAngularModule } from 'lucide-angular';
import { UserAccountService } from '@/services/user-account.service';
import { HlmAvatarImports } from '@spartan-ng/helm/avatar';
import { environment } from '@environments/environment';
import { HlmDropdownMenuImports } from '@spartan-ng/helm/dropdown-menu';
import { getUsernameInitials } from '@/common/utils/getUsernameInitials';
import { User } from '@/types';

@Component({
  selector: 'app-dasboard-login-dialog',
  imports: [
    BrnDialogImports,
    HlmDialogImports,
    HlmButtonImports,
    GoogleIcon,
    LucideAngularModule,
    HlmAvatarImports,
    HlmDropdownMenuImports,
  ],
  templateUrl: './dasboard-login-dialog.html',
})
export class DasboardLoginDialog implements OnInit {
  isDialogOpen = signal(false);

  googleLoginUrl = `${environment.apiUrl}/auth/login/google`;
  githubLoginUrl = `${environment.apiUrl}/auth/login/github`;

  user = signal<User | null | undefined>(undefined);
  userInitials = signal('');

  constructor(readonly userAccountService: UserAccountService) {}

  ngOnInit(): void {
    this.userAccountService.userAccount$.subscribe((u) => {
      this.user.set(u);
      if (u) {
        this.userInitials.set(getUsernameInitials(u.username));
      }
    });
  }

  openDialog() {
    this.isDialogOpen.set(true);
  }

  closeDialog() {
    this.isDialogOpen.set(false);
  }

  logout() {
    this.userAccountService.logout();
  }
}
