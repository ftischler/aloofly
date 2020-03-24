import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'mws30-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

}
