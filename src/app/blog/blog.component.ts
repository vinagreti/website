import { Component, OnInit } from '@angular/core';
import { LocalDatabaseService } from './../shared/services/local-database/local-database.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  posts: Observable<Array<any>>;

  constructor(private db: LocalDatabaseService) { }

  ngOnInit() {
    this.loadPosts();
  }

  private loadPosts() {
    this.posts = this.db.collection('posts').documents();
  }

}
