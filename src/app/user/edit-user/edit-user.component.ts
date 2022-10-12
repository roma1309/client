import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/models/User';
import { NotificationService } from 'src/app/service/notification.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  public profileEditForm!:FormGroup;

  constructor(private fB: FormBuilder,
            private userService: UserService,
            private notificationService: NotificationService,
            @Inject(MAT_DIALOG_DATA) public data: any,
            private dialogRef:MatDialogRef<EditUserComponent>) { }

  ngOnInit(): void {
    this.profileEditForm = this.createProfileForm();
  }

  createProfileForm():FormGroup {
    return this.fB.group({
      firstname:[
        this.data.user.firstname,
        Validators.compose([Validators.required])
      ],
      lastname: [
        this.data.user.lastname,
        Validators.compose([Validators.required])
      ],
      age: [
        this.data.user.age,
        Validators.compose([Validators.required])
      ],
      bio: [
        this.data.user.bio,
        Validators.compose([Validators.required])
      ]
    });
  }

  submit(): void {
    this.userService.updateUser(this.updateUser())
    .subscribe(() => {
      console.log('wefqwefq wwefqwfew')
      this.notificationService.showSnackBar('user updated');
      this.dialogRef.close();
    });
  }

  private updateUser(): User {
    this.data.user.firstname = this.profileEditForm.value.firstname;
    this.data.user.lastname = this.profileEditForm.value.lastname;
    this.data.user.bio = this.profileEditForm.value.bio;
    this.data.user.age = this.profileEditForm.value.age;
    return this.data.user;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
