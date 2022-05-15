import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { MyleasingService } from 'src/app/services/app.myleasing.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string;
  menuMode = 'static';
  showComponent: boolean;

  constructor(private primengConfig: PrimeNGConfig,
    public _myleasing: MyleasingService ) {
    this.title = 'MyleasingUI';
    this.primengConfig.ripple = true;
    this.showComponent = true;
    document.documentElement.style.fontSize = '14px';
    this._myleasing.showComponets(true);
    this._myleasing.showComponents$.subscribe(
      show => {
        this.showComponent = show;
    });
  }
}
