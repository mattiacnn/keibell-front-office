import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-account-person-slide',
  templateUrl: './account-person-slide.component.html',
  styleUrls: ['./account-person-slide.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class AccountPersonSlideComponent implements OnInit {

  accountId;
  name;
  isVisible = false;
  title: string;
  isLoading = false;
  formGroup: FormGroup;

  @Output() modifyItemEvent = new EventEmitter<any>();

  constructor(
    private readonly fb: FormBuilder,
    private readonly backendService: BackendService,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
    this.initFormGroup();
  }

  initFormGroup(): void {
    this.formGroup = this.fb.group({
      id: [''],
      name: [''],
      surname: [''],
      email: [''],
      phone: [''],
      job_title: [''],
      roles: [[]],
    });
  }

  cleanValue(): void {
    this.name = "";
    this.formGroup.get('id').setValue('');
    this.formGroup.get('name').setValue('');
    this.formGroup.get('surname').setValue('');
    this.formGroup.get('email').setValue('');
    this.formGroup.get('phone').setValue('');
    this.formGroup.get('job_title').setValue('');
    this.formGroup.get('roles').setValue([]);
  }

  setValuesFormByResponse(responseBody): void {
    this.name = responseBody.name;
    this.formGroup.get('id').setValue(responseBody.id);
    this.formGroup.get('name').setValue(responseBody.name);
    this.formGroup.get('surname').setValue(responseBody.surname);
    this.formGroup.get('email').setValue(responseBody.email);
    this.formGroup.get('phone').setValue(responseBody.phone);
    this.formGroup.get('job_title').setValue(responseBody.job_title);
    this.formGroup.get('roles').setValue(responseBody.roles);
  }

  async open(accountId, id): Promise<void> {
    this.isLoading = true;
    this.isVisible = true;
    this.cleanValue();
    this.accountId = accountId;
    const request = this.backendService.getAccountPersons(accountId, id);
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
      surname: this.formGroup.get('surname').value,
      email: this.formGroup.get('email').value,
      phone: this.formGroup.get('phone').value,
      job_title: this.formGroup.get('job_title').value,
      roles: this.formGroup.get('roles').value,
    }
    this.isLoading = true;
    const request = this.backendService.putAccountPersons(this.accountId, this.formGroup.get('id').value, value);
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
    this.router.navigate(['account', this.accountId, 'person', 'detail', this.formGroup.get('id').value]);
  }

}
