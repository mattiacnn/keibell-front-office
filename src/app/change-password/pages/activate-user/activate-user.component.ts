import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {GlobalVariablesService} from "../../../services/global-variables.service";
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors} from "@angular/forms";
import {BackendService} from "../../../services/backend.service";
import {firstValueFrom} from "rxjs";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-activate-user',
  templateUrl: './activate-user.component.html',
  styleUrls: ['./activate-user.component.sass']
})
export class ActivateUserComponent implements OnInit, OnDestroy {

  formGroup: FormGroup;
  firstAttemptAccept = false;
  token;
  agent_uuid;
  purpose;
  loading = false;
  isVisibleInvitationErrorModal = false;
  jwt;
  isVisibleChangePwdErrorModal = false;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly globalVariablesService: GlobalVariablesService,
    private readonly fb: FormBuilder,
    private readonly backendService: BackendService,
    private readonly authService: AuthService,
  ) { }

  async ngOnInit(): Promise<void> {
    this.loading = true;
    this.globalVariablesService.hideSidebar = true;
    this.globalVariablesService.hideLogin = true;
    this.token = this.activatedRoute.snapshot.queryParams.t;
    this.agent_uuid = this.activatedRoute.snapshot.queryParams.a;
    this.purpose = this.activatedRoute.snapshot.queryParams.p;
    try {
      await this.acceptInvitation();
      this.initForm();
    } catch (e) {
      this.isVisibleInvitationErrorModal = true;
    }
    this.loading = false;
  }

  ngOnDestroy(): void {
    this.globalVariablesService.hideSidebar = false;
    this.globalVariablesService.hideLogin = false;
  }

  initForm(): void {
    this.formGroup = this.fb.group({
      pwd: [''],
      confirm_pwd: ['']
    }, {
      validators: [
        this.pwdValidator.bind(this),
        this.confirmPasswordValidator.bind(this),
      ]
    });
  }

  async onAcceptButton(): Promise<void> {
    this.loading = true;
    this.firstAttemptAccept = true;
    if (!this.formGroup.valid) {
      return;
    }
    try {
      await this.changePwd();
      this.logout();
      this.router.navigate(['']);
    } catch (e) {
      this.isVisibleChangePwdErrorModal = true;
    }
    this.loading = false;
  }

  async acceptInvitation(): Promise<any> {
    const value = {
      purpose: this.purpose,
      agent_uuid: this.agent_uuid,
      token: this.token,
    }
    const request = this.backendService.acceptUserInvitation(value);
    const response: any = await firstValueFrom(request);
    this.jwt = response.body.jwt;
  }

  async changePwd(): Promise<any> {
    const value = {
      new_password: this.formGroup.get('pwd').value,
    };
    const request = this.backendService.changeUserPassword(value, this.jwt);
    await firstValueFrom(request);
  }

  async logout(): Promise<any> {
    const request = this.backendService.logoutWithJWT(this.jwt);
    await firstValueFrom(request);
  }

  // Validators
  private pwdValidator(control: AbstractControl): ValidationErrors | null {
    let isError = false;
    let error = {
      pwdError: {}
    };
    const value = control.get('pwd').value;
    const confirmPwdValue = control.get('confirm_pwd').value;
    if (!value || value === '') {
      isError = true;
      error.pwdError['empty'] = true;
    }
    if (value !== confirmPwdValue) {
      isError = true;
      error.pwdError['password_not_match'] = true;
    }
    return isError ? error : null;
  }

  getMessagePwdError(): string[] {
    const message = [];
    if (!this.formGroup.errors || !this.formGroup.errors.pwdError) {
      return null;
    }
    if (this.formGroup.errors.pwdError.empty) {
      message.push('CHANGE_PWD.NEW_PASSWORD_INPUT.EMPTY_ERROR');
    }
    if (this.formGroup.errors.pwdError.password_not_match) {
      message.push('CHANGE_PWD.NEW_PASSWORD_INPUT.PASSWORD_NOT_MATCH_ERROR');
    }
    return message;
  }

  private confirmPasswordValidator (control: AbstractControl): ValidationErrors | null {
    let isError = false;
    let error = {
      confirmPwdError: {}
    };
    const value = control.get('confirm_pwd').value;
    const pwdValue = control.get('pwd').value;
    if (!value || value === '') {
      isError = true;
      error.confirmPwdError['empty'] = true;
    }
    if (value !== pwdValue) {
      isError = true;
      error.confirmPwdError['password_not_match'] = true;
    }
    return isError ? error : null;
  }

  getMessageConfirmPwdError(): string[] {
    const message = [];
    if (!this.formGroup.errors || !this.formGroup.errors.confirmPwdError) {
      return null;
    }
    if (this.formGroup.errors.confirmPwdError.empty) {
      message.push('CHANGE_PWD.CONFIRM_PASSWORD_INPUT.EMPTY_ERROR');
    }
    if (this.formGroup.errors.confirmPwdError.password_not_match) {
      message.push('CHANGE_PWD.CONFIRM_PASSWORD_INPUT.PASSWORD_NOT_MATCH_ERROR');
    }
    return message;
  }

}
