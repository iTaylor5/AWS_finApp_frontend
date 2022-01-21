import { Routes } from "@angular/router";
import { AccountsComponent } from "src/app/pages/accounts/accounts.component";
import { CategoriesComponent } from "src/app/pages/categories/categories.component";
import { GraphComponent } from "src/app/pages/graph/graph.component";
import { MembersComponent } from "src/app/pages/members/members.component";
import { SettingsComponent } from "src/app/pages/settings/component/settings.component";
import { SubmitTransactionComponent } from "src/app/pages/submit-transaction/submit-transaction.component";
import { TransactionsComponent } from "src/app/pages/transactions/transactions.component";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
// import { IconsComponent } from "../../pages/icons/icons.component";
// import { MapComponent } from "../../pages/map/map.component";
// import { NotificationsComponent } from "../../pages/notifications/notifications.component";
// import { UserComponent } from "../../pages/user/user.component";
// import { TablesComponent } from "../../pages/tables/tables.component";
// import { TypographyComponent } from "../../pages/typography/typography.component";
// import { RtlComponent } from "../../pages/rtl/rtl.component";

export const AdminLayoutRoutes: Routes = [
  { path: "submitTransaction", component: SubmitTransactionComponent },
  { path: "dashboard", component: DashboardComponent },
  { path: "transactions", component: TransactionsComponent },
  { path: "members", component: MembersComponent },
  // { path: "settings", component: SettingsComponent },
  { path: "categories", component: CategoriesComponent },
  { path: "accounts", component: AccountsComponent },
  { path: "members", component: MembersComponent },
  //   { path: "maps", component: MapComponent },
  //   { path: "notifications", component: NotificationsComponent },
  //   { path: "user", component: UserComponent },
  //   { path: "tables", component: TablesComponent },
  //   { path: "typography", component: TypographyComponent },
  // { path: "rtl", component: RtlComponent }
];
