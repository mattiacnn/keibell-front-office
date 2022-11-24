import { EventEmitter, Injectable } from '@angular/core';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import { es_ES, en_US, ar_EG, NzI18nService } from 'ng-zorro-antd/i18n';
import {L10n, setCulture} from '@syncfusion/ej2-base';
import {firstValueFrom} from "rxjs";

export const LANGUAGE_OPTION_TYPES = {
  spanish: {
    customTranslate: 'private-es',
    translateLanguage: 'LANGUAGES.SPANISH',
  },
  english: {
    customTranslate: 'private-en',
    translateLanguage: 'LANGUAGES.ENGLISH',
  },
};

@Injectable({
  providedIn: 'root'
})
export class InternationalizationService {

  constructor(
    private readonly translateService: TranslateService,
    private readonly nzI18nService: NzI18nService
  ) {
    this.translateService.addLangs(['private-en', 'private-es']);
  }


  getCurrentLanguage(): string {
    return this.translateService.currentLang;
  }

  changeCurrentLanguage(value: string): void {
    this.translateService.use(value);
    switch(value) {
      case 'private-es':
        this.nzI18nService.setLocale(es_ES);
        setCulture('es');
        break;
      case 'private-en':
        this.nzI18nService.setLocale(en_US);
        setCulture('en');
        break;
    }
  }

  getLangChangeEvent(): EventEmitter<LangChangeEvent> {
    return this.translateService.onLangChange;
  }

  async translate(key): Promise<string> {
    return await firstValueFrom(this.translateService.get(key));
  }


}
