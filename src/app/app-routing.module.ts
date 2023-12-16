import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InvoiceSearchComponent } from './invoice/invoice-search/invoice-search.component';
import { InvoicePrintComponent } from './invoice/invoice-print/invoice-print.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'invoice-search', component: InvoiceSearchComponent},
  { path: 'invoice-print', component: InvoicePrintComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
