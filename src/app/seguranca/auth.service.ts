import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  jwtPayload: any
  oauthTokenUrl: string

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ){
    this.oauthTokenUrl = `${environment.apiUrl}/oauth/token`
    this.carregarToken()
  }

  login(usuario: string, senha: string): Promise<void> {
      const headers = new HttpHeaders()
        .append('Content-Type', 'application/x-www-form-urlencoded')
        .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

      const body = `username=${usuario}&password=${senha}&grant_type=password`;

      return this.http.post(this.oauthTokenUrl, body, { headers,})
        .toPromise()
        .then((response: any) => {
          this.armazenarToken(response.access_token)
        })
        .catch((response: any) => {
          if(response['status'] === 400){
            if(response.error.error === 'invalid_grant'){
              return Promise.reject('Usuário ou senha inválida!')
            }
          }
          return Promise.reject(response)
        });
    }

    private armazenarToken(token: string ){
      this.jwtPayload = this.jwtHelper.decodeToken(token)
      localStorage.setItem('token',token)
    }

    private carregarToken(){
      const token = localStorage.getItem('token')
      if(token)
        this.armazenarToken(token)
    }

    temPermissao(permissao: string ): Boolean{
      return this.jwtPayload && this.jwtPayload.authorities.includes(permissao)
    }
    temQualquerPermissao(roles: any){
      for(const role of roles){
        if(this.temPermissao(role)){
          return true;
        }
      }
      return false
    }
    obterNovoAccessToken() : Promise<void>{
      const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

      const body = 'grant-type=refresh_token'
      return this.http.post(this.oauthTokenUrl,body,{headers, withCredentials: true}).toPromise().then().catch((e)=>  {return e});

    }
    isAccessTokenInvalido(){
      const token = localStorage.getItem('token')
      return !token || this.jwtHelper.isTokenExpired(token)
    }
    limparToken(){
      this.http.delete('http://localhost:8080/tokens/revoke',).toPromise().then(()=>{})
      localStorage.removeItem('token')
      this.jwtPayload = null
    }
}
