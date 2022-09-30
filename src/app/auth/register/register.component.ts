import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { NotificationService } from 'src/app/service/notification.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerForm!: FormGroup;

  constructor(
  private authService:AuthService,
  private tokenStorage:TokenStorageService,
  private notificationService:NotificationService,
  private fb:FormBuilder) { }

  ngOnInit(): void {
    this.registerForm=this.createRegisterForm();
  }

  createRegisterForm():FormGroup{
    return this.fb.group({
      email:['',Validators.compose([Validators.required, Validators.email])],
      username:['',Validators.compose([Validators.required])],
      password:['',Validators.compose([Validators.required])],
      firstname:['',Validators.compose([Validators.required])],
      lastname:['',Validators.compose([Validators.required])],
      confirmPassword:['',Validators.compose([Validators.required])],
      }
    );
  }

  submit():void{
    console.log(this.registerForm.value);
    this.authService.register({
      username:this.registerForm.value.username,
      password:this.registerForm.value.password,
      email:this.registerForm.value.email,
      firstname:this.registerForm.value.firstname,
      lastname:this.registerForm.value.lastname,
      confirmPassword:this.registerForm.value.confirmPassword
    }).subscribe(data => {
      console.log(data);

      this.notificationService.showSnackBar('Successfuly registered');
    }, error =>{
    console.log(error);
    this.notificationService.showSnackBar('Something went wrong during registration');
    });
  }
}
