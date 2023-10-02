import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, switchMap, tap } from 'rxjs';
import { IPost, Post } from '../models/post.model';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private posts: Post[] = [];
  private posts$: BehaviorSubject<Post[]>;
  private readonly BaseUrl: string = 'https://24obs.glue-hosting.com/wp-json/wp/v2/posts';


  constructor(private http: HttpClient) {
    const localPosts = window.localStorage.getItem('posts');
    this.posts$ = new BehaviorSubject(this.posts);
    this.posts = localPosts ? JSON.parse(localPosts) : [];
  }

  getPost(): Observable<Post[]> {
    return this.http
      .get(`${this.BaseUrl}?filter[publish]=posts&filter[10]=-1`)
      .pipe(map((r: any) => {
        console.log('Dati ricevuti dal server:', r);
        this.posts = r.map((p: IPost) => new Post(p));
        window.localStorage.setItem('posts', JSON.stringify(this.posts));
        this.update();
        return this.posts
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
    return this.http.delete(`${this.BaseUrl}/${id}`).pipe(
      tap(
        () => this.getPost().subscribe()
      )
    );
  }

  editPost(id: number, content: string, title: string) {
    return this.http.post(`${this.BaseUrl}/${id}?content=${content}&title=${title}`, {}).pipe(
      tap(
        () => this.getPost().subscribe()
      )
    )
  }

}
