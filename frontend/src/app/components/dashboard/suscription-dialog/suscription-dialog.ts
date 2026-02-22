import { Component, effect, Input, input, output, signal } from '@angular/core';
import { BrnDialogImports } from '@spartan-ng/brain/dialog';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmDialogImports } from '@spartan-ng/helm/dialog';
import { LucideAngularModule } from 'lucide-angular';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { FormsModule, NgForm } from '@angular/forms';
import { z } from 'zod';
import { Subscription } from '@types';
import { toast } from 'ngx-sonner';

const subcriptionSchema = z.object({
  name: z.string().min(1),
  amount: z.number().min(0),
  renewsEvery: z.number().min(1).max(12),
  serviceUrl: z.url(),
});

@Component({
  selector: 'app-suscription-dialog',
  imports: [
    BrnDialogImports,
    HlmDialogImports,
    HlmButton,
    LucideAngularModule,
    HlmInputImports,
    FormsModule,
  ],
  templateUrl: './suscription-dialog.html',
})
export class SuscriptionDialog {
  isDialogOpen = input<boolean>(false);
  _isDialogOpen = signal(false);
  dialogOpen = output<boolean>();
  saveSubscription = output<Subscription>();
  isEditing = input<boolean>(false);

  @Input()
  subscription: Subscription = {
    id: '',
    name: '',
    amount: 0,
    renewsEvery: 1,
    serviceUrl: '',
  };

  constructor() {
    effect(() => {
      this._isDialogOpen.set(this.isDialogOpen());
    });
  }

  openDialog() {
    this._isDialogOpen.set(true);
    this.dialogOpen.emit(true);
  }

  closeDialog() {
    this._isDialogOpen.set(false);
    this.dialogOpen.emit(false);
  }

  saveChanges(form: NgForm) {
    const { error } = subcriptionSchema.safeParse(this.subscription);

    if (error) {
      toast.error('Invalid subcription data');
      return;
    }

    this.saveSubscription.emit({ ...this.subscription, ...form.value });
    this.closeDialog();
  }
}
