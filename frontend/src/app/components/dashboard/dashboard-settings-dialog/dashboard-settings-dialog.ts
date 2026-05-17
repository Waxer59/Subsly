import { Component, effect, signal } from '@angular/core';
import { BrnDialogImports } from '@spartan-ng/brain/dialog';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmDialogImports } from '@spartan-ng/helm/dialog';
import { LucideAngularModule } from 'lucide-angular';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { CURRENCIES } from '@constants';
import { UserSettingsService } from '@services/user-settings.service';
import { FormsModule } from '@angular/forms';
import { User, UserSettings } from '@types';
import { DashboardDeleteAccountDialog } from '../dashboard-delete-account-dialog/dashboard-delete-account-dialog';
import { UserAccountService } from '@/services/user-account.service';

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
    DashboardDeleteAccountDialog,
  ],
  templateUrl: './dashboard-settings-dialog.html',
})
export class DashboardSettingsDialog {
  isDialogOpen = signal(false);
  currencies = CURRENCIES;

  userSettings!: UserSettings;
  userAccount: User | null | undefined;

  constructor(
    readonly userSettingsService: UserSettingsService,
    readonly userAccountService: UserAccountService,
  ) {
    effect(() => {
      this.userSettings = userSettingsService.userSettings();
      this.userAccount = userAccountService.user;
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
