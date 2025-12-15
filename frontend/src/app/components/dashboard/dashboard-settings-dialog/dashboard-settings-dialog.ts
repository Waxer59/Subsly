import { Component, effect, signal } from '@angular/core';
import { BrnDialogImports } from '@spartan-ng/brain/dialog';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmDialogImports } from '@spartan-ng/helm/dialog';
import { LucideAngularModule } from 'lucide-angular';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { CURRENCIES } from '../../../constants';
import { UserSettingsService } from '../../../services/user-settings.service';
import { FormsModule } from '@angular/forms';
import { UserSettings } from '../../../types';

@Component({
  selector: 'app-dashboard-settings-dialog',
  imports: [
    BrnDialogImports,
    HlmDialogImports,
    HlmButton,
    LucideAngularModule,
    BrnSelectImports,
    HlmSelectImports,
    FormsModule,
  ],
  templateUrl: './dashboard-settings-dialog.html',
})
export class DashboardSettingsDialog {
  isDialogOpen = signal(false);
  currencies = CURRENCIES;

  userSettings!: UserSettings;

  constructor(readonly userSettingsService: UserSettingsService) {
    effect(() => {
      this.userSettings = userSettingsService.userSettings();
    });
  }

  openDialog() {
    this.isDialogOpen.set(true);
  }

  closeDialog() {
    this.isDialogOpen.set(false);
  }

  saveChanges() {
    this.userSettingsService.editUserSettings(this.userSettings);
    this.closeDialog();
  }
}
