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
    this.posts = localPosts ? JSON.parse(localPosts) : this.getPost();;
  }

  getPost(): Observable<Post[]> {
    return this.http
      .get(`${this.BaseUrl}?filter[publish]=country&filter[10]=-1`)
      .pipe(map((r: any) => {
        console.log('Dati ricevuti dal server:', r);
        return r.map((p: IPost) => new Post(p));
      }));
  }

  private update() {
    this.posts$.next(this.posts);
  }

  getPost$(): Observable<Post[]> {
    return this.posts$.asObservable();
  }

  addNewPost(title: string, content: string): Observable<Post> {
    //IL POST VUOLE DUE PARAMETRI, QUINDI AGGIUNGO UN OGGETTO VUOTO PERCHE' IL BODY è OBBLIGATORIO
    return this.http.post(`${this.BaseUrl}?content=${content}&title=${title}&status=publish`, {}).pipe(
      map((p: any) => {
        const newPost = new Post(p);
        this.posts.push(newPost);
        this.update();
        return newPost;
      })
    );
  }
  

  deletePost(id: number) {
    return this.http.delete(`https://24obs.glue-hosting.com/wp-json/wp/v2/posts/${id}`)
  }


}
