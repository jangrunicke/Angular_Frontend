import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { NgModule } from '@angular/core';
import { Title } from '@angular/platform-browser';

@NgModule({
    declarations: [HomeComponent],
    imports: [HomeRoutingModule],

    // Der Singleton-Service "Title" wird benätigt
    providers: [Title],
})
export class HomeModule {}
