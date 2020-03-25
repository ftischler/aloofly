import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Dice } from '@aloofly/mws30-models';

@Component({
  selector: 'mws30-dice-cup-view-dialog',
  templateUrl: './dice-cup-view-dialog.component.html',
  styleUrls: ['./dice-cup-view-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DiceCupViewDialogComponent {
  constructor(private matDialogRef: MatDialogRef<DiceCupViewDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public dices: Dice[]) { }

  close(): void {
    this.matDialogRef.close();
  }
}
