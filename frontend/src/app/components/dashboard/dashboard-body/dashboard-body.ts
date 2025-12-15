import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { AddSuscriptionDialog } from '../add-suscription-dialog/add-suscription-dialog';
import { SubscriptionCard } from '../subscription-card/subscription-card';
import { UserSubscriptionsService } from '../../../services/user-subscriptions.service';

@Component({
  selector: 'app-dashboard-body',
  imports: [LucideAngularModule, AddSuscriptionDialog, SubscriptionCard],
  templateUrl: './dashboard-body.html',
})
export class DashboardBody {
  constructor(readonly userSubscriptionsService: UserSubscriptionsService) {}
}
