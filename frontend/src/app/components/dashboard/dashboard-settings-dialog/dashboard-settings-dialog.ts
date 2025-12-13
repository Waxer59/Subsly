import { Component, signal } from '@angular/core';
import { BrnDialogImports } from '@spartan-ng/brain/dialog';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmDialogImports } from '@spartan-ng/helm/dialog';
import { LucideAngularModule } from 'lucide-angular';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { CURRENCIES } from '../../common/constants';

@Component({
  selector: 'app-dashboard-settings-dialog',
  imports: [
    BrnDialogImports,
    HlmDialogImports,
    HlmButton,
    LucideAngularModule,
    BrnSelectImports,
    HlmSelectImports,
  ],
  templateUrl: './dashboard-settings-dialog.html',
})
export class DashboardSettingsDialog {
  isDialogOpen = signal(false);
  currencies = CURRENCIES;

  openDialog() {
    this.isDialogOpen.set(true);
  }

  closeDialog() {
    this.isDialogOpen.set(false);
  }
}
