import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainServiceService {
  private databaseName = "e-gov-business";
  constructor(private http: HttpClient) { }
  private url = "https://e-govs.com"
  authenticate(): Observable<any> {
    return this.http.post<any>(this.url+"/web/session/authenticate", {
      params: {
        login: 'admin',
        password: '1234',
        db: this.databaseName
      }
    }, { withCredentials: true });
  }
  get_data(data: string): Observable<any> {
    const payload = {
      params: {
        db: this.databaseName,
        length: 100,
        offset: 0,
        requireTotalCount: false
      }
    };
    if (data === "get_invoice") {
      return this.http.post<any>(this.url+"/api/get_invoice", payload,{ withCredentials: true });
    }
    else if (data === "get_customer") {
      return this.http.post<any>(this.url+"/api/get_customer", payload,{ withCredentials: true });
    }
    return new Observable<any>();
  }
  get_data_print(id: number): Observable<any> {
    const payload = {
      params: {
        db: this.databaseName,
        id: id,
        length: 100,
        offset: 0,
        requireTotalCount: false
      }
    };
    return this.http.post<any>(this.url+"/api/get_invoice_print", payload,{ withCredentials: true });
  }

}
