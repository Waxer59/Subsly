import { Component, signal } from '@angular/core';
import { BrnDialogImports } from '@spartan-ng/brain/dialog';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmDialogImports } from '@spartan-ng/helm/dialog';
import { LucideAngularModule } from 'lucide-angular';
import { HlmInputImports } from '@spartan-ng/helm/input';

@Component({
  selector: 'app-add-suscription-dialog',
  imports: [BrnDialogImports, HlmDialogImports, HlmButton, LucideAngularModule, HlmInputImports],
  templateUrl: './add-suscription-dialog.html',
})
export class AddSuscriptionDialog {
  isDialogOpen = signal(false);

  openDialog() {
    this.isDialogOpen.set(true);
  }

  closeDialog() {
    this.isDialogOpen.set(false);
  }
}
