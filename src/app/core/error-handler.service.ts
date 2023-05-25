import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private messageService: MessageService) {}

handle(errorResponser : any ){
  let msg : string;
if(typeof errorResponser ==='string'){
  msg = errorResponser
}else if (errorResponser instanceof HttpErrorResponse && errorResponser.status >= 400 && errorResponser.status <= 499) {

    try{
      msg = errorResponser.error[0].mensagemUsuario
    }catch (e){

    }
}else {
  msg = 'Erro ao acessar serviço remoto. Tente novamente!'
  console.log('Ocorreu um erro', errorResponser)
}
this.messageService.add({ severity: 'error', summary: 'Erro ', detail: msg!});

}

}
