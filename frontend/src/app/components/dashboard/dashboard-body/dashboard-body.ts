import { Component, signal } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { SubscriptionCard } from '../subscription-card/subscription-card';
import { SuscriptionDialog } from '../suscription-dialog/suscription-dialog';
import { UserSubscriptionsService } from '@services/user-subscriptions.service';
import { HlmButton } from '@spartan-ng/helm/button';
import { Subscription } from '@/types';
import { toast } from 'ngx-sonner';
import { HlmCard } from '@spartan-ng/helm/card';

@Component({
  selector: 'app-dashboard-body',
  imports: [LucideAngularModule, SuscriptionDialog, SubscriptionCard, HlmButton, HlmCard],
  templateUrl: './dashboard-body.html',
})
export class DashboardBody {
  isDialogOpen = signal(false);

  emptySubcription: Subscription = {
    id: '',
    name: '',
    amount: 0,
    renews: 1,
    serviceUrl: '',
  };

  constructor(readonly userSubscriptionsService: UserSubscriptionsService) {}

  openDialog() {
    this.isDialogOpen.set(true);
  }

  saveSubscription(subscription: Subscription) {
    this.userSubscriptionsService.addUserSubscription(subscription);
    toast.success('Subscription saved!');
  }
}
