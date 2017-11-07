import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MatButtonModule, MatCheckboxModule, MatDialogModule, MatIconModule, MatInputModule, MatSelectModule } from '@angular/material';
import { ShareComponent } from './share.component';
import { ShareService } from './share.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  declarations: [ShareComponent],
  entryComponents: [ShareComponent],
  providers: [
    ShareService
  ]
})
export class ShareModule { }
