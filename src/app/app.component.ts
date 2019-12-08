import { Component, OnInit } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AppState } from './store/reducers';
import { Observable } from 'rxjs';
import { isLoggedIn, isLoggedOut } from './core/auth/store/auth.selector';
import * as AuthActions from './core/auth/store/auth.actions';
import { UIActions } from './core/store/ui-types';
import { selectSidebarIsOpen } from './core/store/ui.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loading = true;
  sidebarIsOpen$: Observable<boolean>;

  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;

  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit() {
    this.sidebarIsOpen$ = this.store.select(selectSidebarIsOpen);
    const userProfile = localStorage.getItem('user');
    if (userProfile) {
      this.store.dispatch(AuthActions.login({ user: JSON.parse(userProfile) }));
    }

    this.spinnerHandler();
    // this.store.subscribe(state => console.log('actual state of store', state));
    this.isLoggedIn$ = this.store.pipe(select(isLoggedIn));

    this.isLoggedOut$ = this.store.pipe(select(isLoggedOut));
  }

  spinnerHandler() {
    this.router.events.subscribe(event => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
  }

  sidebarHandler(sidebarOpen: boolean) {
    if (sidebarOpen) {
      this.store.dispatch(UIActions.openSidebar());
    } else {
      this.store.dispatch(UIActions.closeSidebar());
    }
  }
}
