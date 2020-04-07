import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';
import { Observable, of } from 'rxjs';
import { GameContext, Games } from '@aloofly/mws30-models';
import { catchError, tap } from 'rxjs/operators';

@Component({
  selector: 'mws30-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OverviewComponent implements OnInit {
  games$: Observable<Games | null> | undefined;
  gameContexts$: Observable<GameContext[]> | undefined;

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.games$ = this.gameService.getGames();
    this.gameContexts$ = this.gameService
      .getGameContexts()
      .pipe(catchError(() => of([])));
  }
}
