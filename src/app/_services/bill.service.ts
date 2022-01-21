/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TokenStorageService} from './token-storage.service';
import { Bill } from '../_model/Bill';
import { BillBuilder } from '../_model/BillBuilder';

const API_URL = 'http://localhost:8080/e/api/v1/';


@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }

  getAll(type: string): Observable<Bill[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.tokenStorage.getToken()
      })
    };
    return this.http.get(API_URL + type, httpOptions) as Observable<Bill[]>;
  }

  saveBill(data: Bill, type: string): Observable<Bill[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.tokenStorage.getToken()
      })
    };
    return (this.http.post(API_URL + type, data, httpOptions) as Observable<Bill[]>);
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

  updateBill(data: Bill, type: string): Observable<Bill[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.tokenStorage.getToken()
      })
    };
    return this.http.put(API_URL + type, data, httpOptions) as Observable<Bill[]>;
  }

}
