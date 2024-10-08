import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "/login",
    pathMatch: "full",
  },
  {
    path: "login",
    loadComponent: () =>
      import("./modules/auth/login/login.component").then((m) => m.LoginComponent),
  },
  {
    path: "dashboard",
    loadComponent: () =>
      import("./modules/dashboard/dashboard.component").then((m) => m.DashboardComponent),
  },
];
