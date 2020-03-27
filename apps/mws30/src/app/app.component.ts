import { ApplicationRef, ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { switchMap, take, takeUntil } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

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
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.checkForUpdates();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  checkForUpdates(): void {
    this.applicationRef.isStable
      .pipe(
        take(1),
        switchMap(() => this.swUpdate.available),
        switchMap(() => {
          return this.snackBar
            .open('Es gibt ein Update für MWS30', 'Jetzt aktualisieren')
            .afterDismissed();
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(() => window.location.reload());
  }
}
