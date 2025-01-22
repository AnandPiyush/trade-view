import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) {}

  getAuthTokenUsingApi(authCode: string) {
    console.log("STARTED - getAuthTokenFromApi");
    let url = "http://localhost:8080/trade/getAuthTokenFromApi?code=" + authCode;
    console.log("Sending request to getAuthTokenUsingApi");
    this.http.get(url).pipe().subscribe((response:any) =>{
      console.log("Token Response : " + response);
    })
  }

  checkTokenAccess(){
    console.log("STARTED - checkTokenAccess");
    let url = "http://localhost:8080/trade/checkToken";
    console.log("Sending request to checkTokenAccess");

    let isTokenAlive = false;
    this.http.get(url).pipe().subscribe((response:any) =>{
      console.log("Response : " + response);
      isTokenAlive = response;
    })
    return isTokenAlive;
  }
}
