import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { User } from 'src/app/models/User';
import { ImageUploadService } from 'src/app/service/image-upload.service';
import { NotificationService } from 'src/app/service/notification.service';
import { PostService } from 'src/app/service/post.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { UserService } from 'src/app/service/user.service';
import { EditUserComponent } from '../edit-user/edit-user.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  isUserDataLoad = false;
  user!: User;
  selectedFile!: File;
  userProfileImage!:File;
  previewImgURL: any;

  constructor(private tokenService: TokenStorageService,
              private postService: PostService,
              private dialog: MatDialog,
              private notificationService: NotificationService,
              private imageService: ImageUploadService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getCurrentUser()
    .subscribe(data => {
      this.user=data;
      this.isUserDataLoad = true;
    });

    this.imageService.getProfileImage()
    .subscribe(data => { 
      this.userProfileImage = data.imageBytes;
    });
  }

  onFileSelected(event: any): void{
    this.selectedFile = event.target.files[0];
    
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = () => {
      this.previewImgURL=reader.result;
    };
  }

  openEditDialog(): void{
    const dialogUserEdit = new MatDialogConfig();
    dialogUserEdit.width = '400px';
    dialogUserEdit.data = {
      user: this.user
    }
    this.dialog.open(EditUserComponent, dialogUserEdit);
  }

  onUpload():void{
    if(this.selectedFile != null) {
      this.imageService.uploadImageToUser(this.selectedFile)
      .subscribe(() => {
        this.notificationService.showSnackBar('Profile image update Successfully');
      });
    }
  }

  formatImage(img: any): any{
    if(img == null){
      return null;
    }
    return 'data:image/jpeg;base64,' + img;
  }
}
