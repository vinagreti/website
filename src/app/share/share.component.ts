import { Component, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { LocalDatabaseService } from './../shared/services/local-database/local-database.service';

class Post {
  id: number;
  link: string;
  image: string;
  text: string;
  title: string;

  constructor(data: any = {}) {
    if (data.id) { this.id = data.id; }
    if (data.link) { this.link = data.link; }
    if (data.image) { this.image = data.image; }
    if (data.text) { this.text = data.text; }
    if (data.title) { this.title = data.title; }
  }
}

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss']
})
export class ShareComponent implements OnInit {

  openSourceCollectionName = 'openSource';
  postsCollectionName = 'posts';
  name;
  animal;
  urlPattern = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;

  postsForm: FormGroup;
  openSourcesForm: FormGroup;
  shareForm: FormGroup;

  constructor(
              private formBuilder: FormBuilder,
              private db: LocalDatabaseService,
              @Optional() private dialogRef: MatDialogRef<ShareComponent>) { }

  ngOnInit() {
    this.initForms();
  }

  initForms() {
    this.initShareForm();
    this.initPostsForm();
    this.initOpenSourcesForm();
  }

  initOpenSourcesForm() {
    this.openSourcesForm = this.formBuilder.group({
      link: [''],//, Validators.pattern(this.urlPattern)],
      description: [],
      title: [],
    });
  }

  initPostsForm() {
    this.postsForm = this.formBuilder.group({
      link: ['', Validators.pattern(this.urlPattern)],
      image: ['', Validators.pattern(this.urlPattern)],
      text: [],
      title: [],
    });
  }

  initShareForm() {
    this.shareForm = this.formBuilder.group({
      type: ['posts'],
    });
  }

  share(type) {
    switch (type) {
      case 'post':
        this.sharePost();
        break;
      case 'openSource':
        this.shareOpenSource();
        break;
    }
  }

  shareOpenSource() {
    const description = this.openSourcesForm.controls.description.value;
    const link = this.openSourcesForm.controls.link.value;
    const title = this.openSourcesForm.controls.title.value;
    const openSource = new Post({link, title, description});
    const subscription = this.db.collection(this.openSourceCollectionName)
    .create(openSource)
    .then((res: any) => {
      if (res) {
        if (this.dialogRef) {
          this.dialogRef.close('ok');
        }
      }
    });
  }

  sharePost() {
    const link = this.postsForm.controls.link.value;
    const image = this.postsForm.controls.image.value;
    const text = this.postsForm.controls.text.value;
    const title = this.postsForm.controls.title.value;
    const post = new Post({link, text, title, image});
    const subscription = this.db.collection(this.postsCollectionName)
    .create(post)
    .then((res: any) => {
      if (res) {
        if (this.dialogRef) {
          this.dialogRef.close('ok');
        }
      }
    });
  }
}
