import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RegisterResponse } from '../types/auth.type';
import { StateService } from '../../services/state.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API = environment.api;

  constructor(private http: HttpClient, private stateService: StateService) {}

  /**
   * call service for register user
   * @param registerForm object with user to register
   * @returns observable
   */
  public registerUser(registerForm: FormData): Observable<any> {
    return this.http
      .post<RegisterResponse>(`${this.API}/auth/register`, registerForm)
      .pipe(catchError(this.handleError));
  }

  /**
   * set info user for access to project
   * @param objUser
   */
  public setUserInfo(objUser: RegisterResponse | Object): void {
    this.stateService.userInfo = objUser;
    sessionStorage.setItem('objUser', JSON.stringify(objUser));
  }

  /**
   * call service for login user
   * @param registerForm object with user to access
   * @returns observable
   */
  public loginUser(registerForm: FormData): Observable<any> {
    return this.http
      .post<any>(`${this.API}/auth/login`, registerForm)
      .pipe(catchError(this.handleError));
  }

  /**
   * handle the errors from httpclient
   * @param error object with error
   * @returns observable
   */
  private handleError(error: any): Observable<any> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = error.status;
    }
    return throwError(() => {
      return errorMessage;
    });
  }
}
