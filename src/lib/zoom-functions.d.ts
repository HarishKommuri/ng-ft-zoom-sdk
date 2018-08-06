import { ZoomConfig } from './interfaces';
/**
 * Initializes the face tech zoom face authentication service
 * @param token zoom api token
 */
export declare function initZoom(config: ZoomConfig): void;
/**
 * @param log boolean value to show the message or not
 * @param msg any data too be printed in console
 * Show the message in browser console */
export declare function showMsg(log: boolean | undefined, msg: any): void;
