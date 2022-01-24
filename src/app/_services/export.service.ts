/* eslint-disable @typescript-eslint/naming-convention */
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {TokenStorageService} from './token-storage.service';
import {Observable} from 'rxjs';

const API_URL = 'http://localhost:8080/e/api/v1/export';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
  }

  getExport(request: { startingDate: string; endingDate: string; exportType: string }): Observable<HttpResponse<Blob>> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.tokenStorage.getToken(),
      }),
      observe: 'response' as 'response',
      responseType: 'blob' as 'blob' //typescript being annoying.
    };

    return this.http.post(API_URL, request, httpOptions);
  }

}
