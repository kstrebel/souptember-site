import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

// import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { CountdownComponent } from "./countdown/countdown.component";
import { AboutComponent } from "./about/about.component";
import { InvolvementComponent } from "./involvement/involvement.component";
import { RouterModule } from "@angular/router";

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
            { path: "about", title: "About Souptember", component: AboutComponent },
            {
                path: "involvement",
                title: "Souptember Involvement",
                component: InvolvementComponent,
            },
        ]),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
