import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { SoupType } from "src/app/models/soupType";
import { SoupTypeService } from "src/app/services/soup-type.service";

@Component({
	selector: "soup-type-form",
	templateUrl: "./soup-type-form.component.html",
	styleUrls: ["./soup-type-form.component.scss"],
})
export class SoupTypeFormComponent implements OnInit {
	@ViewChild("soupTypeForm")
	private soupTypeForm!: NgForm;
	soupTypeFg: FormGroup;
	constructor(private soupTypeService: SoupTypeService) {
		this.soupTypeFg = new FormGroup({
			typeId: new FormControl(0, []),
			typeName: new FormControl("", [Validators.required]),
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
	}

	updateSoupTypes() {
		this.soupTypeService.getSoupTypes().subscribe((soupTypes) => {
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
		this.soupTypeService.deleteSoupType(deletedSoupType.typeId).subscribe((res) => {
			if (res) {
				this.submissionMessage = `Deleted SoupType ${JSON.stringify(deletedSoupType)}`;
				this.updateSoupTypes();
				this.clearForm();
			} else {
				this.submissionMessage = `Could not delete SoupType ${JSON.stringify(
					deletedSoupType
				)}`;
			}
		});
	}

	submitForm() {
		if (this.soupTypeFg.valid) {
			console.log("Submit SoupType form with data", this.soupTypeFg.toString());
			this.soupTypeService
				.editSoupType(this.soupTypeService.buildSoupType(this.soupTypeFg.value))
				.subscribe((res) => {
					this.soupTypeForm.resetForm();
					this.submissionMessage = `DB response: ${JSON.stringify(res)}`;
					this.updateSoupTypes();
					console.log("Submitted SoupType form and returned", res);
				});
		}
	}
}
