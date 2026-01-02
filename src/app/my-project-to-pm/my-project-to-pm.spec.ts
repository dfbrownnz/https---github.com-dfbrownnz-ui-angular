import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProjectToPm } from './my-project-to-pm';

describe('MyProjectToPm', () => {
  let component: MyProjectToPm;
  let fixture: ComponentFixture<MyProjectToPm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyProjectToPm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyProjectToPm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
