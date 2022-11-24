import {BackendService} from "./services/backend.service";

declare var require: any

import {AppRoutingModule} from './app-routing.module';

// Static Components
import {AppComponent} from './app.component';
import {NavbarComponent} from './static-components/navbar/navbar.component';
import {SidebarComponent} from './static-components/sidebar/sidebar.component';

// NGX Translate
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';

// Angular
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

// NG-ZORRO
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzAvatarModule} from 'ng-zorro-antd/avatar';
import {IconDefinition} from '@ant-design/icons-angular';
import {AccountBookFill, AlertFill, AlertOutline} from '@ant-design/icons-angular/icons';
import {NzSpinModule} from 'ng-zorro-antd/spin';

import {L10n, setCulture} from '@syncfusion/ej2-base';
import {loadCldr} from '@syncfusion/ej2-base';
import {firstValueFrom} from "rxjs";
import {LoginModalModule} from "./components/login-modal/login-modal.module";
import {Router} from "@angular/router";
import {AuthService} from "./services/auth.service";
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {ProfileSettingsModalModule} from "./components/profile-settings-modal/profile-settings-modal.module";

loadCldr(
  require('cldr-data/supplemental/numberingSystems.json'),

  /* Spanish */
  require('cldr-data/main/es/numbers.json'),
  require('cldr-data/main/es/ca-gregorian.json'),
  require('cldr-data/main/es/numbers.json'),
  require('cldr-data/main/es/timeZoneNames.json'),

  /* English */
  require('cldr-data/main/en/numbers.json'),
  require('cldr-data/main/en/ca-gregorian.json'),
  require('cldr-data/main/en/numbers.json'),
  require('cldr-data/main/en/timeZoneNames.json'),
);

L10n.load({
  'es': {
    'schedule': {
      'today': 'Hoy',
    },
  }
});

const icons: IconDefinition[] = [
  AccountBookFill,
  AlertOutline,
  AlertFill
];


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModalModule,
    // ANGULAR
    HttpClientModule,
    BrowserAnimationsModule,
    // NG-ZORRO
    NzMenuModule,
    NzAvatarModule,
    NzIconModule.forRoot(icons),
    NzSpinModule,
    NzDropDownModule,
    // TRANSLATE
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    ProfileSettingsModalModule,
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {
      provide: APP_INITIALIZER,
      useFactory: (backendService: BackendService, authService: AuthService) => async () => {
        await authService.checkLogin();
        return;
      },
      deps: [
        BackendService,
        AuthService,
      ],
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}
