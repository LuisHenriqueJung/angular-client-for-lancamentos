import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  usuario: string | undefined
  senha: string | undefined

  constructor (private auth: AuthService){}

  login(usuario: string, senha : string){
    this.auth.login(usuario, senha).then()
  }

}
