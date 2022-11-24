import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-account-slide',
  templateUrl: './account-slide.component.html',
  styleUrls: ['./account-slide.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class AccountSlideComponent implements OnInit {

  name;
  id;
  isVisible = false;
  title: string;
  isLoading = false;
  formGroup: FormGroup;

  @Output() modifyItemEvent = new EventEmitter<any>();

  constructor(
    private readonly backendService: BackendService,
    private readonly fb: FormBuilder,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
    this.initFormGroup();
  }

  initFormGroup(): void {
    this.formGroup = this.fb.group({
      id: [''],
      name: [''],
      description: ['']
    });
  }

  cleanValue(): void {
    this.name = "";
    this.formGroup.get('name').setValue('');
    this.formGroup.get('description').setValue('');
  }

  setValuesFormByResponse(responseBody): void {
    this.name = responseBody.name;
    this.formGroup.get('name').setValue(responseBody.name);
    this.formGroup.get('description').setValue(responseBody.description);
  }

  async open(id): Promise<void> {
    this.isLoading = true;
    this.isVisible = true;
    this.cleanValue();
    this.id = id;
    const request = this.backendService.getAccounts(id);
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
      description: this.formGroup.get('description').value,
    }
    this.isLoading = true;
    const request = this.backendService.putAccounts(this.id, value);
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
    this.router.navigate(['account', 'detail', this.id]);
  }

}
