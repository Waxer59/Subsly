import { Component, signal } from '@angular/core';
import { BrnDialogImports } from '@spartan-ng/brain/dialog';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmDialogImports } from '@spartan-ng/helm/dialog';
import { GoogleIcon } from '../../common/icons/google-icon/google-icon';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-dasboard-login-dialog',
  imports: [BrnDialogImports, HlmDialogImports, HlmButton, GoogleIcon, LucideAngularModule],
  templateUrl: './dasboard-login-dialog.html',
})
export class DasboardLoginDialog {
  isDialogOpen = signal(false);

  openDialog() {
    this.isDialogOpen.set(true);
  }

  closeDialog() {
    this.isDialogOpen.set(false);
  }
}
