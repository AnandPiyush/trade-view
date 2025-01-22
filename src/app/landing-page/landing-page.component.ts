import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';

interface UserIdValue{
  userId:string;
  userValue:string;
}

@Component({
  selector: 'app-landing-page',
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent implements OnInit{

userDetails : UserIdValue[] = [
  {userId: 'Piyush', userValue: 'Test1'},
  {userId: 'Piyush2', userValue: 'Test2'}
]

constructor (private router:Router, private authService: AuthenticationService){

}
  ngOnInit(): void {
    let isTokenAlive: boolean = this.authService.checkTokenAccess();
    if(isTokenAlive){
      this.router.navigateByUrl('/trade-data');
    }
  }

//newLink: string = "https://api.upstox.com/v2/login/authorization/dialog?response_type=code&client_id=ea3a2eae-f3f7-4d00-b031-d596663f5923&redirect_uri=http%3A%2F%2F";
newLink: string = "https://api.upstox.com/v2/login/authorization/dialog?response_type=code&client_id=09557f06-fd98-460a-8dc4-bfde0f66f6ff&redirect_uri=http%3A%2F%2Flocalhost:4200%2Fre-direct";
//newLink: string = "https://api.upstox.com/v2/login/authorization/dialog?response_type=code&client_id=09557f06-fd98-460a-8dc4-bfde0f66f6ff&redirect_uri=http%3A%2F%2Flocalhost:4200%2Flogin%2Fre-direct&state=RnJpIERlYyAxNiAyMDIyIDE1OjU4OjUxIEdNVCswNTMwIChJbmRpYSBTdGFuZGFyZCBUaW1lKQ%3D%3D";

}
