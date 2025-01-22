
import { Component } from '@angular/core';
import { ExchangeRateService } from '../services/exchange-rate.service';
import { AgGridAngular } from 'ag-grid-angular';
import type { ColDef, GetRowIdFunc, GetRowIdParams, GridApi, GridReadyEvent, RowSelectionOptions } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { MatTabsModule } from '@angular/material/tabs';
ModuleRegistry.registerModules([AllCommunityModule]);

// Row Data Interface
interface IRow {
  feedType: string;
	exchangeName: string;
	instrumentType: string;
	instrumentName: string;
  instrumentId: string;
  yh: number;
	yl: number;
	ltp: number;
	ltt: number;
	ltq: number;
	cp: number;
}

@Component({
  selector: 'app-trade-ui',
  imports: [AgGridAngular, MatTabsModule],
  standalone: true,
  templateUrl: './trade-ui.component.html',
  styleUrl: './trade-ui.component.scss',
  providers: [
    { provide: 'isBrowser', useValue: true }
  ]
})
export class TradeUiComponent {

  constructor(private exchangeRateService: ExchangeRateService){
    this.exchangeRateService.getListOfInstruments();
    console.log('Hello From Trade UI');
    this.exchangeRateService.invokeEvent.subscribe({
      next: msg => {
        //console.log('message received in TradeUI Component : ' + msg)
        this.updateDataInsideGridFromList1(msg);
      }, // Called whenever there is a message from the server.
      error: err => console.log(err), // Called if at any point WebSocket API signals some kind of error.
      complete: () => console.log('complete') // Called when connection is closed (for whatever reason).
    });
//    this.rowData = [
//      { feedType: "Index", exchangeName: "NSE", instrumentType: "Index", instrumentName: "Nifty 50", instrumentId: "NSE_INDEX|Nifty 50", yh: 0, yl: 0, ltp: 0, ltt: 0, ltq: 0, cp:0 },
//      { feedType: "Index", exchangeName: "BSE", instrumentType: "Index", instrumentName: "Bank Nifty", instrumentId: "NSE_INDEX|Nifty Bank", yh: 0, yl: 0, ltp: 0, ltt: 0, ltq: 0, cp:0 },
//     ];
  }
  private gridApi!: GridApi;
  public rowSelection: RowSelectionOptions | "single" | "multiple" = {
    mode: "singleRow",
    checkboxes: false,
    enableClickSelection: true,
  };
// Row Data: The data to be displayed.
  rowData: IRow[] = [];
  public getRowId: GetRowIdFunc = (params: GetRowIdParams) =>
    String(params.data.instrumentId);

  // Column Definitions: Defines & controls grid columns.
  colDefs: ColDef<IRow>[] = [
    { field: "feedType",
      headerName: "Feed Type",
      width: 100
     },
    { field: "exchangeName",
      headerName: "Exchange Name",
      width: 140
     },
    { field: "instrumentType",
      headerName: "Instrument Type",
      width: 140
     },
    { field: "instrumentName",
      headerName: "Instrument Name",
      sortable: true,
      sort: "asc",
      width: 200
     },
    { field: "yh",
      headerName: "Year High",
      width: 100,
      //enableCellChangeFlash: true
      cellRenderer: "agAnimateShowChangeCellRenderer"
     },
    { field: "yl",
      headerName: "Year Close",
      width: 100,
      //enableCellChangeFlash: true
      cellRenderer: "agAnimateShowChangeCellRenderer"
     },
    { field: "ltp",
      headerName: "Last Traded\n Price",
      width: 130,
      //enableCellChangeFlash: true
      cellRenderer: "agAnimateShowChangeCellRenderer"
     },
    { field: "ltq",
      headerName: "Last Traded\n Quantity",
      width: 130,
      //enableCellChangeFlash: true
      cellRenderer: "agAnimateShowChangeCellRenderer"
     },
    { field: "cp",
      headerName: "Closing Price",
      width: 130,
      //enableCellChangeFlash: true
      cellRenderer: "agAnimateShowChangeCellRenderer"
     }
  ];

  defaultColDef: ColDef = {
    width: 170
  };

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }

  async clickButton(){
   // this.updateDataInsideGrid();
    await this.exchangeRateService.callAndStartUpstoxMarketWebsocket();
    this.exchangeRateService.connectToWebSocket();
  }

  updateDataInsideGrid(){
    let dataVAlue = { feedType: "Index", exchangeName: "NSE", instrumentType: "Index", instrumentName: "Nifty 50", instrumentId: "12345", yh: 1, yl: 1, ltp: 1.99, ltt: 1, ltq: 1, cp:1 };
    const rowNode = this.gridApi.getRowNode(dataVAlue.instrumentId)!;
    if(rowNode == undefined){
      this.rowData.push(dataVAlue);
    }else{
      rowNode.updateData(dataVAlue);
    }
  }

  updateDataInsideGridFromList1(msg: IRow[]){
    msg.forEach(element => {
      const rowNode = this.gridApi.getRowNode(element.instrumentId)!;
      if(rowNode === undefined) {
        this.rowData.push(element);
      }else {
        rowNode.updateData(element);
      }
   });
   this.gridApi.setGridOption("rowData", this.rowData);
   }

  closeButton(){
    this.exchangeRateService.callAndStopUpstoxMarketWebsocket();
  }

}
