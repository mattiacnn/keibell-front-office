import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {GlobalVariablesService} from "../../services/global-variables.service";
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors} from "@angular/forms";
import {BackendService} from "../../services/backend.service";
import {firstValueFrom} from "rxjs";
import {ForgotPwdModalComponent} from "../forgot-pwd-modal/forgot-pwd-modal.component";

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.sass']
})
export class LoginModalComponent implements OnInit {

  formGroup: FormGroup;
  titleErrorModalInfo = '';
  contentErrorModalInfo = '';
  isVisibleErrorModalInfo = false;
  isVisibleForgotPassword = false;
  loading = false;
  firstAttempt = false;
  @ViewChild(ForgotPwdModalComponent) forgotPwdModalComponent: ForgotPwdModalComponent;

  constructor(
    private readonly authService: AuthService,
    private readonly globalVariablesService: GlobalVariablesService,
    private readonly fb: FormBuilder,
    private readonly backendService: BackendService,
  ) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  isVisibleLogin(): boolean {
    return !this.authService.user && !this.globalVariablesService.hideLogin && !this.isVisibleForgotPassword;
  }

  initForm(): void {
    this.formGroup = this.fb.group({
      email: [''],
      password: ['']
    }, {
      validators: [
        this.emailValidator.bind(this),
        this.passwordValidator.bind(this),
      ]
    });
  }

  resetForm() {
    this.formGroup.get('email').setValue('');
    this.formGroup.get('password').setValue('');
  }

  onClickForgotPassword() {
    this.isVisibleForgotPassword = true;
    this.forgotPwdModalComponent.firstAttempt = false;
    this.resetForm();
  }

  async login(): Promise<void> {
    this.firstAttempt = true;
    if (!this.formGroup.valid) {
      return;
    }
    this.loading = true;
    try {
      const responseLogin = await this.loginRequest();
      const jwt = responseLogin.body.jwt;
      this.backendService.saveJwt(jwt);
      this.firstAttempt = false;
      this.resetForm();
      this.authService.user = responseLogin.body.person;
      await this.authService.getProfileSettings();
    } catch (e) {
      this.contentErrorModalInfo = 'LOGIN.ERROR_MODAL_INFO.UNKNOWN_ERROR.CONTENT';
      this.titleErrorModalInfo = 'LOGIN.ERROR_MODAL_INFO.UNKNOWN_ERROR.TITLE';
      this.isVisibleErrorModalInfo = true;
    }
    this.loading = false;
  }

  async loginRequest(): Promise<any> {
    const value = {
      username: this.formGroup.get('email').value,
      password: this.formGroup.get('password').value,
    };
    const request = this.backendService.loginStaff(value);
    const response = await firstValueFrom(request);
    return response;
  }

  backButtonEventForgotPwd(): void {
    this.isVisibleForgotPassword = false;
    this.resetForm();
  }

  confirmForgotPasswordEvent(): void {
    this.isVisibleForgotPassword = false;
    this.resetForm();
  }

  // Validators
  private emailValidator(control: AbstractControl): ValidationErrors | null {
    let isError = false;
    let error = {
      emailError: {}
    };
    const value = control.get('email').value;
    if (!value || value === '') {
      isError = true;
      error.emailError['empty'] = true;
    }
    return isError ? error : null;
  }

  getMessageEmailError(): string[] {
    const message = [];
    if (!this.formGroup.errors || !this.formGroup.errors.emailError) {
      return null;
    }
    if (this.formGroup.errors.emailError.empty) {
      message.push('LOGIN.EMAIL_INPUT.EMPTY_ERROR');
    }
    return message;
  }

  private passwordValidator(control: AbstractControl): ValidationErrors | null {
    let isError = false;
    let error = {
      passwordError: {}
    };
    const value = control.get('password').value;
    if (!value || value === '') {
      isError = true;
      error.passwordError['empty'] = true;
    }
    return isError ? error : null;
  }

  getMessagePasswordError(): string[] {
    const message = [];
    if (!this.formGroup.errors || !this.formGroup.errors.passwordError) {
      return null;
    }
    if (this.formGroup.errors.passwordError.empty) {
      message.push('LOGIN.PASSWORD_INPUT.EMPTY_ERROR');
    }
    return message;
  }
}
