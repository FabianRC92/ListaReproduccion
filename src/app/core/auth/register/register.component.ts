import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { RegisterResponse } from '../types/auth.type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  public registerForm!: FormGroup;
  public errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      photo: 'string',
    });
  }

  /**
   * call service for register user
   */
  public registerUser(): void {
    const errorDescription = 'Error creating user';
    if (this.registerForm.valid) {
      this.authService.registerUser(this.registerForm.value).subscribe({
        next: (res: RegisterResponse) => {
          if (res.auth.token && res.auth.token !== '') {
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
