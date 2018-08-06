ng-ft-zoom-sdk
-----------------------
This is the ionic/angular version of the [cordova-plugin-zoom-sdk](https://github.com/facetec/cordova-example-zoom-sdk).

Installation
-------------
**Plugin installation:**

**Cordova**: `cordova plugin add https://github.com/facetec/cordova-plugin-zoom-sdk`

**Ionic**: `ionic cordova plugin add https://github.com/facetec/cordova-plugin-zoom-sdk`

**Package installation:** `npm install ng-ft-zoom-sdk --save`

From an existing Cordova project, run `cordova plugin add https://github.com/facetec/cordova-plugin-zoom-sdk`

Initialization:
------

```typescript
    import { ZoomModule, ZoomConfig } from 'ng-ft-zoom-sdk';
    
    const zoomConfig: ZoomConfig = {
        token: "YOUR_ZOOM_API_TOKEN",
        logs: false
    };

    @NgModule({
        ...
        imports: [
            ZoomModule.forRoot(zoomConfig);
        ]
        ...
    });
```
Injecting Provider:
-----

```typescript
    import { ZoomService } from 'ng-ft-zoom-sdk';
    
    export class MyService {
        constuctor(
            protected zoom: ZoomService
        ) {}
    }
```

Enroll User:
----

```typescript
    import { ZoomService, EnrollCallbackResponse } from 'ng-ft-zoom-sdk';
    ....
    constructor(
        protected zoom: ZoomService
    ){}
    
    enrollUser() {
        this.zoom.enroll("user_id", "user_encrypted_secret").then((res: EnrollCallbackResponse) => {
            console.log(res.successful ? 'User enrolled' : 'Failed to enroll user.');
        }).catch(err => console.log(err));
    }
```

Authenticate User:
-----
```typescript
    import { ZoomService, AuthCallbackResponse } from 'ng-ft-zoom-sdk';
    ....
    constructor(
        protected zoom: ZoomService
    ){}
    
    authenticateUser() {
        this.zoom.authenticate("user_id", "user_encrypted_secret").then((res: AuthCallbackResponse) => {
            console.log(res.successful ? 'User enrolled' : 'Failed to enroll user.');
        }).catch(err => console.log(err));
    }
```

Check user enrollment:
----
```typescript
    import { ZoomService } from 'ng-ft-zoom-sdk';
    ....
    constructor(
        protected zoom: ZoomService
    ){}
    
    isUserEnrolled() {
        this.zoom.isUserEnrolled("user_id").then((status: boolean) => console.log(status)).catch(err => console.log(err));
    }
```

Get SDK Status:
-----
```typescript
    import { ZoomService } from 'ng-ft-zoom-sdk';
    ....
    constructor(
        protected zoom: ZoomService
    ){}
    
    getSdkStatus() {
        this.zoom.getSdkStatus().then((status: string) => console.log(status)).catch(err => console.log(err));
    }
```
Get SDK version:
-----
```typescript
    import { ZoomService } from 'ng-ft-zoom-sdk';
    ....
    constructor(
        protected zoom: ZoomService
    ){}
    
    getVersion() {
        this.zoom.getVersion().then((version: string) => console.log(version)).catch(err => console.log(err));
    }
```