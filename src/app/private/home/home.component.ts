import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  post?: Post[];
  constructor(private postService: PostService, private router: Router) {
    this.getPost();
  }
  getPost() {
    this.postService.getPost().subscribe(
      (res: Post[]) => {
        this.post = res;
      },
      (err: any) => {
        console.log(err, '****errore');
      }
    );
  }
  goToPublic() {
    this.router.navigate(['public']);
  }
}
