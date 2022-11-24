import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {firstValueFrom} from "rxjs";
import {BackendService} from "../../../services/backend.service";

@Component({
  selector: 'app-account-kiosk-detail',
  templateUrl: './account-kiosk-detail.component.html',
  styleUrls: ['./account-kiosk-detail.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class AccountKioskDetailComponent implements OnInit {

  loading = false;
  name = "";
  itemId;
  formGroup: FormGroup;
  accountId;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly fb: FormBuilder,
    private readonly backendService: BackendService,
  ) {
  }

  ngOnInit(): void {
    const accountKiosk = this.activatedRoute.snapshot.data.accountKiosk.body;
    this.name = accountKiosk.name;
    this.itemId = accountKiosk.id;
    this.accountId = this.activatedRoute.snapshot.params.accountId as string;
    this.initFormGroup();
    this.setFormValuesByResponse(accountKiosk);
  }

  initFormGroup(): void {
    this.formGroup = this.fb.group({
      id: [{value: this.itemId, disabled: true}],
      name: [''],
      description: [''],
      location: [null],
      key_cutter_connection: [null]
    });
  }

  setFormValuesByResponse(response): void {
    this.name = response.name;
    this.formGroup.get('name').setValue(response.name);
    this.formGroup.get('description').setValue(response.description);
    this.formGroup.get('location').setValue(response.location);
    this.formGroup.get('key_cutter_connection').setValue(response.key_cutter_connection);
  }

  async onModifyClick(): Promise<void> {
    this.loading = true;
    try {
      const value = {
        name: this.formGroup.get('name').value,
        description: this.formGroup.get('description').value,
        location: this.formGroup.get('location').value,
        key_cutter_connection: this.formGroup.get('key_cutter_connection').value,
      }
      const request = this.backendService.putAccountKiosk(this.accountId, this.itemId, value);
      const response: any = await firstValueFrom(request);
      this.name = value.name;
    } catch (e) {

    }
    this.loading = false;
  }

  async onCancelClick(): Promise<void> {
    this.loading = true;
    try {
      const request = this.backendService.getAccountKiosks(this.accountId, this.itemId);
      const response: any = await firstValueFrom(request);
      this.setFormValuesByResponse(response.body);
      this.name = response.body.name;
    } catch (e) {

    }
    this.loading = false;
  }

}
