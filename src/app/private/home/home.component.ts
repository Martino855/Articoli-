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
  newPostTitle: string = 'Titolo del post';
  newPostContent: string = 'Ciao';

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

  deletePost(id: number) {
    this.postService.deletePost(id).subscribe(
      (r) => {
        console.log('post cancellato',r);
      },
      (error) => { console.error('errore nella cancellazione', error) }
    )

  }

  addNewPost() {
    this.postService.addNewPost(this.newPostTitle, this.newPostContent).subscribe(
      (newPost: Post) => {
        console.log('Nuovo post aggiunto:', newPost);
        this.newPostTitle = '';
        this.newPostContent = '';
      },
      (error: any) => {
        console.error('Errore del nuovo post:', error);
      }
    );
  }



  goToPublic() {
    this.router.navigate(['public']);
  }

}
