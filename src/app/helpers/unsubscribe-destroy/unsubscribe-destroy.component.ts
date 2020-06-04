import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

export abstract class UnsubscribeOnDestroy implements OnDestroy {
  protected d$: Subject<any>;

  constructor() {
    this.d$ = new Subject<void>();

    const f = this.ngOnDestroy;
    this.ngOnDestroy = () => {
      f();
      this.d$.next();
      this.d$.complete();
    };
  }

  ngOnDestroy() {
    // no-op
  }

}