import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/reducers';
import { tap } from 'rxjs/operators';
import { noop } from 'rxjs';
import * as AuthActions from '../../store/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.form = fb.group({
      email: ['test@angular-university.io', [Validators.required]],
      password: ['test', [Validators.required]]
    });
  }

  ngOnInit() {}

  login() {
    const { email, password } = this.form.value;
    this.auth
      .login(email, password)
      .pipe(
        tap(user => {
          this.store.dispatch(AuthActions.login({ user }));
          this.router.navigateByUrl('/courses');
        })
      )
      .subscribe(noop, () => alert('Login failed'));
  }
}
