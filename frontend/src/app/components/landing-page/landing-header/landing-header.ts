import { Component } from '@angular/core';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { LandingHeaderPattern } from '../landing-header-pattern/landing-header-pattern';
import { LucideAngularModule } from 'lucide-angular';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing-header',
  imports: [HlmButtonImports, LandingHeaderPattern, LucideAngularModule, RouterLink],
  templateUrl: './landing-header.html',
})
export class LandingHeader {}
