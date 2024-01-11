import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { SpotiToken } from '../interfaces/spotify.interfaces';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private clientId: string = '8d3ec9e12ff749fbbacd37e9a5b4ecd5';
  private clientSecret: string = '9a8c20b25a024aeaa80ce8b030887e2e';
  tokenUrl: string = "https://accounts.spotify.com/api/token";
  idAndSecret: string = btoa(this.clientId + ":" + this.clientSecret);
  private token: string = '';
  http: any;

constructor(private httpClient: HttpClient) { }

// body = {
//     'grant_type': "client_credentials",
// };
body = 'grant_type=client_credentials';

options = {
    headers: new HttpHeaders({
        'Authorization': 'Basic '.concat(this.idAndSecret),
        'Content-Type': 'application/x-www-form-urlencoded',
    })
};

  getAccessToken_(  ): string{
    const url = this.tokenUrl;
    this.httpClient.post<SpotiToken>(url,this.body, this.options)
      .pipe(
        map(response => response.access_token),
        catchError(()=> of(''))
      )
      .subscribe(token=> {this.token = token;});

      return this.token;
  }

  getAccessToken(  ): Observable<SpotiToken|null>{
    const url = this.tokenUrl;
    return this.httpClient.post<SpotiToken>(url,this.body, this.options)
      .pipe(
        catchError(()=> of(null))
      )
    }
}
