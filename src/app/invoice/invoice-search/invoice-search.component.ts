import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainServiceService } from 'src/app/main_service/main-service.service';

@Component({
  selector: 'invoice-search',
  templateUrl: './invoice-search.component.html',
  styleUrls: ['./invoice-search.component.scss']
})
export class InvoiceSearchComponent implements OnInit{
  constructor(
    private _serviceService: MainServiceService,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this._serviceService.authenticate().subscribe((response: any) => {
    });

    this._serviceService.get_data("get_invoice").subscribe((response: any) => {
      // console.log(response.result.response);
      this.invoice_data = response.result.response.data;
    });

  }

  invoice_data: any[] = [];
  invoice_detail: any[] = [];
  id_report = ""
  onSelectedInvoice(forest_type: any): void {;
    // console.log(forest_type.target.value)
    this.id_report = forest_type.target.value
    this._serviceService.get_data_print(forest_type.target.value).subscribe((response: any) => {
      this.invoice_detail = response.result.response.data;
    });
  }

  goToReport() {
    const applicationData = {
      id: this.id_report,
    }
    const applicationDataString = JSON.stringify(applicationData);
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['/invoice-print'], { queryParams: { data: applicationDataString } })
    );

    window.open(url, '_blank');
  }

}
