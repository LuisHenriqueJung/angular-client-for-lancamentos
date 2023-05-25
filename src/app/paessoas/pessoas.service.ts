import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pessoa } from '../core/model';

@Injectable({
  providedIn: 'root'
})
export class PessoasService {
  pessoasUrl = 'http://localhost:8080/pessoas'
  constructor(private http: HttpClient) { }
  headers = new HttpHeaders().append('Authorization','Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODQ5NTQ5NDQsInVzZXJfbmFtZSI6ImFkbWluQGFsZ2Ftb25leS5jb20iLCJhdXRob3JpdGllcyI6WyJST0xFX0NBREFTVFJBUl9DQVRFR09SSUEiLCJST0xFX1BFU1FVSVNBUl9QRVNTT0EiLCJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUEVTUVVJU0FSX0xBTkNBTUVOVE8iLCJST0xFX1JFTU9WRVJfTEFOQ0FNRU5UTyIsIlJPTEVfQ0FEQVNUUkFSX1BFU1NPQSIsIlJPTEVfUEVTUVVJU0FSX0NBVEVHT1JJQSJdLCJqdGkiOiJ4MGtwOTF3VWdVT3N1WExobENxdGVOdlhEbWMiLCJjbGllbnRfaWQiOiJhbmd1bGFyIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl19.ptv64CsQezgrgnAuoFL8BvNqurM7xMh2Dil2gBSjMxk')


 pesquisar(filtro: PessoaFilter) : Promise<any>{
  let params = new HttpParams();
  if(filtro.nome)
    params = params.set('nome',filtro.nome)
  params = params.set('size',filtro.size)
  params = params.set('page',filtro.page)
  return this.http.get(this.pessoasUrl, {headers: this.headers, params}).toPromise().then((response: any )=>
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
  return this.http.get(`${this.pessoasUrl}/${codigo}`,{headers: this.headers}).toPromise().then((p)=> {return p})
}
 listarTodas() : Promise<any>{

  return this.http.get(this.pessoasUrl, {headers: this.headers, }).toPromise().then((response: any )=>
  {
    return response['content']
  })
 }

excluir(codigo: number): Promise<any>{
 return this.http.delete(`${this.pessoasUrl}/${codigo}`,{headers: this.headers}).toPromise().then(()=>null)
}

statusChange(pessoa: any): Promise<any>{
  console.log(pessoa.ativo)
  let ativo: boolean  = !pessoa.ativo
  this.headers.append('Content-Type', 'application/json')
  return this.http.put(`${this.pessoasUrl}/${pessoa.codigo}/ativo`,ativo,{ headers: this.headers}).toPromise().then()
}

cadastrarPessoa(pessoa: Pessoa): Promise<any> {
  this.headers.append('Content-Type','application/json')
  return this.http.post(`${this.pessoasUrl}`,pessoa,{headers: this.headers}).toPromise().then((response: any) => {return response});
}


}
export class PessoaFilter {
  nome?: any
  page = 0;
  size = 4
}
