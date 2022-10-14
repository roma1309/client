import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/Post';
import { ImageUploadService } from 'src/app/service/image-upload.service';
import { NotificationService } from 'src/app/service/notification.service';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  postFrom!:FormGroup;
  selectedFile!:File;
  createdPost!:Post;
  isPostCreated=false;
  previewImgUrl:any;

  constructor(private postService:PostService,
              private imageUploadService:ImageUploadService,
              private router:Router,
              private fb:FormBuilder,
              private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.postFrom = this.createPostForm();
  }

  createPostForm(): FormGroup {
    return this.fb.group({
      title:[],
      caption:[],
      location:[]
    });
  }

  submit(): void {
    this.postService.createPost({
      title: this.postFrom.value.title,
      caption: this.postFrom.value.caption,
      location: this.postFrom.value.location
    }).subscribe( data => {
      this.createdPost = data;
      console.log(data);  

    if(this.createdPost.id != null) {
      this.imageUploadService.uploadImageToPost(this.selectedFile, this.createdPost.id)
      .subscribe(() => {
        this.notificationService.showSnackBar('Post created succsefully');
        this.isPostCreated = true;
        this.router.navigate(['/profile']);
      });
    }
  });
  }

  onFileSelected(event: any): void{
    this.selectedFile = event.target.files[0];
    
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = () => {
      this.previewImgUrl=reader.result;
    };
  }
}
