import {Component, OnInit, ViewChild} from '@angular/core';
import {GlobalVariablesService} from 'src/app/services/global-variables.service';
import {AuthService} from "../../services/auth.service";
import {ProfileSettingsModalComponent} from "../../components/profile-settings-modal/profile-settings-modal.component";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {

  @ViewChild(ProfileSettingsModalComponent) profileSettingsModalComponent: ProfileSettingsModalComponent;

  constructor(
    public readonly globalVariablesService: GlobalVariablesService,
    public readonly authService: AuthService,
  ) {
  }

  ngOnInit(): void {

  }

  onClickVisibleSidebar(value: boolean): void {
    this.globalVariablesService.isVisibleSidebar = value;
  }

  async onClickLogout(): Promise<void> {
    this.authService.logout();
  }

  async onClickProfile(): Promise<void> {
    this.profileSettingsModalComponent.open();
  }

}
