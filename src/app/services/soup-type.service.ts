import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SoupType } from "../models/soupType";
import { Observable, catchError, map } from "rxjs";
import { RECIPE_URL, SOUP_TYPE_URL } from "src/constants";

@Injectable({
	providedIn: "root",
})
export class SoupTypeService {
	constructor(private http: HttpClient) {}

	getSoupTypes(): Observable<SoupType[]> {
		return this.http.get(`/${RECIPE_URL}/${SOUP_TYPE_URL}`).pipe(
			map((res) => {
				if (Array.isArray(res)) {
					const soupTypes: SoupType[] = [];
					res.forEach((element) => {
						soupTypes.push(this.buildSoupType(element));
					});
					return soupTypes;
				} else {
					throw new Error("Unexpected response format in getSoupTypes");
				}
			})
		);
	}

	getSoupType(id: number | string): Observable<SoupType> {
		return this.http
			.get(`/${RECIPE_URL}/${SOUP_TYPE_URL}/${id}`)
			.pipe(map((res) => this.buildSoupType(res)));
	}

	editSoupType(soupType: SoupType): Observable<SoupType> {
		return this.http
			.post(`/${RECIPE_URL}/${SOUP_TYPE_URL}`, soupType)
			.pipe(map((res) => this.buildSoupType(res)));
	}

	deleteSoupType(id: number): Observable<boolean> {
		return this.http.delete(`/${RECIPE_URL}/${SOUP_TYPE_URL}/${id}`).pipe(
			map((res) => {
				console.log(res);
				return true;
			}),
			catchError(() => {
				throw new Error(`Could not delete SoupType with id ${id}`);
			})
		);
	}

	buildSoupType(data: unknown): SoupType {
		const convertedData = data as SoupType;
		// console.log("buildSoupType convertedData", convertedData);
		if (convertedData.typeId != null && convertedData.typeName) {
			return convertedData;
		} else {
			throw new Error("Cannot build SoupType from data");
		}
	}
}
