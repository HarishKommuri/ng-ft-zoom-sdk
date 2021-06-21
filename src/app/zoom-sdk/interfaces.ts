export interface ZoomAuth {
    initialize: (appToken: string, success: (data: any) => void, error: (error: string | Error) => void) => void,
    enroll: (userId: string, enscryptionSecret: string, success: (data: EnrollCallbackResponse) => void, error: (error: string | Error) => void) => void,
    authenticate: (userId: string, enscryptionSecret: string, success: (data: AuthCallbackResponse) => void, error: (error: string | Error) => void) => void,
    verify: (success: (data: ZoomVerifyResponse) => void, error: (error: string | Error) => void) => void,
    getVersion: (success: (data: string) => void, error: (error: string | Error) => void) => void,
    getSdkStatus: (success: (data: any) => void, error: (error: string | Error) => void) => void,
    getUserEnrollmentStatus: (userId: string, success: (data: any) => void, error: (error: string | Error) => void) => void,
    isUserEnrolled: (userId: string, success: (data: string) => void, error: (error: string | Error) => void) => void
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

export interface ZoomVerifyResponse {
    status: string;
    successful: boolean;
}