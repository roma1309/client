import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/Post';
import { User } from 'src/app/models/User';
import { CommentService } from 'src/app/service/comment.service';
import { ImageUploadService } from 'src/app/service/image-upload.service';
import { NotificationService } from 'src/app/service/notification.service';
import { PostService } from 'src/app/service/post.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  isPostsLoaded=false;
  posts!: Post[];
  isUserDataLoaded=false;
  user!:User;

  constructor(private postServise:PostService,
    private commentService:CommentService,
    private userService:UserService,
    private notificationService:NotificationService,
    private imageService:ImageUploadService) { }

  ngOnInit(): void {
    this.postServise.getAllPosts()
    .subscribe(data => {
      console.log(data);
      this.posts=data;
      this.getImagesToPosts(this.posts);
      this.getCommentsToPost(this.posts);
      this.isPostsLoaded=true;
    });

    this.userService.getCurrentUser()
    .subscribe(data => {
      this.user = data;
      this.isUserDataLoaded =true;
    });
  }

  getImagesToPosts(posts:Post[]):void {
    posts.forEach(p => {
      this.imageService.getImageToPost(p.id)
      .subscribe((data: { imageBytes: File | undefined; }) => {
        p.image = data.imageBytes;
      })
    });
  }

  getCommentsToPost(posts:Post[]):void {
    posts.forEach(p => {
     this.commentService.getCommentToPost(p.id)
      .subscribe(data => {
        p.comments = data;
      })
    });
  }


  likePost(postId:number, postIndex:number): void{
    const post = this.posts[postIndex];
    console.log(post);

    if(!post.usersLiked?.includes(this.user.username)) {
      this.postServise.likePost(postId, this.user.username)
      .subscribe(() => {
        post.usersLiked?.push(this.user.username);
        this.notificationService.showSnackBar('Liked!');
      });
    } else {
      this.postServise.likePost(postId, this.user.username)
      .subscribe(() => {
         const index = post.usersLiked?.indexOf(this.user.username,0);
        if(Number(index) > -1) {
          post.usersLiked?.splice(Number(index), 1);
        }
      });
    }
  }

  postComment(message: string, postId: number, postIndex: number): void{
    const post = this.posts[postIndex];
    console.log(post);

    this.commentService.addToCommentToPost(postId, message)
    .subscribe(data => {
      console.log(data);
      post.comments?.push(data);
    });
  }

  formatImage(img: any): any{
    if(img == null){
      return null;
    }
    return 'data:image/jpeg;base64,' + img;
  }

  search(username: string, postIndex: number): number{
    const post = this.posts[postIndex];
    console.log(post);
   const number = post.usersLiked?.indexOf(username);
   return Number(number);
  }
}
