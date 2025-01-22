import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-auth-redirect',
  imports: [],
  templateUrl: './auth-redirect.component.html',
  styleUrl: './auth-redirect.component.scss'
})
export class AuthRedirectComponent implements OnInit{

  isCodevalue: boolean = false;
  codeValue: any;
  accessToken: any;

  constructor(private route: ActivatedRoute, private authenticationService : AuthenticationService, private router:Router){

  }

  ngOnInit(): void{
    if(this.route.snapshot.queryParamMap.get('code')){
      this.isCodevalue = true;
      this.codeValue = this.route.snapshot.queryParamMap.get('code');
      console.log('Code Value -> ' + this.codeValue);
      this.authenticationService.getAuthTokenUsingApi(this.codeValue);
      this.router.navigateByUrl('/trade-data');
    }else{
      console.log("2nd Redirect -> " + this.route.snapshot.queryParamMap);
    }
  }
}
