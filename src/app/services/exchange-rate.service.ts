import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { webSocket } from "rxjs/webSocket";

@Injectable({
  providedIn: 'root'
})
export class ExchangeRateService {

  public invokeEvent:Subject<any> = new Subject();

  constructor(private http: HttpClient) { }

public getExchangeRateData(){
  console.log("STARTED - getExchangeRateData");
  let url = "http://";
  console.log("Sending request to load data");

  const requestOptions = {
    headers: new HttpHeaders()
    //headers: new HttpHeaders().append("Authorization", authValue)
  }
  this.http.get(url, requestOptions).pipe().subscribe((response:any) =>{
    console.log("");
  })
}

callAndStartUpstoxMarketWebsocket() {
  console.log("STARTED - callAndStartUpstoxMarketWebsocket");
  let url = "http://localhost:8080/trade/startUpstoxWebSocketServer";
  console.log("Sending request to callAndStartUpstoxMarketWebsocket");
  this.http.get(url).pipe().subscribe((response:any) =>{
    console.log("callAndStartUpstoxMarketWebsocket Response : " + response);
  })
}

async callAndStopUpstoxMarketWebsocket() {
  console.log("STARTED - callAndStopUpstoxMarketWebsocket");
  let url = "http://localhost:8080/trade/stopUpstoxWebSocketServer";
  console.log("Sending request to callAndStopUpstoxMarketWebsocket");
  this.http.get(url).pipe().subscribe((response:any) =>{
    console.log("callAndStopUpstoxMarketWebsocket Response : " + response);
  })
}

async getListOfInstruments() {
  console.log("STARTED - getListOfInstruments");
  let url = "http://localhost:8080/trade/getListOfInstruments";
  console.log("Sending request to getListOfInstruments");
  this.http.get(url).pipe().subscribe((response:any) =>{
    console.log("getListOfInstruments Response : {}", response);
  })
}

connectToWebSocket(){
  const subject = webSocket('ws://localhost:8887');

  subject.subscribe({
    next: msg => {
      //console.log('message received: ' + msg)

      this.invokeEvent.next(msg);
    }, // Called whenever there is a message from the server.
    error: err => console.log(err), // Called if at any point WebSocket API signals some kind of error.
    complete: () => console.log('complete') // Called when connection is closed (for whatever reason).
  });
}



}
