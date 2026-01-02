import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyUsers } from './my-users';

describe('MyUsers', () => {
  let component: MyUsers;
  let fixture: ComponentFixture<MyUsers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyUsers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyUsers);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
