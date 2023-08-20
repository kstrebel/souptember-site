import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { AboutComponent } from "./about/about.component";
import { AppComponent } from "./app.component";
import { CountdownComponent } from "./countdown/countdown.component";
import { HomeComponent } from "./home/home.component";
import { InvolvementComponent } from "./involvement/involvement.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        CountdownComponent,
        AboutComponent,
        InvolvementComponent,
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot([
            { path: "", title: "Souptember Home", component: HomeComponent },
            {
                path: "about",
                title: "About Souptember",
                component: AboutComponent,
            },
            {
                path: "involvement",
                title: "Souptember Involvement",
                component: InvolvementComponent,
            },
        ]),
        BrowserAnimationsModule,
        MatToolbarModule,
        MatIconModule,
        MatMenuModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
