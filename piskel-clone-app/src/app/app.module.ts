import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AnimationContainerModule} from '@components/animation-container/animation-container.module';
import {CanvasContainerModule} from '@components/canvas-container/canvas-container.module';
import {FrameContainerModule} from '@components/frame-container/frame-container.module';
import {HeaderContainerModule} from '@components/header-container/header-container.module';
import {ToolsModule} from '@components/tools-container/tools.module';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FrameContentService} from '@services/frame-content.service';

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
  providers: [
    FrameContentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
