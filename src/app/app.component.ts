import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { MyleasingService } from './services/myleasing.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string;
  menuMode = 'static';

  constructor(private primengConfig: PrimeNGConfig,
    public _myleasing: MyleasingService ) {
    this.title = 'MyleasingUI';
    this.primengConfig.ripple = true;
    document.documentElement.style.fontSize = '14px';
  }
}
