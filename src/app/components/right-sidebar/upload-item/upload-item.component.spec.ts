/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UploadItemComponent } from './upload-item.component';

describe('UploadItemComponent', () => {
  let component: UploadItemComponent;
  let fixture: ComponentFixture<UploadItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});