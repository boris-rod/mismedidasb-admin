import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { RouterModule, RouteReuseStrategy } from '@angular/router';
import { JwtInterceptor } from './http/jwt.interceptor';
import { HttpService } from './http/http.service';
import { RouteReusableStrategy } from './route-reusable-strategy';
import { SharedModule } from './shared/shared.module';

@NgModule({
    imports: [CommonModule, HttpClientModule, RouterModule, SharedModule],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true
        },
        {
            provide: HttpClient,
            useClass: HttpService
        },
        {
            provide: RouteReuseStrategy,
            useClass: RouteReusableStrategy
        }
    ]
})
export class CoreMismesModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreMismesModule) {
        // Import guard
        if (parentModule) {
            throw new Error(`${parentModule} has already been loaded. Import Core module in the AppModule only.`);
        }
    }
}