import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HlmButton } from '@spartan-ng/helm/button';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-landing-body',
  imports: [HlmButton, LucideAngularModule, RouterLink],
  templateUrl: './landing-body.html',
})
export class LandingBody {}
