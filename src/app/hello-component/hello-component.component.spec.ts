import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelloComponentComponent } from './hello-component.component';
import {FormsModule} from '@angular/forms';
import {HelloServiceService} from '../hello-service.service';
import {HttpClientModule} from '@angular/common/http';

describe('HelloComponentComponent', () => {
  let component: HelloComponentComponent;
  let fixture: ComponentFixture<HelloComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelloComponentComponent ],
      imports: [ FormsModule ,  HttpClientModule],
      providers: [HelloServiceService],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelloComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
