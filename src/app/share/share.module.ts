import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatCheckboxModule, MatDialogModule, MatIconModule, MatInputModule, MatSelectModule } from '@angular/material';
import { ShareComponent } from './share.component';
import { ShareService } from './share.service';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
  ],
  declarations: [ShareComponent],
  entryComponents: [ShareComponent],
  providers: [
    ShareService
  ]
})
export class ShareModule { }
