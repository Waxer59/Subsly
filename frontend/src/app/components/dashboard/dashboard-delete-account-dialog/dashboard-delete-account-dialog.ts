import { UserAccountService } from '@/services/user-account.service';
import { DeleteAccountResponse, DeleteAccountState } from '@/types';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '@environments/environment';
import { BrnDialogImports } from '@spartan-ng/brain/dialog';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmDialogImports } from '@spartan-ng/helm/dialog';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { LucideAngularModule } from 'lucide-angular';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-dashboard-delete-account-dialog',
  imports: [
    BrnDialogImports,
    HlmDialogImports,
    HlmButton,
    LucideAngularModule,
    HlmInputImports,
    FormsModule,
  ],
  templateUrl: './dashboard-delete-account-dialog.html',
})
export class DashboardDeleteAccountDialog {
  constructor(readonly userAccountService: UserAccountService) {}

  isDialogOpen = signal(false);

  otp = signal('');

  openDialog() {
    this.isDialogOpen.set(true);
    this.sendDeleteAccountRequest();
  }

  closeDialog() {
    this.isDialogOpen.set(false);
  }

  async sendDeleteAccountRequest() {
    const otpValue = this.otp();

    try {
      const resp = await fetch(`${environment.apiUrl}/users`, {
        credentials: 'include',
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ otp: otpValue ? otpValue : undefined }),
      });

      const data: DeleteAccountResponse = await resp.json();

      if (data.state === DeleteAccountState.SUCCESS && otpValue) {
        toast.success('Account deleted successfully');
        this.userAccountService.logout();
        this.closeDialog();
      } else if (data.state === DeleteAccountState.FAILURE && otpValue) {
        toast.error('Invalid OTP');
      } else if (data.state === DeleteAccountState.SEND_OTP) {
        toast.info('Please check your email for the OTP');
      } else {
        toast.error('Something went wrong');
      }
    } catch (error) {
      console.log(error);
    }
    this.otp.set('');
  }
}
