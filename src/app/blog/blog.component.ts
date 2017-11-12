import { Component, OnInit } from '@angular/core';
import { LocalDatabaseService } from './../shared/services/local-database/local-database.service';
import { Observable } from 'rxjs/Observable';

const collectionName = 'posts';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  posts: Observable<any>;
  private collection;

  constructor(private db: LocalDatabaseService) { }

  ngOnInit() {
    this.loadCollection();
    this.loadPosts();
  }

  private loadCollection() {
    this.collection = this.db.collection(collectionName);
  }

  private loadPosts() {
    this.posts = this.collection.documents();
  }

  private add() {
    this.collection.create({
        about: 'Ada',
        email: 'Lovelace',
        name: 1815,
        phone: 234234
    });
  }

  delete(post) {
    this.collection.delete(post)
    .subscribe((res) => {
      console.log(`Blog post removed ${post.id}`);
    });
  }
}
