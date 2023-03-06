import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AnimationContainerModule} from '@shared/animation-container/animation-container.module';
import {CanvasContainerModule} from '@shared/canvas-container/canvas-container.module';
import {FrameContainerModule} from '@shared/frame-container/frame-container.module';
import {HeaderContainerModule} from '@shared/header-container/header-container.module';
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
    HeaderContainerModule,
    CanvasContainerModule,
    AnimationContainerModule,
    FrameContainerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
