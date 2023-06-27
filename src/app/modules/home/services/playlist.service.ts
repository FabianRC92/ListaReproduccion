import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PlayList } from '../pages/types/playlist.type';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  private readonly API = environment.api;

  constructor(private http: HttpClient) {}

  /**
   * call service that return list of playlist
   * @returns
   */
  public getAllList() {
    return this.http
      .get<PlayList[]>(`${this.API}/lists`)
      .pipe(catchError(this.handleError));
  }

  /**
   * call service for create a playlist
   * @param objPlaylist object to create
   * @returns observable
   */
  public addPlaylist(objPlaylist: FormData): Observable<PlayList> {
    return this.http
      .post<PlayList>(`${this.API}/lists`, objPlaylist)
      .pipe(catchError(this.handleError));
  }

  /**
   * call service for remove a playlist
   * @param listName name of playlist
   * @returns observable
   */
  public removePlaylist(listName: string) {
    return this.http
      .delete<any>(`${this.API}/lists/${listName}`)
      .pipe(catchError(this.handleError));
  }

  /**
   * handle the errors from httpclient
   * @param error object with error
   * @returns observable
   */
  private handleError(error: HttpErrorResponse): Observable<any> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `${error.status}, ${error.error.details}`;
    }
    return throwError(() => {
      return errorMessage;
    });
  }
}
