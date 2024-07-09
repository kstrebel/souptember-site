import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { SoupType } from "src/app/models/soupType";
import { RecipeService } from "src/app/services/recipe.service";

@Component({
	selector: "soup-type-form",
	templateUrl: "./soup-type-form.component.html",
	styleUrls: ["./soup-type-form.component.scss"],
})
export class SoupTypeFormComponent implements OnInit {
	@ViewChild("soupTypeForm")
	private soupTypeForm!: NgForm;
	soupTypeFg: FormGroup;
	constructor(private recipeService: RecipeService) {
		this.soupTypeFg = new FormGroup({
			typeId: new FormControl(0, []),
			typeName: new FormControl("", [Validators.required]),
			// editing: new FormControl("0", []),
		});
	}

	soupTypeObj: SoupType = new SoupType();
	soupTypes: SoupType[] = [];
	submissionMessage = "";

	ngOnInit() {
		this.updateFormFromObj();
		this.updateSoupTypes();

		this.soupTypeFg.controls.typeId.valueChanges?.subscribe(async (newValue) => {
			if (newValue !== this.soupTypeObj.typeId) {
				if (newValue !== 0) {
					const newSoupTypeObj = this.soupTypes.find((type) => {
						return type.typeId === newValue;
					});
					this.soupTypeObj = newSoupTypeObj ? newSoupTypeObj : new SoupType();
				} else {
					this.soupTypeObj = new SoupType();
					this.soupTypeFg.controls.typeName.markAsUntouched();
				}
				this.updateFormFromObj();
			}
		});

		this.soupTypeFg.controls.typeName.valueChanges?.subscribe(() => {
			// this.updateFormFromObj();
			console.log("name changed", this.soupTypeFg.controls.typeName.value);
			// );
			this.soupTypeObj.typeName = this.soupTypeFg.controls.typeName.value;
			// ;
		});
	}

	updateSoupTypes() {
		this.recipeService.getSoupTypes().subscribe((soupTypes) => {
			//sort on backend pls
			this.soupTypes = soupTypes;
		});
	}

	updateFormFromObj() {
		this.soupTypeFg.controls.typeName.setValue(this.soupTypeObj.typeName);
	}

	clearForm() {
		this.soupTypeObj = new SoupType();
		this.soupTypeForm.resetForm();
	}

	deleteSoupType() {
		const deletedSoupType = this.soupTypeObj;
		this.recipeService.deleteSoupType(deletedSoupType.typeId).subscribe(() => {
			this.submissionMessage = `Deleted soup type ${deletedSoupType.typeName}`;
			this.updateSoupTypes();
			this.clearForm();
		});
	}

	submitForm() {
		if (this.soupTypeFg.valid) {
			console.log("submit form with data", this.soupTypeFg.value);
			// this.soupTypeObj=this.recipeService.buildSoupType(this.soupTypeFg.value);
			console.log("submit form with data obj", this.soupTypeObj);
			this.recipeService.editSoupType(this.soupTypeObj).subscribe((res) => {
				this.soupTypeForm.resetForm();
				this.submissionMessage = `Created soup type ${res.typeName}`;
				this.updateSoupTypes();
				console.log("Submitted form and returned", res);
			});
		}
	}
}
