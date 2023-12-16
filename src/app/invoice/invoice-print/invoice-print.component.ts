import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainServiceService } from 'src/app/main_service/main-service.service';

@Component({
  selector: 'invoice-print',
  templateUrl: './invoice-print.component.html',
  styleUrls: ['./invoice-print.component.scss']
})
export class InvoicePrintComponent implements OnInit {

  constructor(
    private _serviceService: MainServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  invoice_detail: [] = [];
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {

      const data = JSON.parse(params['data']); // แปลงค่า data จาก string เป็น object
      const id = data.id; // ดึงค่า id จาก object data

      this._serviceService.get_data_print(id).subscribe((response: any) => {
        this.invoice_detail = response.result.response.data;
        for (let index = 0; index < this.invoice_detail.length; index++) {
          const element = this.invoice_detail[index];
          if (element['name_select_id'] == '1') {
            document.title = 'ใบเสนอราคา_' + element['invoice_code'];
          }
          else if (element['name_select_id'] == '2') {
            document.title = 'ใบแจ้งหนี/วางบิล_' + element['invoice_code'];
          }
        }
        setTimeout(() => {
          window.print(); // ทำการพิมพ์หลังจากที่ข้อมูลแสดงผลครบทั้งหมด
        }, 500);
      });

    });
  }

}
