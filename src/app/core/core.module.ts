import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from './auth/services/auth.service';
import { StoreModule } from '@ngrx/store';
import * as AuthReducers from './auth/store/reducers/auth.reducer';
import * as UIReducers from './store/reducers/ui.reducer';
import { AuthGuard } from './auth/services/auth.guard';
import { CoreRoutingModule } from './core-routing.module';
import { LoginComponent } from './auth/components/login/login.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    CoreRoutingModule,
    StoreModule.forFeature('auth', AuthReducers.authReducer),
    StoreModule.forFeature('ui', UIReducers.uiReducer),
  ],
  declarations: [LoginComponent],
  exports: [LoginComponent]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        `CoreModule has already been loaded. Import Core modules in the AppModule only.`
      );
    }
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [AuthService, AuthGuard]
    };
  }
}
