import { Component, OnInit, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HlmToasterImports } from '@spartan-ng/helm/sonner';
import { ScriptService } from './services/script.service';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HlmToasterImports],
  templateUrl: './app.html',
})
export class App implements OnInit {
  constructor(
    private renderer: Renderer2,
    private scriptService: ScriptService,
  ) {}

  ngOnInit(): void {
    if (environment.production) {
      const script = this.scriptService.loadJsScript(
        this.renderer,
        'https://analytics.hgo.one/script.js',
        {
          defer: true,
        },
      );

      script.setAttribute('data-website-id', '23416a7e-b27b-4a71-9474-b75b4f493660');
    }
  }
}
