import { Component, OnInit } from '@angular/core';
import { LocalDatabaseService } from './../shared/services/local-database/local-database.service';
import { Collection } from './../shared/services/local-database/src/collection';
import { Observable } from 'rxjs/Observable';

const collectionName = 'posts';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  posts: Observable<any>;
  private collection: Collection;

  constructor(private db: LocalDatabaseService) { }

  ngOnInit() {
    this.loadCollection();
    this.loadPosts();
  }

  private loadCollection() {
    this.collection = this.db.collection(collectionName);
  }

  private loadPosts() {
    this.posts = this.db.collection(collectionName).documents();
  }

  private add() {
    this.collection.create({
        about: 'Ada',
        email: 'Lovelace',
        name: 1815,
        phone: 234234
    });
  }

  delete(event, post) {
    event.preventDefault();
    event.stopPropagation();
    this.collection.delete(post);
  }
}
