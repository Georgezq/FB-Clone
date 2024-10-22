import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPubComponent } from './modal-pub.component';

describe('ModalPubComponent', () => {
  let component: ModalPubComponent;
  let fixture: ComponentFixture<ModalPubComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalPubComponent]
    });
    fixture = TestBed.createComponent(ModalPubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
