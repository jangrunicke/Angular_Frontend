import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
    selector: 'hs-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
    isHandset$: Observable<boolean> = this.breakpointObserver
        .observe(Breakpoints.Handset)
        .pipe(
            map(result => result.matches),
            shareReplay(),
        );

    constructor(private breakpointObserver: BreakpointObserver) {
        console.log('HeaderComponent.constructor()');
    }
}

// @Component({
//   selector: 'hs-header',

//   templateUrl: './header.component.html',

//   styleUrls: ['./header.component.css'],
// )}

// export class HeaderComponent {
//     isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
//     .pipe(
//       map(result => result.matches),
//       shareReplay()
//     );

//   constructor(private breakpointObserver: BreakpointObserver) {}
// }