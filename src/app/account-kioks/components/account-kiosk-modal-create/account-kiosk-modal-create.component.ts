import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {BackendService} from "../../../services/backend.service";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-account-kiosk-modal-create',
  templateUrl: './account-kiosk-modal-create.component.html',
  styleUrls: ['./account-kiosk-modal-create.component.sass']
})
export class AccountKioskModalCreateComponent implements OnInit {

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
  }

  initForm() {
    this.formGroup = this.fb.group({
      name: [''],
      description: [''],
    });
  }

  resetForm() {
    this.formGroup.get('name').setValue('');
    this.formGroup.get('description').setValue('');
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
      const value = {
        name: this.formGroup.get('name').value,
        description: this.formGroup.get('description').value,
        location: {},
        key_cutter_connection: "",
        property_ids: []
      }
      const request = this.backendService.postAccountKiosk(this.accountId, value);
      const response = await firstValueFrom(request);
      this.createItemEvent.emit();
      this.close();
    } catch (e) {

    }
    this.isLoading = false;
  }


}
