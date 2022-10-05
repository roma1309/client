import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { NotificationService } from 'src/app/service/notification.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  public loginForm!: FormGroup;

  constructor(
  private authService:AuthService,

  private tokenStorage:TokenStorageService,
  private notificationService:NotificationService,
  private router:Router,
  private fb:FormBuilder) {
    if(this.tokenStorage.getUser()){
      this.router.navigate(['main']);
    }
   }

  ngOnInit(): void {
    this.loginForm=this.createLoginForm();
  }

  createLoginForm():FormGroup{
    return this.fb.group({
      username:['',Validators.compose([Validators.required])],
      password:['',Validators.compose([Validators.required])]
      }
    )
  }

  submit():void{
    this.authService.login({
      username:this.loginForm.value.username,
      password:this.loginForm.value.password
    }).subscribe({next : (data) => {
      console.log(data);

      this.tokenStorage.saveToken(data.jwt);
      this.tokenStorage.saveUser(data);

      this.notificationService.showSnackBar(data.token);
      this.router.navigate(['/']);
      window.location.reload();
    }, error : err =>{
    console.log(err);
    this.notificationService.showSnackBar(err.message);
    }
  });
  }
}
