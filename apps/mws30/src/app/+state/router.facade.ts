import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { RouterState, selectRouteParams } from './router.selectors';

@Injectable({providedIn: 'root'})
export class RouterFacade {
  routeParams$: Observable<any> = this.store.pipe(
    select(selectRouteParams)
  );

  constructor(private store: Store<RouterState>) { }
}
