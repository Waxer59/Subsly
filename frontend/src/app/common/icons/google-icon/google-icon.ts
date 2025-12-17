import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-google-icon',
  imports: [],
  templateUrl: './google-icon.html',
})
export class GoogleIcon {
  @Input()
  class?: string;
}
