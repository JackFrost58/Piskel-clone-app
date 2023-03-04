import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CanvasContainerModule} from '@shared/canvas-container/canvas-container.module';
import {ToolsModule} from '@shared/tools-container/tools.module';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToolsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CanvasContainerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
