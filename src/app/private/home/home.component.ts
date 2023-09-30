import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  posts?: Post[];
  post?: Post;
  posts$: BehaviorSubject<Post[]>
  newPostTitle:string = '';
  newPostContent:string = ''
  constructor(private postService: PostService, private router: Router) {
    this.getPost();
     this.posts$ = new BehaviorSubject<Post[]>([]);
    this.postService.getPost$().subscribe(
      (res: Post[]) => {
        this.posts$.next(res);
      },
      (err: any) => {
        console.log(err, '****errore');
      }
    );
  }


  getPost() {
    this.postService.getPost().subscribe(
      (res: Post[]) => {
        this.posts = res;
      },
      (err: any) => {
        console.log(err, '****errore');
      }
    );
  }

  deletePost(id:number){
    this.postService.deletePost(id)
    console.log(id);
    
  }

  goToPublic() {
    this.router.navigate(['public']);
  }

}
