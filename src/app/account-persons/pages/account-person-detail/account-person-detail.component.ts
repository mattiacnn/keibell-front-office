import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-account-person-detail',
  templateUrl: './account-person-detail.component.html',
  styleUrls: ['./account-person-detail.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class AccountPersonDetailComponent implements OnInit {

  accountPerson
  loading = false;
  id;
  accountId;
  formGroup;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly backendService: BackendService,
  ) { }

  ngOnInit(): void {
    this.accountPerson = this.activatedRoute.snapshot.data.accountPerson.body;
    this.id = this.route.snapshot.params.id as string;
    this.accountId = this.route.snapshot.params.accountId as string;
    this.initForm();
    this.setFormValuesByResponse(this.accountPerson);
  }

  initForm(): void {
    this.formGroup = this.fb.group({
      id: [{value: this.id, disabled: true}],
      name: [''],
      surname: [''],
      job_title: [''],
      email: [''],
      phone: [''],
      roles: [[]],
    });
  }

  setFormValuesByResponse(response) {
    this.formGroup.get('name').setValue(response.name);
    this.formGroup.get('surname').setValue(response.surname);
    this.formGroup.get('email').setValue(response.email);
    this.formGroup.get('phone').setValue(response.phone);
    this.formGroup.get('job_title').setValue(response.job_title);
    this.formGroup.get('roles').setValue([...response.roles]);
  }

  addRole(event) {
    const input = event.target as HTMLInputElement;
    if (input.value && input.value !== '') {
      const rolesControl = this.formGroup.get('roles');
      const newValue = [...rolesControl.value, input.value];
      input.value = "";
      rolesControl.setValue(newValue);
    }
  }

  removeRole(index) {
    const rolesControl = this.formGroup.get('roles');
    (<Array<any>>rolesControl.value).splice(index, 1);
  }

  async onModifyClick(): Promise<void> {
    this.loading = true;
    try {
      const value = {
        name: this.formGroup.get('name').value,
        surname: this.formGroup.get('surname').value,
        email: this.formGroup.get('email').value,
        phone: this.formGroup.get('phone').value,
        job_title: this.formGroup.get('job_title').value,
        roles: this.formGroup.get('roles').value,
      }
      const request = this.backendService.putAccountPersons(this.accountId, this.id, value);
      const response: any = await firstValueFrom(request);
      this.accountPerson = value;
    } catch (e) {

    }
    this.loading = false;
  }

  async onCancelClick(): Promise<void> {
    this.loading = true;
    try {
      const request = this.backendService.getAccountPersons(this.accountId, this.id);
      const response: any = await firstValueFrom(request);
      this.setFormValuesByResponse(response.body);
      this.accountPerson = response.body;
    } catch (e) {

    }
    this.loading = false;
  }

}
