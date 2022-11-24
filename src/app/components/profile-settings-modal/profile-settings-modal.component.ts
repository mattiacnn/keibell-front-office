import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors} from "@angular/forms";
import {BackendService} from "../../services/backend.service";
import {firstValueFrom} from "rxjs";
import {AuthService} from "../../services/auth.service";
import {InternationalizationService, LANGUAGE_OPTION_TYPES} from "../../services/internationalization.service";

interface IMenuItem {
  icon: string;
  title: string;
  hidden: boolean;
}

export const MENU_ITEM_TYPES = {
  PROFILE: 1,
  THEME: 2,
  LANGUAGES: 3,
  API_KEYS: 4,
};

@Component({
  selector: 'app-profile-settings-modal',
  templateUrl: './profile-settings-modal.component.html',
  styleUrls: ['./profile-settings-modal.component.sass']
})
export class ProfileSettingsModalComponent implements OnInit {

  isVisible = false
  loading = false;
  selectedMenuItem = this.MenuItemType.LANGUAGES;

  // Profile
  changePasswordFormGroup: FormGroup;

  // Language
  selectedLanguage = null;

  // Modal Info
  isVisibleErrorModalInfo = false;
  titleErrorModalInfo = '';
  contentErrorModalInfo = '';
  iconTypeModalInfo = '';
  iconThemeModalInfo = '';
  iconTwotoneColorModalInfo = '';

  readonly menuItems: [number, IMenuItem][] = [
    [this.MenuItemType.PROFILE, {
      icon: 'user',
      title: 'PREFERENCES_MODAL.PROFILE.TITLE',
      hidden: false,
    }],
    [this.MenuItemType.LANGUAGES, {
      icon: 'translation',
      title: 'PREFERENCES_MODAL.LANGUAGES.TITLE',
      hidden: false,
    }],
  ];

  constructor(
    private readonly fb: FormBuilder,
    private readonly backendService: BackendService,
    private readonly authService: AuthService,
    private readonly internationalizationService: InternationalizationService,
  ) {
  }

  ngOnInit(): void {
    this.initForms();
  }

  initForms(): void {
    this.initChangePasswordForm();
  }

  open() {
    this.resetChangePasswordForm();
    this.selectedMenuItem = this.MenuItemType.PROFILE;
    this.loadProfileSettings();
    this.isVisible = true;
  }

  loadProfileSettings() {
    try {
      const profileSettings = this.authService.k_store['profileSettings'];
      console.log(profileSettings);
      if (profileSettings) {
        if (profileSettings['language']) {
          this.selectedLanguage = profileSettings['language'].language;
        } else {
          this.selectedLanguage = LANGUAGE_OPTION_TYPES.spanish.customTranslate;
        }
      } else {
        this.selectedLanguage = LANGUAGE_OPTION_TYPES.spanish.customTranslate;
      }
      console.log(this.selectedLanguage);
    } catch (e) {

    }
  }

  initChangePasswordForm(): void {
    this.changePasswordFormGroup = this.fb.group({
      newPassword: [''],
      repeatPassword: [''],
    }, {
      validators: this.repeatPasswordValidator.bind(this),
    });
  }

  resetChangePasswordForm() {
    this.changePasswordFormGroup.get('newPassword').setValue('');
    this.changePasswordFormGroup.get('repeatPassword').setValue('');
  }

  get MenuItemType() {
    return MENU_ITEM_TYPES;
  }

  ngClassMenuActiveJson(id): any {
    return {
      'selected-menu-item': id == this.selectedMenuItem,
    };
  }

  changeSelectedMenuItem(id): void {
    this.selectedMenuItem = id;
  }

  async savePasswordOnClick(): Promise<void> {
    this.loading = true;
    try {
      await this.requestChangePassword({
        new_password: this.changePasswordFormGroup.get('newPassword').value,
      })
    } catch (e) {
      this.titleErrorModalInfo = 'PREFERENCES_MODAL.PROFILE.ERROR_SAVE_PASSWORD_MODAL.TITLE';
      this.contentErrorModalInfo = 'PREFERENCES_MODAL.PROFILE.ERROR_SAVE_PASSWORD_MODAL.CONTENT';
      this.iconTypeModalInfo = 'close-circle';
      this.iconThemeModalInfo = 'twotone';
      this.iconTwotoneColorModalInfo = '#ff0000';
      this.isVisibleErrorModalInfo = true;
    }
    this.loading = false;
  }

  async requestChangePassword(value): Promise<void> {
    const request = this.backendService.changePassword(value);
    await firstValueFrom(request);
  }

  getLanguageOptions(): any[] {
    const languages = [];
    for (let key in LANGUAGE_OPTION_TYPES) {
      const language = {
        customTranslate: LANGUAGE_OPTION_TYPES[key].customTranslate,
        translateLanguage: LANGUAGE_OPTION_TYPES[key].translateLanguage,
      }
      languages.push(language);
    }
    return languages;
  }

  async selectedLanguageOnChange(): Promise<void> {
    this.loading = true;
    try {
      this.internationalizationService.changeCurrentLanguage(this.selectedLanguage);
      await this.requestPutKeyStoreLanguage(this.selectedLanguage);
    } catch (e) {
      console.log(e);
    }
    this.loading = false;
  }

  async requestPutKeyStoreLanguage(language: string): Promise<void> {
    const k_store_profileSettings = this.authService.k_store['profileSettings'] ? {...this.authService.k_store['profileSettings']} : {};
    k_store_profileSettings['language'] = {language};
    const request = this.backendService.putKeyStore('profileSettings', k_store_profileSettings);
    await firstValueFrom(request);
    this.internationalizationService.changeCurrentLanguage(language);
    this.authService.k_store['profileSettings'] = k_store_profileSettings;
  }

  modalCancel(): void {
    this.isVisible = false;
  }

  // Validators
  private repeatPasswordValidator(control: AbstractControl): ValidationErrors | null {
    let isError = false;
    let error = {
      repeatPasswordError: {}
    };
    const value = control.get('repeatPassword').value;
    const newPasswordValue = control.get('newPassword').value;
    if (value != newPasswordValue) {
      isError = true;
      error.repeatPasswordError['notEqual'] = true;
    }
    return isError ? error : null;
  }

  getMessageRepeatPasswordError(): string[] {
    const message = [];
    if (!this.changePasswordFormGroup.errors || !this.changePasswordFormGroup.errors.repeatPasswordError) {
      return null;
    }
    if (this.changePasswordFormGroup.errors.repeatPasswordError.notEqual) {
      message.push('PREFERENCES_MODAL.PROFILE.REPEAT_PASSWORD_INPUT.NOT_EQUAL_ERROR');
    }
    return message;
  }

}
