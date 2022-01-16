import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TokenStorageService} from './token-storage.service';

const API_URL = 'http://localhost:8080/e/api/v1/';


@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }

  getAll(type: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.tokenStorage.getToken()
      })
    };
    return this.http.get(API_URL + type, httpOptions);
  }

  saveBill(data: any, type: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.tokenStorage.getToken()
      })
    };
    return this.http.post(API_URL + type, data, httpOptions);
  }

  deleteBill(id: number, type: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.tokenStorage.getToken()
      })
    };
    return this.http.delete(API_URL + type + '/' + id, httpOptions);
  }

  updateBill(data: any, type: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.tokenStorage.getToken()
      })
    };
    return this.http.put(API_URL + type, data, httpOptions);
  }
}
