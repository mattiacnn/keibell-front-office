import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';


interface SidebarSubmenu {
  key: string,
  icon: string;
  label: string;
  items: (SidebarItem | SidebarSubmenu)[];
  isOpen: boolean;
  type: 'submenu';
  parent?: SidebarSubmenu;
  level: number;
}

interface SidebarItem {
  key: string,
  label: string;
  funcCondition?: () => boolean;
  routerLink: string;
  queryParams?: any;
  routes: string[];
  type: 'item';
  parent?: SidebarSubmenu;
  level: number;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass'],
})
export class SidebarComponent implements OnInit {

  readonly sidebarStructure: SidebarSubmenu[] = [];
  readonly submenus: SidebarSubmenu[] = [
    {
      key: 'test',
      icon: 'lock',
      label: 'SIDEBAR.SUBMENUS.TEST',
      isOpen: false,
      type: 'submenu',
      items: [],
      level: 1,
    },
  ];
  readonly items: SidebarItem[] = [
    {
      label: 'SIDEBAR.ITEMS.ACCOUNT',
      routerLink: 'account/browser',
      routes: ['/account'],
      type: 'item',
      key: 'account',
      level: 1,
    },
    {
      label: 'SIDEBAR.ITEMS.RESERVATION',
      routerLink: 'reservation/browser',
      routes: ['/reservation'],
      type: 'item',
      key:'reservation',
      level: 1,
    },
    {
      label: 'SIDEBAR.ITEMS.KIOSK_ACTIVATION',
      routerLink: 'kiosk/browserActivation',
      routes: ['/kiosk/browserActivation'],
      type: 'item',
      key: 'kiosk-activation',
      level: 1,
    },
    {
      label: 'SIDEBAR.ITEMS.DASHBOARD',
      routerLink: 'dashboard',
      routes: ['/dashboard'],
      type: 'item',
      key: 'dashboard',
      level: 1,
    }
  ];
  currentUrl = '';

  constructor(
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.initSidebar();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentUrl = this.router.url;
        this.currentUrl = currentUrl;
        this.openMenuDependCurrentView();
      }
    });
  }

  getItemBykey(key: string): SidebarItem {
    return this.items.find(item => {
      return item.key === key;
    });
  }

  getSubmenuBykey(key: string): SidebarSubmenu {
    return this.submenus.find(submenu => {
      return submenu.key === key;
    });
  }

  initSidebar() {
    this.addSubmenu(this.getSubmenuBykey('test'));
    this.addItem(this.getItemBykey('reservation'), this.getSubmenuBykey('test'));
    this.addItem(this.getItemBykey('account'), this.getSubmenuBykey('test'));
    this.addItem(this.getItemBykey('kiosk-activation'), this.getSubmenuBykey('test'));
    this.addItem(this.getItemBykey('dashboard'), this.getSubmenuBykey('test'));
  }

  addItem(item: SidebarItem, parent: SidebarSubmenu) {
    item.parent = parent;
    item.level = parent.level + 1;
    parent.items.push(item);
  }

  addSubmenu(submenu: SidebarSubmenu, parent?: SidebarSubmenu) {
    if (parent) {
      submenu.parent = parent;
      submenu.level = parent.level + 1;
      parent.items.push(submenu);
    } else {
      this.sidebarStructure.push(submenu);
    }
  }

  getAllParents(item: SidebarItem | SidebarSubmenu): (SidebarItem | SidebarSubmenu)[] {
    let items: (SidebarItem | SidebarSubmenu)[] = [];
    if (item.parent) {
      items = [...this.getAllParents(item.parent), ...items, item.parent];
    }
    return items;
  }

  getAllChildren(value: SidebarSubmenu): (SidebarItem | SidebarSubmenu)[] {
    const values: (SidebarItem | SidebarSubmenu)[] = [];
    for (const item of this.items) {
      const allParents = this.getAllParents(item);
      const found = allParents.find((element) => {
        return element.key === value.key;
      });
      if (found) {
        values.push(item);
      }
    }
    for (const submenu of this.submenus) {
      const allParents = this.getAllParents(submenu);
      const found = allParents.find((element) => {
        return element.key === value.key;
      });
      if (found) {
        values.push(submenu);
      }
    }
    return values;
  }

  openHandler(value: SidebarItem | SidebarSubmenu): void {
    const exceptList: string[] = [value.key];
    for (const item of this.getAllParents(value)) {
      exceptList.push(item.key);
    }
    for (const item of this.items) {
      this.changeOpenAllParents(item, false, exceptList);
    }
  }

  changeOpenAllParents(item: SidebarItem | SidebarSubmenu, value: boolean, exceptList?: string[]): void {
    if (!item.parent) {
      return;
    }
    let findExceptList = null;
    if (exceptList) {
      findExceptList = exceptList.find((element) => {
        return element === item.parent.key;
      });
    }
    if (!findExceptList) {
      item.parent.isOpen = value;
      this.changeOpenAllParents(item.parent, value, exceptList);
    }
  }

  private openMenuDependCurrentView(): void {
    for (const item of this.items) {
      for (const route of item.routes) {
        if (this.currentUrl.startsWith(route)) {
          this.changeOpenAllParents(item, true);
        }
      }
    }
  }

  showSubMenu(submenu: SidebarSubmenu): boolean {
    for (const item of this.getAllChildren(submenu)) {
      if (item.type === 'item' && (!item.funcCondition || item.funcCondition())) {
        return true;
      }
    }
    return false;
  }

  isSelectedItem(item) {
    for (const route of item.routes) {
      if (this.currentUrl.startsWith(route)) {
        return true;
      }
    }
    return false;
  }

}
