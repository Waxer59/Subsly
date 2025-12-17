import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from '@/common/components/footer/footer';
import { HlmToasterImports } from '@spartan-ng/helm/sonner';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer, HlmToasterImports],
  templateUrl: './app.html',
})
export class App {}
