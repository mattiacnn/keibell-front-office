import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors} from "@angular/forms";
import {NzModalService} from "ng-zorro-antd/modal";
import {AuthService} from "../../../services/auth.service";
import {BackendService} from "../../../services/backend.service";
import {firstValueFrom} from "rxjs";
import {InternationalizationService} from "../../../services/internationalization.service";

@Component({
  selector: 'app-kiosk-activate-modal',
  templateUrl: './kiosk-activate-modal.component.html',
  styleUrls: ['./kiosk-activate-modal.component.sass']
})
export class KioskActivateModalComponent implements OnInit {

  isVisible = false;
  isLoading = false;
  formGroup: FormGroup;
  kblKioskListOption: { label: string, value: any }[] = [];

  @Output('acceptEvent') acceptEmitter = new EventEmitter<any>();

  constructor(
    private readonly fb: FormBuilder,
    private readonly nzModalService: NzModalService,
    private readonly authService: AuthService,
    private readonly backendService: BackendService,
    private readonly internationalizationService: InternationalizationService,
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.initForm();
  }

  initForm() {
    this.formGroup = this.fb.group({
      'kiosk_id': [{value: '', disabled: true}],
      'kbl_kiosk_uuid': [null],
    }, {
      validators: [
        this.kioskIdValidator.bind(this),
        this.kblKioskUuidValidator.bind(this),
      ]
    });
  }

  resetForm() {
    this.formGroup.get('kiosk_id').setValue('');
    this.formGroup.get('kbl_kiosk_uuid').setValue('');
  }

  close() {
    this.isVisible = false;
  }

  async open(kiosk_id: string): Promise<void> {
    this.isVisible = true;
    this.isLoading = true;
    this.resetForm();
    this.formGroup.get('kiosk_id').setValue(kiosk_id);
    try {
      const responseKiosk = await this.requestKiosk();
      this.kblKioskListOption = responseKiosk.map(element => {
        return {
          label: element.name,
          value: element.uuid,
        }
      });
    } catch (e) {
      this.isVisible = false;
      this.nzModalService.error({
        nzCentered: true,
        nzTitle: await this.internationalizationService.translate('KIOSK.ACTIVATE_MODAL.MODAL_ERROR.TITLE'),
        nzContent: await this.internationalizationService.translate('KIOSK.ACTIVATE_MODAL.MODAL_ERROR.CONTENT_UNKNOWN'),
      });
    }
    this.isLoading = false;
  }

  async onAccept(): Promise<void> {
    this.isLoading = true;
    if (!this.formGroup.valid) {
      return;
    }
    try {
      await this.requestActivateKiosk();
      this.isVisible = false;
      this.acceptEmitter.emit();
    } catch (e) {
      this.nzModalService.error({
        nzCentered: true,
        nzTitle: await this.internationalizationService.translate('KIOSK.ACTIVATE_MODAL.MODAL_ERROR.TITLE'),
        nzContent: await this.internationalizationService.translate('KIOSK.ACTIVATE_MODAL.MODAL_ERROR.CONTENT_UNKNOWN'),
      });
    }
    this.isLoading = false;
  }

  async requestKiosk(): Promise<any[]> {
    console.log(this.authService.user);
    const request = this.backendService.getAccountKiosks(1);
    const response: any = await firstValueFrom(request);
    return response.body;
  }

  async requestActivateKiosk(): Promise<void> {
    const value = {
      'kiosk_id': this.formGroup.get('kiosk_id').value,
      'kbl_kiosk_uuid': this.formGroup.get('kbl_kiosk_uuid').value,
    }
    const request = this.backendService.postKioskActivate(value);
    const response: any = await firstValueFrom(request);
  }

  // Validators
  private kioskIdValidator(control: AbstractControl): ValidationErrors | null {
    let isError = false;
    let error = {
      kioskIdError: {}
    };
    const value = control.get('kiosk_id').value;
    if (!value || value === '') {
      isError = true;
      error.kioskIdError['empty'] = true;
    }
    return isError ? error : null;
  }

  getKioskIdMessageError(): string[] | null {
    const message = [];
    if (!this.formGroup.errors || !this.formGroup.errors.kioskIdError) {
      return null;
    }
    if (this.formGroup.errors.kioskIdError.empty) {
      message.push('KIOSK.ACTIVATE_MODAL.KIOSK_ID_INPUT.EMPTY_ERROR');
    }
    return message;
  }

  private kblKioskUuidValidator(control: AbstractControl): ValidationErrors | null {
    let isError = false;
    let error = {
      kblKioskUuidError: {}
    };
    const value = control.get('kbl_kiosk_uuid').value;
    if (!value || value === '') {
      isError = true;
      error.kblKioskUuidError['empty'] = true;
    }
    return isError ? error : null;
  }

  getKblKioskUuidMessageError(): string[] | null {
    const message = [];
    if (!this.formGroup.errors || !this.formGroup.errors.kblKioskUuidError) {
      return null;
    }
    if (this.formGroup.errors.kblKioskUuidError.empty) {
      message.push('KIOSK.ACTIVATE_MODAL.KBL_KIOSK_UUID.EMPTY_ERROR');
    }
    return message;
  }

}
