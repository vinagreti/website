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

  resourceName = 'posts';
  name;
  animal;
  urlPattern = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;

  shareForm: FormGroup;

  constructor(
              private formBuilder: FormBuilder,
              private db: LocalDatabaseService,
              @Optional() private dialogRef: MatDialogRef<ShareComponent>) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.shareForm = this.formBuilder.group({
      link: ['', Validators.pattern(this.urlPattern)],
      image: ['', Validators.pattern(this.urlPattern)],
      text: [],
      title: [],
    });
  }

  share() {
    const link = this.shareForm.controls.link.value;
    const image = this.shareForm.controls.image.value;
    const text = this.shareForm.controls.text.value;
    const title = this.shareForm.controls.title.value;
    const post = new Post({link, text, title, image});
    const subscription = this.db.collection(this.resourceName)
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
