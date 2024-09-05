import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationpagesComponent } from './authenticationpages.component';

describe('AuthenticationpagesComponent', () => {
  let component: AuthenticationpagesComponent;
  let fixture: ComponentFixture<AuthenticationpagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthenticationpagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthenticationpagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
