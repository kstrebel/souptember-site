import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SoupTypeFormComponent } from "./soup-type-form.component";

describe("SoupTypeFormComponent", () => {
	let component: SoupTypeFormComponent;
	let fixture: ComponentFixture<SoupTypeFormComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [SoupTypeFormComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(SoupTypeFormComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
