import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LocalDatabaseService } from './../shared/services/local-database/local-database.service';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss']
})
export class ShareComponent implements OnInit {

  name;
  animal;

  shareForm: FormGroup;

  constructor(
              private formBuilder: FormBuilder,
              private db: LocalDatabaseService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.shareForm = this.formBuilder.group({
      link: [],
      text: [],
      image: []
    });
  }

  share() {
    console.log('shre');
    const link = this.shareForm.controls.link.value;
    const text = this.shareForm.controls.text.value;
    const image = this.shareForm.controls.image.value;
    this.db.collection(undefined).push({link, text, image})
    .subscribe((res: any) => {
      console.log(`Shared with ID ${res.id}`);
    });
  }

}
