import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {lastValueFrom} from 'rxjs';
import {BackendService} from 'src/app/services/backend.service';
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-account-property-slide',
  templateUrl: './account-property-slide.component.html',
  styleUrls: ['./account-property-slide.component.sass']
})
export class AccountPropertySlideComponent implements OnInit {

  accountId;
  itemId;
  isVisible = false;
  isLoading = false;
  name = "Test";
  formGroup
  @Output() modifyItemEvent = new EventEmitter<any>();

  constructor(
    private readonly fb: FormBuilder,
    private readonly backendService: BackendService,
    private readonly router: Router,
  ) {
  }

  ngOnInit(): void {
    this.initFormGroup();
  }

  initFormGroup(): void {
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

  cleanValue(): void {
    this.name = "";
    this.formGroup.get('name').setValue('');
    this.formGroup.get('pms_type').setValue('');
    this.formGroup.get('pms_connection_ClientToken').setValue('');
    this.formGroup.get('pms_connection_AccessToken').setValue('');
    this.formGroup.get('lock_tech').setValue('');
    this.formGroup.get('lock_tech_connection_host').setValue('');
    this.formGroup.get('lock_tech_connection_port').setValue('');
  }

  setValuesFormByResponse(response): void {
    this.name = response.name;
    this.formGroup.get('name').setValue(response.name);
    this.formGroup.get('pms_type').setValue(response.pms_type);
    this.formGroup.get('pms_connection_ClientToken').setValue(response.pms_connection?.ClientToken);
    this.formGroup.get('pms_connection_AccessToken').setValue(response.pms_connection?.AccessToken);
    this.formGroup.get('lock_tech').setValue(response.lock_tech);
    this.formGroup.get('lock_tech_connection_host').setValue(response.lock_tech_connection?.host);
    this.formGroup.get('lock_tech_connection_port').setValue(response.lock_tech_connection?.port);
  }

  async open(accountId, id): Promise<void> {
    this.isLoading = true;
    this.isVisible = true;
    this.cleanValue();
    this.accountId = accountId;
    this.itemId = id;
    const request = this.backendService.getAccountProperties(accountId, id);
    try {
      const response: any = await lastValueFrom(request);
      this.setValuesFormByResponse(response.body);
    } catch (e) {
      console.log(e);
    }
    this.isLoading = false;
  }

  close(): void {
    this.isVisible = false;
  }

  async modifyItem(): Promise<void> {
    if (!this.formGroup.valid) {
      return;
    }
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
    this.isLoading = true;
    const request = this.backendService.putAccountProperty(this.accountId, this.itemId, value);
    try {
      const response: any = await lastValueFrom(request);
      this.name = value.name;
      this.modifyItemEvent.emit();
      this.isVisible = false;
    } catch (e) {

    }
    this.isLoading = false;
  }

  onDetailClick() {
    this.router.navigate(['account', this.accountId, 'property', 'detail', this.itemId]);
  }

}
