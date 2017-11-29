import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalDatabaseService } from './../../shared/services/local-database/local-database.service';

const urlPattern = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
const openSourceCollectionName = 'openSource';

@Component({
  selector: 'app-open-source-form',
  templateUrl: './open-source-form.component.html',
  styleUrls: ['./open-source-form.component.scss']
})
export class OpenSourceFormComponent implements OnInit {

  openSourcesForm: FormGroup;

  @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() project: any;

  constructor(private db: LocalDatabaseService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initOpenSourcesForm();
  }

  initOpenSourcesForm() {
    this.openSourcesForm = this.formBuilder.group({
      link: [this.project.link, Validators.pattern(urlPattern)],
      description: [this.project.description],
      title: [this.project.title],
      type: [this.project.type],
    });
  }

  save() {
    const description = this.openSourcesForm.controls.description.value;
    const link = this.openSourcesForm.controls.link.value;
    const title = this.openSourcesForm.controls.title.value;
    const type = this.openSourcesForm.controls.type.value;
    const openSource: any = {link, title, description, type};

    if (this.project.id) {
      openSource.id = this.project.id;
    }

    const subscription = this.db.collection(openSourceCollectionName)
    .save(openSource)
    .then((res: any) => {
      if (res) {
        console.log('RESSSSSSSSSSSSS', res)
      }
    });
  }

  cancel() {
    this.close.emit(false);
  }
}
