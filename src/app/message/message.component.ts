import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-message',
  template: `
   <span *ngIf="temErro()" class="p-message p-message-error" >{{this.message}}</span>
  `,
  styles: [`
    .p-message-error {
      padding: 3px;

      border-radius: 5px;
    }

  `
  ]
})
export class MessageComponent {
  @Input()
  control?: FormControl;
  @Input()
  error: string ='';

  @Input()
  message: string ='';

  temErro(): boolean{
    return this.control!.hasError(this.error) && this.control!.dirty;
  }
}
