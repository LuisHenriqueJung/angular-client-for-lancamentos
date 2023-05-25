import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Lancamento } from '../core/model';

export class LancamentoFiltro {
  descricao?: string;
  dataVencimentoDe?: Date
  dataVencimentoAte?: Date
  page = 0;
  size = 7;
}

@Injectable({
  providedIn: 'root'
})
export class LancamentosService {


  lancamentosUrl = 'http://localhost:8080/lancamentos';

  constructor(private http: HttpClient,private datepipe: DatePipe) { }

   headers = new HttpHeaders().append('Authorization','Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODQ5NTQ5NDQsInVzZXJfbmFtZSI6ImFkbWluQGFsZ2Ftb25leS5jb20iLCJhdXRob3JpdGllcyI6WyJST0xFX0NBREFTVFJBUl9DQVRFR09SSUEiLCJST0xFX1BFU1FVSVNBUl9QRVNTT0EiLCJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUEVTUVVJU0FSX0xBTkNBTUVOVE8iLCJST0xFX1JFTU9WRVJfTEFOQ0FNRU5UTyIsIlJPTEVfQ0FEQVNUUkFSX1BFU1NPQSIsIlJPTEVfUEVTUVVJU0FSX0NBVEVHT1JJQSJdLCJqdGkiOiJ4MGtwOTF3VWdVT3N1WExobENxdGVOdlhEbWMiLCJjbGllbnRfaWQiOiJhbmd1bGFyIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl19.ptv64CsQezgrgnAuoFL8BvNqurM7xMh2Dil2gBSjMxk')

  consultar (filtro: LancamentoFiltro) : Promise<any> {
    let params = new HttpParams();


    if(filtro.descricao)
      params = params.set('descricao',filtro.descricao)

    if(filtro.dataVencimentoDe)
      params = params.set('dataVencimentoDe',this.datepipe.transform(filtro.dataVencimentoDe, 'yyyy-MM-dd')!);


    if(filtro.dataVencimentoAte)
      params = params.set('dataVencimentoAte',this.datepipe.transform(filtro.dataVencimentoAte, 'yyyy-MM-dd')!);
    params = params.set('size',filtro.size)
    params = params.set('page',filtro.page)

    return this.http.get(`${this.lancamentosUrl}`, { headers : this.headers,params }).
      toPromise()
      .then((response: any)=> {

        const lancamentos = response.content
        console.log(response)
        const resultado = {
          lancamentos,
          total: response.totalElements
        }
        return resultado
    });
  }

  getLancamneto(codigo:number) : Promise<any> {
    return this.http.get(`${this.lancamentosUrl}/${codigo}`,{headers: this.headers}).toPromise().then((response: any) => {

      return response})
  }

  excluir( codigo: number): Promise<null> {

    return this.http.delete(`${this.lancamentosUrl}/${codigo}`, {headers: this.headers}).toPromise().then(() => null);
  }
  cadastrar( lancamento: Lancamento): Promise<Lancamento>{
    this.headers.append('Content-Type', 'application/json');
    return this.http.post(`${this.lancamentosUrl}`, lancamento,{headers: this.headers}).toPromise().then((response: any) => {return response});
  }
  atualizar( lancamento: Lancamento):Promise<any>{
    this.headers.append('Content-Type', 'application/json');
    return this.http.put(`${this.lancamentosUrl}/${lancamento.codigo}`,lancamento,{headers: this.headers}).toPromise().then((r)=> {return r})
  }
}
