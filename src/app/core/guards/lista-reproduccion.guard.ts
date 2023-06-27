import { Injectable } from '@angular/core';
import { CanLoad, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StateService } from '../services/state.service';

@Injectable({
  providedIn: 'root',
})
export class ListaReproduccionGuard implements CanLoad {
  constructor(private stateService: StateService, private router: Router) {}

  canLoad():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const userInfo =
      this.stateService.userInfo || sessionStorage.getItem('objUser');

    if (userInfo) return true;

    this.router.navigate(['/']);

    return false;
  }
}
