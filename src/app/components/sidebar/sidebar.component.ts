import { Component, OnInit } from '@angular/core';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  {
    path: "/submitTransaction",
    title: "Submit Transaction",
    icon: "icon-send",
    class: ""
  },
  {
    path: "/dashboard",
    title: "Dashboard",
    icon: "icon-chart-pie-36",
    class: ""
  },
  {
    path: "/transactions",
    title: "Transactions",
    icon: "icon-atom",
    class: ""
  },
  {
    path: "/categories",
    title: "Categories",
    icon: "icon-pin",
    class: ""
  },
  {
    path: "/accounts",
    title: "Accounts",
    icon: "icon-align-center",
    class: ""
  },
  {
    path: "/members",
    title: "Members",
    icon: "icon-bell-55",
    class: ""
  },

  {
    path: "/user",
    title: "User Profile",
    icon: "icon-single-02",
    class: ""
  },
  // {
  //   path: "/settings",
  //   title: "Settings",
  //   icon: "icon-puzzle-10",
  //   class: ""
  // },
  {
    path: "/notifications",
    title: "Scheduled Payments",
    icon: "icon-bell-55",
    class: ""
  },
  // {
  //   path: "/typography",
  //   title: "Typography",
  //   icon: "icon-align-center",
  //   class: ""
  // },
  // {
  //   path: "/rtl",
  //   title: "Nothing",
  //   icon: "icon-world",
  //   class: ""
  // }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit(): void {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }

}
