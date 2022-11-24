import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {GlobalVariablesService} from './services/global-variables.service';
import {InternationalizationService} from './services/internationalization.service';
import {BackendService} from "./services/backend.service";
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements AfterViewInit, OnInit {

  isList: number;
  isMenu: boolean = false;
  isSearch: boolean = false;

  constructor(
    private readonly internationalizationService: InternationalizationService,
    public readonly globalVariablesService: GlobalVariablesService,
    private readonly titleService: Title,
    private readonly backendService: BackendService,
    private readonly authService: AuthService,
  ) {
  }

  ngOnInit(): void {

    const language = this.authService.k_store && this.authService.k_store['profileSettings'] && this.authService.k_store['profileSettings']['language'] ? this.authService.k_store['profileSettings']['language'].language : 'private-es';
    this.internationalizationService.changeCurrentLanguage(language);
    this.titleService.setTitle('Keibell');
  }

  ngAfterViewInit(): void {
  }
}
