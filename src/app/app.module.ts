import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { MatSelectModule } from "@angular/material/select";
import { MatToolbarModule } from "@angular/material/toolbar";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";

import { AboutComponent } from "./about/about.component";
import { AppComponent } from "./app.component";
import { CountdownComponent } from "./countdown/countdown.component";
import { HomeComponent } from "./home/home.component";
import { InvolvementComponent } from "./involvement/involvement.component";
import { SoupTypeFormComponent } from "./forms/soup-type/soup-type-form.component";
import { FormsComponent } from "./forms/forms.component";

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		CountdownComponent,
		AboutComponent,
		InvolvementComponent,
		FormsComponent,
		SoupTypeFormComponent,
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
			{
				path: "test-forms",
				title: "Testing Forms",
				component: FormsComponent,
			},
		]),
		BrowserAnimationsModule,
		FormsModule,
		HttpClientModule,
		MatButtonModule,
		MatExpansionModule,
		MatFormFieldModule,
		MatIconModule,
		MatInputModule,
		MatMenuModule,
		MatSelectModule,
		MatToolbarModule,
		ReactiveFormsModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
