import { Component } from '@angular/core';
import { LandingHeader } from '../../components/landing-page/landing-header/landing-header';
import { LandingBody } from '../../components/landing-page/landing-body/landing-body';

@Component({
  selector: 'app-landing-page',
  imports: [LandingHeader, LandingBody],
  templateUrl: './landing-page.html',
})
export class LandingPage {}
