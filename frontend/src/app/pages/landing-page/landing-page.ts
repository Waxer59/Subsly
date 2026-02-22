import { Component, OnInit } from '@angular/core';
import { LandingHeader } from '../../components/landing-page/landing-header/landing-header';
import { LandingBody } from '../../components/landing-page/landing-body/landing-body';
import { toast } from 'ngx-sonner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  imports: [LandingHeader, LandingBody],
  templateUrl: './landing-page.html',
})
export class LandingPage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    const url = this.router.url;
    if (url.includes('auth_error=true')) {
      toast.error('Authentication error');
    }
  }
}
