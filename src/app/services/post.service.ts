import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IPost, Post } from '../models/post.model';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly BaseUrl: string =
    'https://24obs.glue-hosting.com/wp-json/wp/v2/posts';
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  getPost(): Observable<Post[]> {
    return this.http
      .get(this.BaseUrl, {})
      .pipe(map((r: any) => r.map((p: IPost) => new Post(p))));
  }
}
