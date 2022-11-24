import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors} from "@angular/forms";
import {BackendService} from "../../services/backend.service";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-forgot-pwd-modal',
  templateUrl: './forgot-pwd-modal.component.html',
  styleUrls: ['./forgot-pwd-modal.component.sass']
})
export class ForgotPwdModalComponent implements OnInit {

  loading = false;
  formGroup: FormGroup;
  firstAttempt = false;

  // Modal info
  isVisibleModalInfo = false;
  titleModalInfo = '';
  contentModalInfo = '';
  iconTypeModalInfo = '';
  iconThemeModalInfo = '';
  iconTwotoneColor = '';


  @Input() isVisible = false;
  @Output() isVisibleChange = new EventEmitter<boolean>();
  @Input() isVisibleBackButton = true;
  @Output() backButtonEvent = new EventEmitter<null>();
  @Output() confirmForgotPasswordEvent = new EventEmitter<null>();

  constructor(
    private readonly backendService: BackendService,
    private readonly fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.initFormGroup();
  }

  initFormGroup(): void {
    this.formGroup = this.fb.group({
      email: [''],
    }, {
      validators: this.emailValidator.bind(this),
    })
  }

  resetForm(): void {
    this.formGroup.get('email').setValue('');
  }

  onClickBackButton(): void {
    this.backButtonEvent.emit();
    this.resetForm();
  }

  async onClickAccept(): Promise<void> {
    this.firstAttempt = true;
    if (!this.formGroup.valid) {
      return;
    }
    try {
      const value = {
        email: this.formGroup.get('email').value,
      };
      const request = this.backendService.forgotPassword(value);
      const response: any = await firstValueFrom(request);
      this.titleModalInfo = 'FORGOT_PASSWORD.CONFIRM_MODAL_INFO.TITLE';
      this.contentModalInfo = 'FORGOT_PASSWORD.CONFIRM_MODAL_INFO.CONTENT';
      this.iconTypeModalInfo = 'check-circle';
      this.iconThemeModalInfo = 'twotone';
      this.iconTwotoneColor = '';
      console.log(response);
    } catch (e) {
      console.log(e);
      this.titleModalInfo = 'FORGOT_PASSWORD.ERROR_MODAL_INFO.TITLE';
      this.contentModalInfo = 'FORGOT_PASSWORD.ERROR_MODAL_INFO.CONTENT';
      this.iconTypeModalInfo = 'close-circle';
      this.iconThemeModalInfo = 'twotone';
      this.iconTwotoneColor = '#ff0000';
      this.isVisibleModalInfo = true;
    }
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

}
