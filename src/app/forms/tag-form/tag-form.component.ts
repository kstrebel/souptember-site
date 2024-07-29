import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { Tag } from "src/app/models/tag";
import { TagService } from "src/app/services/tag.service";

@Component({
	selector: "tag-form",
	templateUrl: "./tag-form.component.html",
	styleUrls: ["./tag-form.component.scss"],
})
export class TagFormComponent implements OnInit {
	@ViewChild("tagFrom")
	private tagForm!: NgForm;
	tagFg: FormGroup;
	constructor(private tagService: TagService) {
		this.tagFg = new FormGroup({
			tagId: new FormControl(0, []),
			tagName: new FormControl("", [Validators.required]),
		});
	}

	tagObj: Tag = new Tag();
	tags: Tag[] = [];
	submissionMessage = "";

	ngOnInit() {
		this.updateFormObj();
		this.updateTags();

		this.tagFg.controls.tagId.valueChanges?.subscribe(async (newValue) => {
			if (newValue !== 0) {
				const newTagObj = this.tags.find((tag) => {
					return tag.tagId === newValue;
				});
				this.tagObj = newTagObj ? newTagObj : new Tag();
			} else {
				this.tagObj = new Tag();
				this.tagFg.controls.tagName.markAsUntouched();
			}
			this.updateFormObj();
		});
	}

	updateTags() {
		this.tagService.getTags().subscribe((tags) => {
			this.tags = tags;
		});
	}

	updateFormObj() {
		this.tagFg.controls.tagName.setValue(this.tagObj.tagName);
	}

	clearForm() {
		this.tagObj = new Tag();
		this.tagForm.resetForm();
	}

	deleteTag() {
		const deletedTag = this.tagObj;
		this.tagService.deleteTag(deletedTag.tagId).subscribe((res) => {
			if (res) {
				this.submissionMessage = `Deleted Tag ${JSON.stringify(deletedTag)}`;
				this.updateTags();
				this.clearForm();
			} else {
				this.submissionMessage = `Could not delete Tag ${JSON.stringify(deletedTag)}`;
			}
		});
	}

	submitForm() {
		if (this.tagFg.valid) {
			console.log("Submit Tag form with data", this.tagFg.toString());
			this.tagService.editTag(this.tagService.buildTag(this.tagFg.value)).subscribe((res) => {
				this.tagForm.resetForm();
				this.submissionMessage = `DB response: ${JSON.stringify(res)}`;
				this.updateTags();
				console.log("Submitted Tag form and returned", res);
			});
		}
	}
}
