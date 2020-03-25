import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Dice, Player } from '@aloofly/mws30-models';
import { MatDialog } from '@angular/material/dialog';
import { DiceCupViewDialogComponent } from '../dialogs/dice-cup-view-dialog/dice-cup-view-dialog.component';

@Component({
  selector: 'mws30-notepad',
  templateUrl: './notepad.component.html',
  styleUrls: ['./notepad.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotepadComponent {
  @Input() players: Player[];

  constructor(private matDialog: MatDialog) { }

  openDiceView(dices: Dice[]): void {
    this.matDialog.open(DiceCupViewDialogComponent, {
      data: dices
    });
  }
}
