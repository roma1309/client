import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';

const COMMENT_API = 'http://localhost:8080/api/comments/'

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http:HttpClient) { }

  addToCommentToPost(postId:number,message:string):Observable<any>{
    return this.http.post(COMMENT_API+postId+'/create',{
      message:message
    });
  }

  getCommentToPost(postId:number):Observable<any>{
    return this.http.get(COMMENT_API+postId);
  }

  deleteComment(commetId:number):Observable<any>{
    return this.http.delete(COMMENT_API+commetId+'/delete');
  }
  
}
