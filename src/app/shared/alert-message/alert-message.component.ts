import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.scss'],
})
export class AlertMessageComponent {
  @Input() mensagem: string = '';
  showAlert: boolean = false;

  constructor() {}

  showBootstrapAlert() {
    this.showAlert = true;
  }

  hideBootstrapAlert() {
    this.showAlert = false;
  }
}
