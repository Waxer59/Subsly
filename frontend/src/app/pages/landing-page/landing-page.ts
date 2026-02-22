import { Component, OnInit } from '@angular/core';
import { LandingHeader } from '../../components/landing-page/landing-header/landing-header';
import { LandingBody } from '../../components/landing-page/landing-body/landing-body';
import { toast } from 'ngx-sonner';
import { Router } from '@angular/router';
import { Footer } from '@/common/components/footer/footer';

@Component({
  selector: 'app-landing-page',
  imports: [LandingHeader, LandingBody, Footer],
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
