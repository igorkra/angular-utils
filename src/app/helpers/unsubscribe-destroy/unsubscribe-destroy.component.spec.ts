import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsubscribeOnDestroy } from './unsubscribe-destroy.component';
import { Component, OnInit, Inject } from '@angular/core';
import { of, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { not } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'test-component',
  template: ``
})
class TestComponent extends UnsubscribeOnDestroy implements OnInit {

  constructor(
    @Inject('subject') private subject: Subject<any>
  ) {
    super();
  }

  ngOnInit() {

    this.subject
    .pipe(takeUntil(this.d$))
    .subscribe(() => {
      this.doSomething();
    })
    
  }

  doSomething() {
  }
  
}

describe('UnsubscribeDestroyComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let callback: () => void;
  let subject = new Subject();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestComponent ],
      providers: [{
        provide: 'subject',
        useValue: subject
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    callback = jasmine.createSpy('doSomething');
    component.doSomething = callback;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('subscription works while alive', () => {
    subject.next('1');

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('on destroy will unsubscribe', () => {
    component.ngOnDestroy();

    subject.next('2');
    subject.next('3');
    subject.next('4');

    expect(callback).not.toHaveBeenCalledTimes(3);
    expect(callback).not.toHaveBeenCalled();
  });
});
