import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pessoa } from '../core/model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PessoasService {
  pessoasUrl : string
  constructor(private http: HttpClient) {
    this.pessoasUrl = `${environment.apiUrl}/pessoas`
   }

 pesquisar(filtro: PessoaFilter) : Promise<any>{
  let params = new HttpParams();
  if(filtro.nome)
    params = params.set('nome',filtro.nome)
  params = params.set('size',filtro.size)
  params = params.set('page',filtro.page)
  return this.http.get(this.pessoasUrl,{params} ).toPromise().then((response: any )=>
  {
    const pessoas = response.content
    const totalRegistros = response.totalElements
    const  resposta = {
        pessoas,
        totalRegistros
    }
  return resposta
})
 }
 getPessoaById(codigo: number) : Promise<any>
{
  return this.http.get(`${this.pessoasUrl}/${codigo}`).toPromise().then((p)=> {return p})
}
 listarTodas() : Promise<any>{

  return this.http.get(this.pessoasUrl, ).toPromise().then((response: any )=>
  {
    return response['content']
  })
 }

excluir(codigo: number): Promise<any>{
 return this.http.delete(`${this.pessoasUrl}/${codigo}`,).toPromise().then(()=>null)
}

statusChange(pessoa: any): Promise<any>{
  console.log(pessoa.ativo)
  let ativo: boolean  = !pessoa.ativo
  return this.http.put(`${this.pessoasUrl}/${pessoa.codigo}/ativo`,ativo,).toPromise().then()
}

cadastrarPessoa(pessoa: Pessoa): Promise<any> {
  return this.http.post(`${this.pessoasUrl}`,pessoa,).toPromise().then((response: any) => {return response});
}
atualizar(pessoa: Pessoa): Promise<Pessoa> {
  return this.http.put<Pessoa>(`${this.pessoasUrl}/${pessoa.codigo}`, pessoa).toPromise().then((response : any) => {return response});
}


}
export class PessoaFilter {
  nome?: any
  page = 0;
  size = 4
}
