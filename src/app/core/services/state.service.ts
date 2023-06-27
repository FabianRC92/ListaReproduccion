import { Injectable } from '@angular/core';
import { RegisterResponse } from '../auth/types/auth.type';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  public userInfo!: RegisterResponse | Object;

  /**
   * set infoUser
   * @param infoUser object to set userInfo
   */
  public setUserInfo(infoUser: RegisterResponse): void {
    this.userInfo = infoUser;
  }
}
