import { Footer } from '@/common/components/footer/footer';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HlmButton } from '@spartan-ng/helm/button';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink, HlmButton, LucideAngularModule, Footer],
  templateUrl: './not-found.html',
})
export class NotFound {}
