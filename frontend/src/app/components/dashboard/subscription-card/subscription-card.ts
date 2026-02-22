import { Component, Input, signal } from '@angular/core';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmCard } from '@spartan-ng/helm/card';
import { LucideAngularModule } from 'lucide-angular';
import { Currency, Subscription } from '@types';
import { UserSubscriptionsService } from '@/services/user-subscriptions.service';
import { toast } from 'ngx-sonner';
import { UserSettingsService } from '@/services/user-settings.service';
import { CURRENCY_SYMBOLS } from '@/constants';
import { SuscriptionDialog } from '../suscription-dialog/suscription-dialog';
import faviconFetch from 'favicon-fetch';

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

  isDialogOpen = signal<boolean>(false);
  faviconUrl!: Promise<string>;

  constructor(
    readonly userSubscriptionsService: UserSubscriptionsService,
    readonly userSettingsService: UserSettingsService,
  ) {}

  fetchSubscriptionIcon() {
    return faviconFetch({ uri: this.subscription.serviceUrl });
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

  get amountLabel() {
    let label;
    const amountPerMonth = +(this.subscription.amount / this.subscription.renewsEvery);

    if (this.userSettingsService.userSettings().currency === Currency.EUR) {
      label =
        amountPerMonth.toFixed(2) +
        CURRENCY_SYMBOLS[this.userSettingsService.userSettings().currency];
    } else {
      label =
        CURRENCY_SYMBOLS[this.userSettingsService.userSettings().currency] +
        amountPerMonth.toFixed(2);
    }

    return label;
  }

  get amountPerYearLabel() {
    let label;
    const amountPerMonth = +(this.subscription.amount / this.subscription.renewsEvery);

    if (this.userSettingsService.userSettings().currency === Currency.EUR) {
      label =
        (amountPerMonth * 12).toFixed(2) +
        CURRENCY_SYMBOLS[this.userSettingsService.userSettings().currency];
    } else {
      label =
        CURRENCY_SYMBOLS[this.userSettingsService.userSettings().currency] + amountPerMonth * 12;
    }

    return label;
  }
}
