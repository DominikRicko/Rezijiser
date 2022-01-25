/* eslint-disable @typescript-eslint/naming-convention */
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TokenStorageService} from './token-storage.service';
import {Notification} from '../_model/notification';

const API_URL = 'http://localhost:8080/e/api/v1/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
  }

  getAll(): Observable<Notification[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.tokenStorage.getToken()
      })
    };
    return this.http.get(API_URL, httpOptions) as Observable<Notification[]>;
  }

  checkNotification(id: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.tokenStorage.getToken()
      })
    };
    return this.http.get(API_URL + '/check/' + id, httpOptions) as Observable<Notification>;
  }

  unCheckNotification(id: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.tokenStorage.getToken()
      })
    };
    return this.http.get(API_URL + '/uncheck/' + id, httpOptions) as Observable<Notification>;
  }
}
