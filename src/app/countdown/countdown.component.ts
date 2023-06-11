import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-countdown",
    templateUrl: "./countdown.component.html",
    styleUrls: ["./countdown.component.scss"],
})
export class CountdownComponent implements OnInit {
    days = 0;
    hours = 0;
    minutes = 0;
    seconds = 0;
    // clock = Date.now();

    ngOnInit() {
        this.days = 2;
        this.hours = 1;
        this.minutes = 3;
        this.seconds = 5;
        // setInterval(() => {
        //     const dateNow = new Date(Date.now());
        //     console.log("month", dateNow.getMonth());

        //     if (dateNow.getMonth() == 9) {
        //         console.log("meme");
        //     }
        // }, 1000);
    }
}
