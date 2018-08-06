import { NgModule } from '@angular/core';
import { ZoomService } from './zoom.service';
import { initZoom } from './zoom-functions';
var ZoomModule = /** @class */ (function () {
    function ZoomModule() {
    }
    ZoomModule.forRoot = function (config) {
        config.logs = !('logs' in config) ? true : (config.logs === false ? false : true);
        initZoom(config);
        return {
            ngModule: ZoomModule,
            providers: [ZoomService, { provide: 'config', useValue: config }]
        };
    };
    ZoomModule.decorators = [
        { type: NgModule, args: [{
                    providers: []
                },] },
    ];
    /** @nocollapse */
    ZoomModule.ctorParameters = function () { return []; };
    return ZoomModule;
}());
export { ZoomModule };
//# sourceMappingURL=module.js.map