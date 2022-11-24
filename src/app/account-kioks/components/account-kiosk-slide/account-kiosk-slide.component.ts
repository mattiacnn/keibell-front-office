import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {BackendService} from "../../../services/backend.service";
import {lastValueFrom} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-account-kiosk-slide',
  templateUrl: './account-kiosk-slide.component.html',
  styleUrls: ['./account-kiosk-slide.component.sass']
})
export class AccountKioskSlideComponent implements OnInit {

  isVisible = false;
  formGroup: FormGroup;
  isLoading = false;
  name = "TEST";
  accountId;
  itemId;

  @Output() modifyItemEvent = new EventEmitter();

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
      name: [''],
      description: [''],
      location: [null],
      key_cutter_connection: [null]
    });
  }

  cleanValue(): void {
    this.name = "";
    this.formGroup.get('name').setValue('');
    this.formGroup.get('description').setValue('');
  }


  setValuesFormByResponse(response): void {
    this.name = response.name;
    this.formGroup.get('name').setValue(response.name);
    this.formGroup.get('description').setValue(response.description);
    this.formGroup.get('location').setValue(response.location);
    this.formGroup.get('key_cutter_connection').setValue(response.key_cutter_connection);
  }

  async open(accountId, id): Promise<void> {
    this.isLoading = true;
    this.isVisible = true;
    this.cleanValue();
    this.accountId = accountId;
    this.itemId = id;
    const request = this.backendService.getAccountKiosks(accountId, id);
    try {
      const response: any = await lastValueFrom(request);
      this.setValuesFormByResponse(response.body);
    } catch (e) {
      console.log(e);
    }
    this.isLoading = false;
  }

  async modifyItem(): Promise<void> {
    if (!this.formGroup.valid) {
      return;
    }
    const value = {
      name: this.formGroup.get('name').value,
      description: this.formGroup.get('description').value,
      location: this.formGroup.get('location').value,
      key_cutter_connection: this.formGroup.get('key_cutter_connection').value,
    }
    this.isLoading = true;
    const request = this.backendService.putAccountKiosk(this.accountId, this.itemId, value);
    try {
      const response: any = await lastValueFrom(request);
      this.name = value.name;
      this.modifyItemEvent.emit();
      this.isVisible = false;
    } catch (e) {

    }
    this.isLoading = false;
  }

  close(): void {
    this.isVisible = false;
  }

  onDetailClick(): void {
    this.router.navigate(['account', this.accountId, 'kiosk', 'detail', this.itemId]);
  }

}
