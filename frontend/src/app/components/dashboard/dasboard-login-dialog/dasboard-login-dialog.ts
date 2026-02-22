import { Component, signal } from '@angular/core';
import { BrnDialogImports } from '@spartan-ng/brain/dialog';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmDialogImports } from '@spartan-ng/helm/dialog';
import { GoogleIcon } from '@common/icons/google-icon/google-icon';
import { LucideAngularModule } from 'lucide-angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dasboard-login-dialog',
  imports: [BrnDialogImports, HlmDialogImports, HlmButton, GoogleIcon, LucideAngularModule],
  templateUrl: './dasboard-login-dialog.html',
})
export class DasboardLoginDialog {
  isDialogOpen = signal(false);

  googleLoginUrl = `${environment.apiUrl}/auth/login/google`;
  githubLoginUrl = `${environment.apiUrl}/auth/login/github`;

  openDialog() {
    this.isDialogOpen.set(true);
  }

  closeDialog() {
    this.isDialogOpen.set(false);
  }
}
