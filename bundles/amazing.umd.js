(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core')) :
    typeof define === 'function' && define.amd ? define(['exports', '@angular/core'], factory) :
    (factory((global.ng = global.ng || {}, global.ng.amazing = {}),global.ng.core));
}(this, (function (exports,core) { 'use strict';

    var Responses = {
        notAvailable: {
            code: 0,
            state: "plugin_not_installed",
            available: false
        },
        available: {
            code: 1,
            state: "plugin_installed",
            available: true
        },
        notInitialized: {
            code: 0,
            status: "plugin_not_initialized",
            initialized: false
        },
        initialized: {
            code: 1,
            status: "plugin_initalized",
            initialized: true
        },
        requiredMsg: "zoOm is not installed or deviceready fired not evenly."
    };

    var ZoomService = /** @class */ (function () {
        function ZoomService() {
        }
        /**
         * Check whether the global variable ZoomAuthentication is available or not
         */
        ZoomService.prototype.isZoomUsable = function () {
            return new Promise(function (resolve, reject) {
                document.addEventListener('deviceready', function () {
                    var zoom = window.ZoomAuthentication;
                    (zoom !== undefined && zoom !== null) ? resolve(Responses.available) : reject(Responses.notAvailable);
                }, false);
            });
        };
        /**
         * Return a promise that checks the installation and initialization status of the zoom plugin
         * @param promise is an initiated promise that calls the native zoOm functions
         */
        ZoomService.prototype.PromiseExtended = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                _this.isZoomInitialized().then(function (initalized) {
                    if (initalized) {
                        resolve();
                    }
                    else {
                        reject(Responses.notInitialized);
                    }
                }).catch(reject);
            });
        };
        /**
         * Return a promise that resolves zoOm initialize status
         */
        ZoomService.prototype.isZoomInitialized = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                _this.isZoomUsable().then(function () {
                    var zoom = window.ZoomAuthentication;
                    zoom.getSdkStatus(function (res) {
                        resolve(res === 'Initialized');
                    }, reject);
                }).catch(reject);
            });
        };
        /**
         * Return a promise the resolves the current zoOm SDK status
         */
        ZoomService.prototype.getSdkStatus = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                _this.PromiseExtended().then(function () {
                    var zoom = window.ZoomAuthentication;
                    zoom.getSdkStatus(resolve, reject);
                }).catch(reject);
            });
        };
        /**
         * Initialize the zoOm enrollment and enrolls the new zoOm user
         * @param userId user id of the new user
         * @param encryptionSecret secret passphrase of the new user
         *
         */
        ZoomService.prototype.enroll = function (userId, encryptionSecret) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                _this.PromiseExtended().then(function () {
                    var zoom = window.ZoomAuthentication;
                    zoom.enroll(userId, encryptionSecret, resolve, reject);
                }).catch(reject);
            });
        };
        /**
         * Initialize the zoOm authentication and authenticate the enrolled used with given enrolled credentials
         * @param userId user id of enrolled user to authenitcate
         * @param encryptionSecret secret passphrase of the enrolled user at the time of enroll
         */
        ZoomService.prototype.authenticate = function (userId, encryptionSecret) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                _this.PromiseExtended().then(function () {
                    var zoom = window.ZoomAuthentication;
                    zoom.authenticate(userId, encryptionSecret, resolve, reject);
                }).catch(reject);
            });
        };
        /**
         * Return a promise that resolves enrollment status of the given uer
         * @param userId user id used for enrollment
         */
        ZoomService.prototype.getUserEnrollmentStatus = function (userId) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                _this.PromiseExtended().then(function () {
                    var zoom = window.ZoomAuthentication;
                    zoom.getUserEnrollmentStatus(userId, resolve, reject);
                }).catch(reject);
            });
        };
        /**
         * Return a promise that resolves the current version of zoom in use
         */
        ZoomService.prototype.getVersion = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                _this.PromiseExtended().then(function () {
                    var zoom = window.ZoomAuthentication;
                    zoom.getVersion(resolve, reject);
                }).catch(reject);
            });
        };
        /**
         * Return a promise that resolves the enrollment status of given user
         * @param userId user id used for enrollment
         */
        ZoomService.prototype.isUserEnrolled = function (userId) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                _this.PromiseExtended().then(function () {
                    var zoom = window.ZoomAuthentication;
                    zoom.isUserEnrolled(userId, resolve, reject);
                }).catch(reject);
            });
        };
        /**
         * Initialize the zoom verification and resolve the zoom working status
         */
        ZoomService.prototype.verify = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                _this.PromiseExtended().then(function () {
                    var zoom = window.ZoomAuthentication;
                    zoom.verify(resolve, reject);
                }).catch(reject);
            });
        };
        ZoomService.decorators = [
            { type: core.Injectable },
        ];
        /** @nocollapse */
        ZoomService.ctorParameters = function () { return []; };
        return ZoomService;
    }());

    /**
     * Initializes the face tech zoom face authentication service
     * @param token zoom api token
     */
    function initZoom(config) {
        document.addEventListener('deviceready', function () {
            var zoom = window.ZoomAuthentication;
            if (!zoom) {
                showMsg(config.logs, Responses.requiredMsg);
                return;
            }
            zoom.initialize(config.token, function (res) {
                showMsg(config.logs, "ZoOm initialization status: " + res);
            }, function (err) {
                showMsg(config.logs, err);
            });
        }, false);
    }
    /**
     * @param log boolean value to show the message or not
     * @param msg any data too be printed in console
     * Show the message in browser console */
    function showMsg(log, msg) {
        if (log) {
            console.log(msg);
        }
    }

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
            { type: core.NgModule, args: [{
                        providers: []
                    },] },
        ];
        /** @nocollapse */
        ZoomModule.ctorParameters = function () { return []; };
        return ZoomModule;
    }());

    exports.ZoomModule = ZoomModule;
    exports.ZoomService = ZoomService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
