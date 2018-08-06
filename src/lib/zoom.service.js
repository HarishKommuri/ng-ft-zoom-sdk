import { Injectable } from '@angular/core';
import { Responses } from './responses';
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
        { type: Injectable },
    ];
    /** @nocollapse */
    ZoomService.ctorParameters = function () { return []; };
    return ZoomService;
}());
export { ZoomService };
//# sourceMappingURL=zoom.service.js.map