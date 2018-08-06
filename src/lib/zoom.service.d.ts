import { EnrollCallbackResponse, AuthCallbackResponse, ZoomVerifyResponse } from './interfaces';
export declare class ZoomService {
    constructor();
    /**
     * Check whether the global variable ZoomAuthentication is available or not
     */
    protected isZoomUsable(): Promise<any>;
    /**
     * Return a promise that checks the installation and initialization status of the zoom plugin
     * @param promise is an initiated promise that calls the native zoOm functions
     */
    protected PromiseExtended(): Promise<any>;
    /**
     * Return a promise that resolves zoOm initialize status
     */
    isZoomInitialized(): Promise<boolean>;
    /**
     * Return a promise the resolves the current zoOm SDK status
     */
    getSdkStatus(): Promise<string>;
    /**
     * Initialize the zoOm enrollment and enrolls the new zoOm user
     * @param userId user id of the new user
     * @param encryptionSecret secret passphrase of the new user
     *
     */
    enroll(userId: string, encryptionSecret: string): Promise<EnrollCallbackResponse>;
    /**
     * Initialize the zoOm authentication and authenticate the enrolled used with given enrolled credentials
     * @param userId user id of enrolled user to authenitcate
     * @param encryptionSecret secret passphrase of the enrolled user at the time of enroll
     */
    authenticate(userId: string, encryptionSecret: string): Promise<AuthCallbackResponse>;
    /**
     * Return a promise that resolves enrollment status of the given uer
     * @param userId user id used for enrollment
     */
    getUserEnrollmentStatus(userId: string): Promise<string>;
    /**
     * Return a promise that resolves the current version of zoom in use
     */
    getVersion(): Promise<string>;
    /**
     * Return a promise that resolves the enrollment status of given user
     * @param userId user id used for enrollment
     */
    isUserEnrolled(userId: string): Promise<boolean>;
    /**
     * Initialize the zoom verification and resolve the zoom working status
     */
    verify(): Promise<ZoomVerifyResponse>;
}
