import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function fillForm(): any {
    return {
      username: 'ja@ja.com',
      password: '123456',
    };
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should detect if form is invalid', () => {
    expect(component.loginForm.invalid).toBeTruthy();
  });

  it('should button login is disabled', () => {
    const button =
      fixture.debugElement.nativeElement.querySelector('#btnLogin');
    expect(button.disabled).not.toBeFalsy();
  });

  it('should form is valid with correct fields', () => {
    component.loginForm.patchValue(fillForm());

    expect(component.loginForm.valid).toBeTruthy();
  });

  it('should call login user', () => {
    const loginFn = spyOn(component, 'loginUser');
    component.loginUser();
    expect(loginFn).toHaveBeenCalled();
  });
});
