import {Component, OnInit} from '@angular/core';
import {BillService} from '../_services/bill.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  types = ['Struja', 'Voda', 'Plin', 'Pričuva', 'Odvoz smeća', 'Komunalac', 'HRT', 'Telekomunikacije'];
  typeValue = ['power', 'water', 'gas', 'reservation', 'trash', 'communal', 'hrt', 'telecom'];
  billsData = [];
  selectedType = 'gas';
  totalCost = [];

  constructor(private billService: BillService) { }

  ngOnInit(): void {
    this.typeValue.forEach((type) => {
      this.billService.getAll(type).subscribe((bills) => {
        this.billsData.push(bills);
        let sum = 0;
        bills.forEach((bill) => {
          sum += +bill.cost;
        });
        this.totalCost.push(sum);
      });
    });
  }
}
