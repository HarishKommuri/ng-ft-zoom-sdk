import { NgModule, ModuleWithProviders } from '@angular/core';
import { ZoomService } from './zoom.service';

@NgModule({})

export class ZoomModule {
  static forRoot(accessToken: string): ModuleWithProviders {
    return {
      ngModule: ZoomModule,
      providers: [{
        provide: ZoomService,
        useValue: accessToken
      }]
    }
  }
}
