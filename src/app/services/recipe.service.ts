import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, map } from "rxjs";
import { RECIPE_URL } from "src/constants";

@Injectable({
	providedIn: "root",
})
export class RecipeService {
	constructor(private http: HttpClient) {}
}
