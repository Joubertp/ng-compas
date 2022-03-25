import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {  MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Ressources } from './app.constants';
import { BandeauComponent } from './core/components/bandeau/bandeau.component';
import { HttpErrorHandler } from './shared/services/http-error-handler.service';
import { MessageService } from './shared/services/message.service';
import { AuthModule } from './features/auth/auth.module';
import { AuthService } from './shared/services/auth.service';
import { AuthentificationInterceptor } from './shared/interceptors/authentification-interceptor';
import { MessagesIHM } from './shared/messages-ihm.constants';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { AgentsModule } from './features/agents/agents.module';
import { AgentModule } from './features/agent/agent.module';
import { AutoOpenMenuComponent } from './shared/components/auto-open-menu/auto-open-menu.component';

@NgModule({
  declarations: [AppComponent, BandeauComponent, AutoOpenMenuComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    ReactiveFormsModule,
    AuthModule,
    CoreModule,
    AgentsModule,
    AgentModule,
    BrowserAnimationsModule
  ],
  providers: [
    Ressources,
    HttpErrorHandler,
    MessageService,
    MessagesIHM,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthentificationInterceptor,
      multi: true,
    },
    AuthService,
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 3000 } },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
