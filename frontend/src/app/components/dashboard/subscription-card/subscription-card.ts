import { Component, effect, Input, signal } from '@angular/core';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmCard } from '@spartan-ng/helm/card';
import { LucideAngularModule } from 'lucide-angular';
import { Currency, Subscription } from '@types';
import { UserSubscriptionsService } from '@/services/user-subscriptions.service';
import { toast } from 'ngx-sonner';
import { UserSettingsService } from '@/services/user-settings.service';
import { CURRENCY_SYMBOLS } from '@/constants';
import { SuscriptionDialog } from '../suscription-dialog/suscription-dialog';

@Component({
  selector: 'app-suscription-card',
  imports: [HlmCard, HlmButton, LucideAngularModule, SuscriptionDialog],
  templateUrl: './subscription-card.html',
})
export class SubscriptionCard {
  @Input({
    required: true,
  })
  subscription!: Subscription;

  amountLabel = signal<string>('');
  amountPerYearLabel = signal<string>('');
  isDialogOpen = signal<boolean>(false);

  constructor(
    readonly userSubscriptionsService: UserSubscriptionsService,
    readonly userSettingsService: UserSettingsService,
  ) {
    effect(() => {
      const amountPerMonth = +(this.subscription.amount / this.subscription.renews);

      if (this.userSettingsService.userSettings().currency === Currency.EUR) {
        this.amountLabel.set(
          amountPerMonth.toFixed(2) +
            CURRENCY_SYMBOLS[this.userSettingsService.userSettings().currency],
        );
        this.amountPerYearLabel.set(
          (amountPerMonth * 12).toFixed(2) +
            CURRENCY_SYMBOLS[this.userSettingsService.userSettings().currency],
        );
      } else {
        this.amountLabel.set(
          CURRENCY_SYMBOLS[this.userSettingsService.userSettings().currency] + amountPerMonth,
        );
        this.amountPerYearLabel.set(
          CURRENCY_SYMBOLS[this.userSettingsService.userSettings().currency] + amountPerMonth * 12,
        );
      }
    });
  }

  removeSubscription() {
    this.userSubscriptionsService.removeUserSubscription(this.subscription.id);
    toast.success('Subscription removed!');
  }

  editSubscription(subcription: Subscription) {
    this.userSubscriptionsService.editUserSubscription(subcription);
    toast.success('Subscription updated!');
  }

  openDialog() {
    this.isDialogOpen.set(true);
  }
}
