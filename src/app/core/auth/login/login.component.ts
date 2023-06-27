import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { LoginResponse } from '../types/auth.type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  public errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    sessionStorage.clear();
  }

  /**
   * call service for login to app
   */
  public loginUser(): void {
    const errorDescription = 'Error login';

    if (this.loginForm.valid) {
      this.authService.loginUser(this.loginForm.value).subscribe({
        next: (res: LoginResponse) => {
          if (res.token && res.token !== '') {
            this.authService.setUserInfo(res);
            this.redirectHome();
            this.errorMessage = '';
          } else this.errorMessage = errorDescription;
        },
        error: (res: string) => {
          this.errorMessage = `${res}, ${errorDescription}`;
        },
      });
    }
  }

  /**
   * redirect to home page
   */
  private redirectHome() {
    this.router.navigate(['/home']);
  }
}
