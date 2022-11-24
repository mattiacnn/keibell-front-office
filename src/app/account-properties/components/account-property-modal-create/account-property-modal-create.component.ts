import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {BackendService} from "../../../services/backend.service";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-account-property-modal-create',
  templateUrl: './account-property-modal-create.component.html',
  styleUrls: ['./account-property-modal-create.component.sass']
})
export class AccountPropertyModalCreateComponent implements OnInit {

  @Output() createItemEvent = new EventEmitter<any>();
  isVisible = false;
  formGroup: FormGroup;
  isLoading = false;
  accountId;

  constructor(
    private readonly fb: FormBuilder,
    private readonly backendService: BackendService,
  ) {
  }

  ngOnInit(): void {
    this.initForm();
    this.resetForm();
  }

  initForm() {
    this.formGroup = this.fb.group({
      name: [''],
      pms_type: [''],
      pms_connection_ClientToken: [''],
      pms_connection_AccessToken: [''],
      lock_tech: [''],
      lock_tech_connection_host: [''],
      lock_tech_connection_port: [''],
    });
  }

  close(): void {
    this.isVisible = false;
  }

  resetForm() {
    this.formGroup.get('name').setValue('');
    this.formGroup.get('pms_type').setValue('mews');
    this.formGroup.get('pms_connection_ClientToken').setValue('');
    this.formGroup.get('pms_connection_AccessToken').setValue('');
    this.formGroup.get('lock_tech').setValue('salto_single');
    this.formGroup.get('lock_tech_connection_host').setValue('');
    this.formGroup.get('lock_tech_connection_port').setValue('');
  }

  open(accountId): void {
    this.resetForm();
    this.isVisible = true;
    this.accountId = accountId;
  }

  async onAcceptButton(): Promise<void> {
    this.isLoading = true;
    try {
      const value = {
        name: this.formGroup.get('name').value,
        pms_type: this.formGroup.get('pms_type').value,
        pms_connection: {
          AccessToken: this.formGroup.get('pms_connection_AccessToken').value,
          ClientToken: this.formGroup.get('pms_connection_ClientToken').value,
        },
        lock_tech: this.formGroup.get('lock_tech').value,
        lock_tech_connection: {
          host: this.formGroup.get('lock_tech_connection_host').value,
          port: this.formGroup.get('lock_tech_connection_port').value,
        }
      }
      const request = this.backendService.postAccountProperty(this.accountId, value);
      const response = await firstValueFrom(request);
      this.createItemEvent.emit();
      this.close();
    } catch (e) {

    }
    this.isLoading = false;
  }

}
