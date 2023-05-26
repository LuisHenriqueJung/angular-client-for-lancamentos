import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/seguranca/auth.service';

@Component({
  selector: 'app-navbar-component',
  templateUrl: './navbar-component.component.html',
  styleUrls: ['./navbar-component.component.css']
})
export class NavbarComponentComponent implements OnInit {
  exibindoMenu = false;
  usuarioLogado: string = ''
constructor(private router: Router,private auth: AuthService){}


  ngOnInit(): void {
    this.usuarioLogado = this.auth.jwtPayload?.user_name
  }

  temPermissao(permissao: string):Boolean{
    return this.auth.temPermissao(permissao)
  }

  logout(){
    this.auth.limparToken()
    this.router.navigate(['login'])

  }
}
