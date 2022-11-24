import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {firstValueFrom} from 'rxjs';
import {BackendService} from 'src/app/services/backend.service';
import {NzModalService} from "ng-zorro-antd/modal";

@Component({
  selector: 'app-account-person-modal-create',
  templateUrl: './account-person-modal-create.component.html',
  styleUrls: ['./account-person-modal-create.component.sass']
})
export class AccountPersonModalCreateComponent implements OnInit {

  @Output() createItemEvent = new EventEmitter<any>();
  isVisible = false;
  formGroup: FormGroup;
  isLoading = false;
  accountId;

  constructor(
    private readonly fb: FormBuilder,
    private readonly backendService: BackendService,
    private readonly modalService: NzModalService,
  ) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formGroup = this.fb.group({
      name: [''],
      surname: [''],
      email: [''],
      phone: [''],
      job_title: [''],
      roles: [[]],
      invite: [false],
    });
  }

  resetForm() {
    this.formGroup.get('name').setValue('');
    this.formGroup.get('surname').setValue('');
    this.formGroup.get('email').setValue('');
    this.formGroup.get('phone').setValue('');
    this.formGroup.get('job_title').setValue('');
    this.formGroup.get('roles').setValue([]);
    this.formGroup.get('invite').setValue(false);
  }

  open(accountId): void {
    this.resetForm();
    this.isVisible = true;
    this.accountId = accountId;
  }

  close(): void {
    this.isVisible = false;
  }

  async onAcceptButton(): Promise<void> {
    this.isLoading = true;
    try {
      const personId = (await this.createPerson()).body;
      const person = (await this.getPerson(personId)).body;
      if (this.formGroup.get('invite').value) {
        const responseInvite: any = await this.invitePerson(person.uuid);
        this.modalService.create({
          nzContent: `a:${person.uuid}\nt:${responseInvite.body[0]}`,
          nzCentered: true,
          nzFooter: null,
        });
      }
      this.createItemEvent.emit();
      this.close();
    } catch (e) {

    }
    this.isLoading = false;
  }

  async createPerson(): Promise<any> {
    const value = {
      name: this.formGroup.get('name').value,
      surname: this.formGroup.get('surname').value,
      email: this.formGroup.get('email').value,
      phone: this.formGroup.get('phone').value,
      job_title: this.formGroup.get('job_title').value,
      roles: this.formGroup.get('roles').value,
    }
    const request = this.backendService.postAccountPerson(this.accountId, value);
    return await firstValueFrom(request);
  }

  async getPerson(personId): Promise<any> {
    const request = this.backendService.getAccountPersons(this.accountId, personId);
    return await firstValueFrom(request);
  }

  async invitePerson(personUuid) {
    const value = [{
      agent_type: 'staff',
      agent_uuid: personUuid,
    }];
    const request = this.backendService.inviteAccountPersonStaff(this.accountId, value);
    return await firstValueFrom(request);
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

}
