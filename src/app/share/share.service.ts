import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ShareComponent } from './share.component';
@Injectable()
export class ShareService {

  constructor(private dialog: MatDialog) {}

  open(data = {}) {
    const dialogRef = this.dialog.open(ShareComponent, {
      width: '550px',
      data: { name: 'this.name', animal: 'this.animal' }
    });

    dialogRef.afterClosed()
    .subscribe(status => {
      console.log('Share dilog closed with', status);
    });
  }

}
