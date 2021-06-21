import { Injectable, Optional } from '@angular/core';
import { ZoomAuth, EnrollCallbackResponse, AuthCallbackResponse, ZoomVerifyResponse } from './utils';

declare var ZoomAuthentication: ZoomAuth;

@Injectable()

export class ZoomService {
    private isDeviceReady: boolean = false;
    private accessToken: string;
    private isZoomInitialized: boolean = false;

    constructor(@Optional() accessToken: string) {
        document.addEventListener('deviceready', () => {
            this.isDeviceReady = true;
            this.initialize();
        });

        this.accessToken = accessToken;
    }

    /**
     * Converts asyncronous callback type function to promise
     * @param func function that handles asyncrpnous script with callback
     * @param args arguments to pass into callback
     */
    private callbackToPromise<T>(func: Function, args?: any[]): Promise<T> {
        const params = args || [];

        return new Promise((resolve, reject) => {
            if(this.isDeviceReady) {
                // Exec promise
                if(ZoomAuthentication) {
                    func.apply({}, [...params, resolve, reject]);
                } else {
                    reject('Zoom Auth Plugin is not available or not installed');
                }
            } else {
                reject('Device is not ready');
            }
        });
    }

    /**
     * Initializes the zoOm SDK
     */
    private initialize = (): void => {
        this.callbackToPromise(ZoomAuthentication.initialize, [this.accessToken]).then(status => {
            // Based on status this.isZoomInitialized is set
            this.isZoomInitialized = true;
            return status;
        }).catch(e => e);
    }

    /**
     * Enrolls the new user into zoOm SDK
     * @param userId `string` unique user id
     * @param encryptionSecret `string` password kind of string for encrypting user data
     * @returns Promise that resolves user enrollment success response
     */
    public enroll = (userId: string, encryptionSecret: string): Promise<EnrollCallbackResponse> => this.callbackToPromise(ZoomAuthentication.enroll, [userId, encryptionSecret]);

    /**
     * Authenticate existed user into zoOm SDK
     * @param userId `string` unique user id
     * @param encryptionSecret `string` password kind of string to authorize user
     * @returns Promise that resolves user authorization success response
     */
    public authenticate = (userId: string, encryptionSecret: string): Promise<AuthCallbackResponse> => this.callbackToPromise(ZoomAuthentication.authenticate, [userId, encryptionSecret]);

    /**
     * Verifies the zoOm SDK working status
     * @returns Promise that resolves zoOm working status
     */
    public verify = (): Promise<ZoomVerifyResponse> => this.callbackToPromise(ZoomAuthentication.verify);

    /**
     * Resolves the version of the current zoOm SDK plugin
     * @return Promise that resolves version of the zoOm SDK plugin as a string
     */
    public getVersion = (): Promise<string> => this.callbackToPromise(ZoomAuthentication.getVersion);
    
    /**
     * Resolves zoOm SDK status
     * @returns Promise that resolves current zoOm SDK status, wether it is initialized or not
     */
    public getSdkStatus = (): Promise<any> => this.callbackToPromise(ZoomAuthentication.getSdkStatus);

    /**
     * Resolves user enrollment status based on given user id
     * @param userId `string` user unique id
     * @returns Promise that resolves the user enrollment status
     */
    public getUserEnrollmentStaus = (userId: string): Promise<any> => this.callbackToPromise(ZoomAuthentication.getUserEnrollmentStatus, [userId]);

    /**
     * Resolves boolean value wether user is enrolled or not
     * @param userId `string` unique user id
     * @returns Promise that resolves wether user is enrolled or not
     */
    public isUserEnrolled = (userId: string): Promise<boolean> => this.callbackToPromise(ZoomAuthentication.isUserEnrolled, [userId]);
}