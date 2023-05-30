import { DatePipe } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RelatoriosService {

  constructor(
    private http: HttpClient,
    private datePipe: DatePipe
    ) {
    this.url = `${environment.apiUrl}/lancamentos`
  }

  url?:string

  gerarRelatoriosLancamentos( dataInicio: Date, dataFim: Date ): Promise<any>{
    let params = new HttpParams()
   params =  params.set('inicio', this.datePipe.transform(dataInicio, 'yyyy-MM-dd')!)
   params = params.set('fim', this.datePipe.transform(dataFim, 'yyyy-MM-dd')!)
    return this.http.get(`${this.url}/relatorios/por-pessoa`,{params, responseType: 'blob'}).toPromise().then(
      (response : any) =>
      {
        return response
      }
    );
  }

}
