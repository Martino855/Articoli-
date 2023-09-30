import { Injectable } from '@angular/core';
import { IUser } from '../models/user.model';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IToken } from '../models/token.model';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  user?: IUser | null;
  token: IToken | null;
  token$: BehaviorSubject<any | null>;
  private readonly LOCALSTORAGEKEY: string = '24OreBs-user';
  private readonly BASE_URL: string =
    'https://24obs.glue-hosting.com/wp-json/jwt-auth/v1/token';

  constructor(private http: HttpClient) {
    const t: string | null = window.localStorage.getItem(this.LOCALSTORAGEKEY);
    if (t) {
      this.token = <any>JSON.parse(t);
    } else {
      this.token = null;
    }
    this.token$ = new BehaviorSubject(this.token);
  }

  isAuthenticated(): boolean {
    if (this.user?.authenticated) {
      return false;
    } else {
      return true;
    }
  }

  getToken$(): Observable<IToken | null> {
    return this.token$.asObservable();
  }

  getToken() {
    return this.token;
  }

  setToken(u: IToken) {
    this.token = u;
    window.localStorage.setItem(
      this.LOCALSTORAGEKEY,
      JSON.stringify(this.token)
    );
    this.update();
  }

  deleteTokens() {
    this.token = null;
    window.localStorage.removeItem(this.LOCALSTORAGEKEY);
    this.update();
  }

  private update() {
    this.token$.next(this.token);
  }

  login(username: string, password: string): Observable<any> {
    return this.http
      .post(`${this.BASE_URL}`, {
        username: username,
        password: password,
      })
      .pipe(
        tap((r: any) => {
          this.setToken({
            token: r.token,
            // refresh_token: r.refresh_token,
          });
        })
      );
  }
}
