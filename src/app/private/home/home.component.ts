import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Observable } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  post?: Post;
  posts$: Observable<Post[]>
  newPostTitle: string = 'Titolo del post';
  newPostContent: string = 'Ciao';
  currentPost: Post | undefined;

  constructor(private postService: PostService, private router: Router, private modalService: NgbModal) {
    this.posts$ = this.postService.getPost$();
    this.getPost();
    //se nel servizio si fa getPost().subscribe qui non la si chiama
  }


  getPost() {
    this.postService.getPost().subscribe(
      (res) => {
        console.log((res))
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
        this.newPostTitle = 'Titolo';
        this.newPostContent = 'Contenuto';
      },
      (error: any) => {
        console.error('Errore del nuovo post:', error);
      }
    );
  }


  goToPublic() {
    this.router.navigate(['public']);
  }

  editPost(currentPost:Post){
    this.currentPost = currentPost;

  }

  saveEdit(){
    if (this.currentPost) {
      this.postService.editPost(this.currentPost.id, this.currentPost.content, this.currentPost.title).subscribe({
      next: (value)=>{
        this.currentPost = undefined;
        console.log(value);

      },
      error: (e)=>{
        console.error('errore',e)
      }
      })
    }
    
  }

}
