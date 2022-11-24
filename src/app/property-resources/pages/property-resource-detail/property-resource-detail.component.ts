import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {BackendService} from "../../../services/backend.service";
import {firstValueFrom, forkJoin} from "rxjs";

@Component({
  selector: 'app-property-resource-detail',
  templateUrl: './property-resource-detail.component.html',
  styleUrls: ['./property-resource-detail.component.sass']
})
export class PropertyResourceDetailComponent implements OnInit {

  name = '';
  formGroup: FormGroup;
  itemId;
  accountId;
  propertyId;
  loading = false;
  disabledOpenDoor = true;

  isVisibleModalOpenDoor = false;
  nameResourceOpenDoorInput = "";

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly fb: FormBuilder,
    private readonly backendService: BackendService,
  ) { }

  async ngOnInit(): Promise<void> {
    this.loading = true;
    const routeParams = this.activatedRoute.snapshot.params;
    this.itemId = routeParams['id'];
    this.accountId = routeParams['accountId'];
    this.propertyId = routeParams['propertyId'];
    this.initForm();
    try {
      const request = forkJoin({
        resource: this.backendService.getAccountPropertyResources(this.accountId, this.propertyId, this.itemId),
        property: this.backendService.getAccountProperties(this.accountId, this.propertyId),
      });
      this.backendService.getPropertyResourcesLock(this.accountId, this.propertyId, this.itemId).subscribe( (response: any) => {
        this.disabledOpenDoor = response.body.status !== "Closed";
      });
      const response: any = await firstValueFrom(request);
      const responseBody = {
        resource: response.resource.body,
        property: response.property.body,
      }
      this.setFormByResponse(responseBody);
    } catch (e) {
      console.log(e);
    }
    this.loading = false;
  }

  initForm() {
    this.formGroup = this.fb.group({
      id: [{value: '', disabled: true}],
      name: [{value: '', disabled: true}],
    });
  }

  setFormByResponse(response) {
    console.log(response);
    this.name = response.resource.name;
    this.formGroup.get('name').setValue(response.resource.name);
    this.formGroup.get('id').setValue(response.resource.id);
  }

  onOpenDoorClick(): void {
    if (this.disabledOpenDoor) {
      return;
    }
    this.nameResourceOpenDoorInput = "";
    this.isVisibleModalOpenDoor = true;
  }

  closeModalOpenDoor(): void {
    this.isVisibleModalOpenDoor = false;
  }

  isDisabledAcceptOpenDoor(): boolean {
    return this.name !== this.nameResourceOpenDoorInput;
  }

  acceptModalOpenDoor() {
    if (this.isDisabledAcceptOpenDoor()) {
      return;
    }
    this.backendService.postPropertyResourcesLock(this.accountId, this.propertyId, this.itemId, {status: 'Opened'});
    this.isVisibleModalOpenDoor = false;
  }
}
