import {
  ApplicationRef,
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
  OnInit
} from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import {
  exhaustMap,
  filter,
  first,
  switchMap,
  takeUntil
} from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { concat, interval, Subject } from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'mws30-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(
    private applicationRef: ApplicationRef,
    private swUpdate: SwUpdate,
    private snackBar: MatSnackBar,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    this.checkForUpdates();
    this.promptForUpdate();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  checkForUpdates(): void {
    const isStable$ = this.applicationRef.isStable.pipe(
      first(isStable => isStable)
    );
    const everyHour$ = interval(60 * 60 * 1000);

    concat(isStable$, everyHour$)
      .pipe(
        filter(() => this.swUpdate.isEnabled),
        switchMap(() => this.swUpdate.checkForUpdate()),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  promptForUpdate(): void {
    this.swUpdate.available
      .pipe(
        exhaustMap(() =>
          this.snackBar
            .open('Es gibt ein Update für MWS30', 'Jetzt aktualisieren')
            .afterDismissed()
        ),
        switchMap(() => this.activateUpdate()),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  async activateUpdate(): Promise<void> {
    await this.swUpdate.activateUpdate();
    this.document.location.reload();
  }
}
