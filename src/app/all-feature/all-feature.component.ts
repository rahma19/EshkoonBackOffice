import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateCardComponent } from '../create-card/create-card.component';
import { CardsService } from 'app/services/cards.service';
import { Subscription } from 'rxjs';
import { DeleteFeatureComponent } from 'app/delete-feature/delete-feature.component';
import { CreateFeatureComponent } from 'app/create-feature/create-feature.component';
import { OrderService } from 'app/services/order.service';

@Component({
  selector: 'app-all-feature',
  templateUrl: './all-feature.component.html',
  styleUrls: ['./all-feature.component.css']
})
export class AllFeatureComponent implements OnInit {

  features:any[]=[];
  searchText = '';
  filteredData: any[] = [];
  
  serviceSubscribe:Subscription = new Subscription();
path='https://backend.e-shkoon.com/uploads/features/';
isLoading=true
  constructor(private orderService : OrderService,public dialog: MatDialog) {
    setTimeout(() => {
      this.isLoading = false; // Set isLoading to false when loading is complete
    }, 1000);
   }

  filterData() {
    this.filteredData = this.features.filter(item => {
      // Return true if the item matches the search text
      return item?.name.toLowerCase().includes(this.searchText.toLowerCase())
    });
  }

  ngOnInit() {
    this.orderService.getFeatures().subscribe((res:any)=>{
    })
    this.orderService.getFeatures();
    this.serviceSubscribe = this.orderService.features$.subscribe((res:any) => {
      this.features = res;    
      this.filteredData=res;   
    })
  }

  add() {    
    const dialogRef = this.dialog.open(CreateFeatureComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
    })
  }

  delete(id: any) {
    const dialogRef = this.dialog.open(DeleteFeatureComponent, {
      width: '400px',
      data: {featureId:id}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // this.orderService.deletemenuType(id);
      }
    });
  }

}

