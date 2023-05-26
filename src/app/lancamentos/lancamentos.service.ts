import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Lancamento } from '../core/model';
import { environment } from 'src/environments/environment';

export class LancamentoFiltro {
  descricao?: string;
  dataVencimentoDe?: Date
  dataVencimentoAte?: Date
  page = 0;
  size = 15;
}

@Injectable({
  providedIn: 'root'
})
export class LancamentosService {


  lancamentosUrl : string

  constructor(private http: HttpClient,private datepipe: DatePipe) {
    this.lancamentosUrl = `${environment.apiUrl}/lancamentos`
   }

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

    return this.http.get(`${this.lancamentosUrl}`,{params}).
      toPromise()
      .then((response: any)=> {

        const lancamentos = response.content
        const resultado = {
          lancamentos,
          total: response.totalElements
        }
        return resultado
    });
  }

  getLancamneto(codigo:number) : Promise<any> {
    return this.http.get(`${this.lancamentosUrl}/${codigo}`).toPromise().then((response: any) => {

      return response})
  }

  excluir( codigo: number): Promise<null> {

    return this.http.delete(`${this.lancamentosUrl}/${codigo}`).toPromise().then(() => null);
  }
  cadastrar( lancamento: Lancamento): Promise<Lancamento>{
    return this.http.post(`${this.lancamentosUrl}`, lancamento).toPromise().then((response: any) => {return response});
  }
  atualizar( lancamento: Lancamento):Promise<any>{
    return this.http.put(`${this.lancamentosUrl}/${lancamento.codigo}`,lancamento).toPromise().then((r)=> {return r})
  }
}
