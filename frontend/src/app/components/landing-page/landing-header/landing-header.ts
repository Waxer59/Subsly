import { Component } from '@angular/core';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { LandingHeaderPattern } from '../landing-header-pattern/landing-header-pattern';

@Component({
  selector: 'app-landing-header',
  imports: [HlmButtonImports, LandingHeaderPattern],
  templateUrl: './landing-header.html',
})
export class LandingHeader {}
