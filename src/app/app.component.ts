import { Component } from '@angular/core';
import { MyleasingService } from './services/myleasing.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string;

  constructor(public _myleasing: MyleasingService ) {
    this.title = 'MyleasingUI';
  }
}
