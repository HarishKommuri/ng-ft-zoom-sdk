import { Responses } from './responses';
/**
 * Initializes the face tech zoom face authentication service
 * @param token zoom api token
 */
export function initZoom(config) {
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
export function showMsg(log, msg) {
    if (log) {
        console.log(msg);
    }
}
//# sourceMappingURL=zoom-functions.js.map