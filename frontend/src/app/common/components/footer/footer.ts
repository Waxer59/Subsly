import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  imports: [LucideAngularModule, CommonModule],
  templateUrl: './footer.html',
})
export class Footer {}
