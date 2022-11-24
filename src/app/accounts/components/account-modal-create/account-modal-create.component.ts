import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-account-modal-create',
  templateUrl: './account-modal-create.component.html',
  styleUrls: ['./account-modal-create.component.sass']
})
export class AccountModalCreateComponent implements OnInit {

  @Output() createItemEvent = new EventEmitter<any>();
  isVisible = false;
  formGroup: FormGroup;
  isLoading = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly backendService: BackendService,
  ) { }

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

  open(): void {
    this.resetForm();
    this.isVisible = true;
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
      }
      const request = this.backendService.postAccount(value);
      const response = await firstValueFrom(request);
      this.isVisible = false;
      this.createItemEvent.emit();
    } catch (e) {

    }
    this.isLoading = false;
  }

}
