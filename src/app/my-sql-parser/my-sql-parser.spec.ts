import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MySqlParser } from './my-sql-parser';

describe('MySqlParser', () => {
  let component: MySqlParser;
  let fixture: ComponentFixture<MySqlParser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MySqlParser]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MySqlParser);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
