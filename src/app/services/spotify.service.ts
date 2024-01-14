import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, switchMap, tap } from 'rxjs';
import { SpotiToken, SpotiResult as releasesResult } from '../interfaces/spotify.interfaces';
import { SpotiResult as artistResult } from '../interfaces/artist.interface';
import { SpotiResult as albumResult } from '../interfaces/albums.interface';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private clientId: string = '8d3ec9e12ff749fbbacd37e9a5b4ecd5';
  private clientSecret: string = '9a8c20b25a024aeaa80ce8b030887e2e';
  tokenUrl: string = "https://accounts.spotify.com/api/token";
  requestsUrl: string = "https://api.spotify.com/v1";
  idAndSecret: string = btoa(this.clientId + ":" + this.clientSecret);
  private token: string = '';
  private ultimoToken: Date = new Date();

  http: any;

  constructor(private httpClient: HttpClient) { }

  body = 'grant_type=client_credentials';

  options = {
    headers: new HttpHeaders({
      'Authorization': 'Basic '.concat(this.idAndSecret),
      'Content-Type': 'application/x-www-form-urlencoded',
    })
  };

  //------------------------------------------------------------------------------------------------------------------------------------------------------------
  //                                                                     Servicios de token
  //------------------------------------------------------------------------------------------------------------------------------------------------------------

  getAccessToService(): Observable<string> {
    console.log(`En token var hay:${this.token}...`);
    if (this.token === '' || this.hasTokenExpired()) {
      console.log("Creando nuevo token para usar en servicios...");
      return this.getAccessToken_().pipe(
        tap(token => console.log(`Nuevo token creado: ${token}`))
      );
    } else {
      console.log("Ya hay un token activo para servicios: " + this.token + '.');
      return of(this.token);
    }
  }

  hasTokenExpired(): boolean {
    const fechaActual: Date = new Date();
    const fechaUltimoToken: Date = this.ultimoToken;
    const diferenciaSegundos: number = (fechaActual.getTime() - fechaUltimoToken.getTime()) / 1000;

    console.log(`La diferencia es de ${diferenciaSegundos}`);

    return diferenciaSegundos > 3500;
  }

  getAccessToken_(): Observable<string> {
    const url = this.tokenUrl;
    return this.httpClient.post<SpotiToken>(url, this.body, this.options)
      .pipe(
        map(response => response.access_token),
        catchError(error => {
          console.error('Error al obtener el token:', error);
          throw error; // Lanza el error para que los consumidores puedan manejarlo
        }),
        tap(newToken => {
          this.token = newToken;
          this.ultimoToken = new Date();
        })
      );
  }



  //------------------------------------------------------------------------------------------------------------------------------------------------------------
  //                                                                     Servicios de datos
  //------------------------------------------------------------------------------------------------------------------------------------------------------------

  getReleases(): Observable<releasesResult> {
    return this.getAccessToService().pipe(
      switchMap(token => {
        const httpOptions = {
          headers: new HttpHeaders({
            'Authorization': `Bearer ${token}`,
          })
        };

        const url = `${this.requestsUrl}/browse/new-releases`;

        return this.httpClient.get<releasesResult>(url, httpOptions).pipe(
          catchError(error => {
            console.error('Error al obtener lanzamientos:', error);
            throw error;
          })
        );
      })
    );
  }

  getArtist(artist:string): Observable<artistResult>{
    return this.getAccessToService().pipe(
      switchMap(token => {
        const httpOptions = {
          headers: new HttpHeaders({
            'Authorization': `Bearer ${token}`,
          })
        };

        const url = `${this.requestsUrl}/search?q=${artist}&type=artist&limit=1`;

        return this.httpClient.get<artistResult>(url, httpOptions).pipe(
          catchError(error => {
            console.error('Error al obtener artista:', error);
            throw error;
          })
        );
      })
    );
  }

  getArtistAlbums(artistID:string): Observable<albumResult>{
    return this.getAccessToService().pipe(
      switchMap(token => {
        const httpOptions = {
          headers: new HttpHeaders({
            'Authorization': `Bearer ${token}`,
          })
        };

        const url = `${this.requestsUrl}/artists/${artistID}/albums?limit=10`;

        return this.httpClient.get<albumResult>(url, httpOptions).pipe(
          catchError(error => {
            console.error('Error al obtener albumes:', error);
            throw error;
          })
        );
      })
    );

  }




}
