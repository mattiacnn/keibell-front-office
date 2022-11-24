import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {BackendService} from "../../../services/backend.service";
import {firstValueFrom} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-property-resources-slide',
  templateUrl: './property-resources-slide.component.html',
  styleUrls: ['./property-resources-slide.component.sass']
})
export class PropertyResourcesSlideComponent implements OnInit {

  isVisible = false;
  loading = false;
  name = '';
  formGroup: FormGroup;
  accountId;
  propertyId;
  itemId;

  constructor(
    private readonly backendService: BackendService,
    private readonly router: Router,
    private readonly fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formGroup = this.fb.group({
      name: [{value: '', disabled: true}],
      status: [{value: '', disabled: true}],
    });
  }

  cleanValue() {
    this.formGroup.get('name').setValue('');
    this.formGroup.get('status').setValue('');
  }

  setValueByResponse(response: any) {
    console.log(response);
    this.name = response.name;
    this.formGroup.get('name').setValue(response.name);
    this.formGroup.get('status').setValue(response.status);
  }

  close(): void {
    this.isVisible = false;
  }

  async open(accountId, propertyId, id): Promise<void> {
    this.accountId = accountId;
    this.propertyId = propertyId;
    this.itemId = id;
    this.cleanValue();
    this.loading = true;
    this.isVisible = true;
    try {
      const request = this.backendService.getAccountPropertyResources(this.accountId, this.propertyId, this.itemId);
      const response: any = await firstValueFrom(request);
      this.setValueByResponse(response.body);
    } catch (e) {
      this.isVisible = false;
      console.log(e);
    }
    this.loading = false;
  }

  onDetailClick() {
    this.router.navigate(['account', this.accountId, 'property', this.propertyId, 'resource', 'detail', this.itemId]);
  }
}
