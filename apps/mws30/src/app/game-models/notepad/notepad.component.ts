import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Player } from '@aloofly/mws30-models';

@Component({
  selector: 'mws30-notepad',
  templateUrl: './notepad.component.html',
  styleUrls: ['./notepad.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotepadComponent {
  @Input() players: Player[];
}
