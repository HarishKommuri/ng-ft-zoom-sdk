import { ZoomConfig } from './interfaces';
import { ZoomService } from './zoom.service';
export declare class ZoomModule {
    constructor();
    static forRoot(config: ZoomConfig): {
        ngModule: typeof ZoomModule;
        providers: (typeof ZoomService | {
            provide: string;
            useValue: ZoomConfig;
        })[];
    };
}
