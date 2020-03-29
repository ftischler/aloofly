import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Dices, GameContext, Player } from '@aloofly/mws30-models';
import { MatDialog } from '@angular/material/dialog';
import { DiceCupViewDialogComponent } from '../dialogs/dice-cup-view-dialog/dice-cup-view-dialog.component';

@Component({
  selector: 'mws30-notepad',
  templateUrl: './notepad.component.html',
  styleUrls: ['./notepad.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotepadComponent {
  @Input() ctx: GameContext;

  constructor(private matDialog: MatDialog) { }

  openDiceView(dices: Dices): void {
    if (Object.values(dices).length) {
      this.matDialog.open(DiceCupViewDialogComponent, {
        data: dices
      });
    }
  }
}
