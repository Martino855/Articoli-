import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { IPost, Post } from '../models/post.model';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private posts: Post[] = [];
  private posts$: BehaviorSubject<Post[]> = new BehaviorSubject(this.posts);
  private readonly BaseUrl: string = 'https://24obs.glue-hosting.com/wp-json/wp/v2/posts';


  constructor(private http: HttpClient) {
    const localPosts = window.localStorage.getItem('posts');
    console.log(localPosts);
    this.posts = localPosts ? JSON.parse(localPosts) : this.getPost();
  }

  getPost(): Observable<Post[]> {
    return this.http
      .get(this.BaseUrl, {})
      .pipe(map((r: any) => r.map((p: IPost) => new Post(p))));
  }

  private update() {
    this.posts$.next(this.posts);
  }

  addTask(i: number) {
    const newPost = new Post({
      id: i,
      title: 'Nuovo titolo',
      content: 'Contenuto vuoto',
      status: 'draft',
    });
    this.posts.push(newPost);
    this.update();
  }

  deleteTask(post:Post){
    const index = this.posts.indexOf(post)
    this.posts.splice(index,1)
    this.update()
  }

  editTask(post: Post){
    console.log('edita task', post);
    const i = this.posts.indexOf(post)
    this.posts[i] = new Post(post.id);
    this.update();
  }

  changeTaskStatus(post: Post){
    console.log('cambia stato al post', post);
    const i = this.posts.indexOf(post);
    post.status = 'pending';
    this.posts[i] = new Post(post);
    this.update();
  }
}
