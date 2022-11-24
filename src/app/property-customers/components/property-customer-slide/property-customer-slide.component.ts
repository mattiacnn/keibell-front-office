import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {lastValueFrom} from "rxjs";
import {FormBuilder} from "@angular/forms";
import {BackendService} from "src/app/services/backend.service";

@Component({
  selector: 'app-property-customer-slide',
  templateUrl: './property-customer-slide.component.html',
  styleUrls: ['./property-customer-slide.component.sass']
})
export class PropertyCustomerSlideComponent implements OnInit {

  accountId;
  propertyid;
  itemId;
  isVisible = false;
  isLoading = false;
  name = "Test";
  formGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly backendService: BackendService,
  ) { }

  ngOnInit(): void {
    this.initFormGroup();
  }

  initFormGroup(): void {
    this.formGroup = this.fb.group({
      name: [{value: '', disabled: true}],
      surname: [{value: '', disabled: true}],
      email: [{value: '', disabled: true}],
      phone: [{value: '', disabled: true}],
    });
  }

  cleanValue(): void {
    this.name = "";
    this.formGroup.get('name').setValue('');
    this.formGroup.get('surname').setValue('');
    this.formGroup.get('email').setValue('');
    this.formGroup.get('phone').setValue('');
  }

  setValuesFormByResponse(response): void {
    this.name = response.name;
    this.formGroup.get('name').setValue(response.name);
    this.formGroup.get('surname').setValue(response.surname);
    this.formGroup.get('email').setValue(response.email);
    this.formGroup.get('phone').setValue(response.phone);
  }

  async open(customer): Promise<void> {
    this.isLoading = true;
    this.isVisible = true;
    this.cleanValue();
    this.setValuesFormByResponse(customer);
    this.isLoading = false;
  }

  close(): void {
    this.isVisible = false;
  }

}
