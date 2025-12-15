import { Component, Input } from '@angular/core';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmCard } from '@spartan-ng/helm/card';
import { LucideAngularModule } from 'lucide-angular';
import { Subscription } from '../../../types';

@Component({
  selector: 'app-suscription-card',
  imports: [HlmCard, HlmButton, LucideAngularModule],
  templateUrl: './subscription-card.html',
})
export class SubscriptionCard {
  @Input({
    required: true,
  })
  subscription!: Subscription;
}
