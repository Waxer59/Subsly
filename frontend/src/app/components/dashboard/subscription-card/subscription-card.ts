import { Component } from '@angular/core';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmCard } from '@spartan-ng/helm/card';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-suscription-card',
  imports: [HlmCard, HlmButton, LucideAngularModule],
  templateUrl: './subscription-card.html',
})
export class SubscriptionCard {}
