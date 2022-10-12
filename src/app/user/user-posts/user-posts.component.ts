import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/Post';
import { CommentService } from 'src/app/service/comment.service';
import { ImageUploadService } from 'src/app/service/image-upload.service';
import { NotificationService } from 'src/app/service/notification.service';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.css']
})
export class UserPostsComponent implements OnInit {

  isUserPostsLoaded = false;
  posts!:Post[];

  constructor(private postService:PostService,
              private imageService:ImageUploadService,
              private commentService:CommentService,
              private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.postService.getPostForCurrentUser()
    .subscribe(data => {
      console.log(data);
      this.posts=data;
      this.getImagesToPosts(this.posts);
      this.getCommentsToPost(this.posts);
      this.isUserPostsLoaded=true;
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
      });
    });
  }

  formatImage(img: any): any{
    if(img == null){
      return null;
    }
    return 'data:image/jpeg;base64,' + img;
  }

  removePost(post:Post,index:number): void{
    console.log(post);
    const result = confirm('Do you really want to delete this post ?');

    if(result){
      this.postService.delete(post.id)
      .subscribe(() => {
        this.posts.splice(index,1);
        this.notificationService.showSnackBar('Post deleted');
      });
    }
  }

  deleteComment(commentId: number, postIndex: number, commentIndex: number): void {
    const post = this.posts[postIndex];

    this.commentService.deleteComment(commentId).
    subscribe(data => {
      post.comments?.slice(commentIndex,1);
      this.notificationService.showSnackBar('Comment removed');
    })
  }

}
