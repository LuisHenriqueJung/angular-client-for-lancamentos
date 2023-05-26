import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  usuario: string | undefined
  senha: string | undefined

  constructor
  (
    public auth: AuthService,
    private errorHandler: ErrorHandlerService,
    private router: Router
    ){}

  login(usuario: string, senha : string){
    this.auth.login(usuario, senha).then(()=>{
      this.router.navigate(['lancamentos'])
    }).catch((e)=>{this.errorHandler.handle(e)})
  }

}
