export interface ZoomPluginOptions {
    authenticate?: (userId: string, encryptionSecret: string, success?: Function, error?: Function) => {};
    enroll?: (userId: string, encryptionSecret: string, success?: Function, error?: Function) => {};
    getSdkStatus?(success?: Function | undefined, error?: Function | undefined): void;
    getUserEnrollmentStatus?: (userId: string, success?: Function, error?: Function) => {};
    getVersion?: (success?: Function, error?: Function) => {};
    initialize?: (appToken: string | undefined, success?: Function, error?: Function) => {};
    isUserEnrolled?: (userId: string, success?: Function, error?: Function) => {};
    verify?: (success?: Function, error?: Function) => {};
}
export interface ZoomConfig {
    token?: string;
    logs?: boolean;
}
export interface EnrollCallbackResponse {
    faceEnrollmentState: string;
    livenessResult: string;
    status: string;
    successful: boolean;
}
export interface AuthCallbackResponse {
    successful: boolean;
    status: string;
    faceAuthenticatorState: string;
    livenessResult: string;
    countOfFaceFailuresSinceLastSuccess: number;
    consecutiveLockouts: number;
}
export interface ZoomInitOptions {
    code: number;
    state: string;
    initalized: boolean;
}
export interface ZoomVerifyResponse {
    status: string;
    successful: boolean;
}
