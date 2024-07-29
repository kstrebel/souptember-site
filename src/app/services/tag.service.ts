import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, map } from "rxjs";
import { Tag } from "../models/tag";
import { RECIPE_URL, TAG_URL } from "src/constants";

@Injectable({
	providedIn: "root",
})
export class TagService {
	constructor(private http: HttpClient) {}

	getTags(): Observable<Tag[]> {
		return this.http.get(`/${RECIPE_URL}/${TAG_URL}`).pipe(
			map((res) => {
				if (Array.isArray(res)) {
					const tags: Tag[] = [];
					res.forEach((element) => {
						tags.push(this.buildTag(element));
					});
					return tags;
				} else {
					throw new Error("Unexpected response format in getTags");
				}
			})
		);
	}

	getTag(id: number): Observable<Tag> {
		return this.http
			.get(`/${RECIPE_URL}/${TAG_URL}/${id}`)
			.pipe(map((res) => this.buildTag(res)));
	}

	editTag(tag: Tag): Observable<Tag> {
		return this.http
			.post(`/${RECIPE_URL}/${TAG_URL}`, tag)
			.pipe(map((res) => this.buildTag(res)));
	}

	deleteTag(id: number): Observable<boolean> {
		return this.http.delete(`/${RECIPE_URL}/${TAG_URL}/${id}`).pipe(
			map((res) => {
				console.log(res);
				return true;
			}),
			catchError(() => {
				throw new Error(`Could not delete Tag with id ${id}`);
			})
		);
	}

	buildTag(data: unknown): Tag {
		const convertedData = data as Tag;
		if (convertedData.tagId != null && convertedData.tagName) {
			return convertedData;
		} else {
			throw new Error("Cannot build Tag from data");
		}
	}
}
