import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { RegisterComponent } from './register.component';
import _ from 'lodash';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let formBuilder : FormBuilder = new FormBuilder();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports : [ReactiveFormsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.form.valid).toBeFalsy();
  });

  it(`should form step one valid `, () => {
    component.formGroupStepOne.get('name').setValue('Hector Martinez');
    component.formGroupStepOne.get('email').setValue('test@test.cl');
    component.formGroupStepOne.get('password').setValue('1234567');
    component.formGroupStepOne.get('phone').setValue('111111111');
    component.formGroupStepOne.get('address').setValue('testing');
    component.formGroupStepOne.get('commune').setValue('testing');

    expect(component.formGroupStepOne.valid).toBeTrue();

  });

  it(`email should is valid `, () => {  
    component.formGroupStepOne.get('email').setValue('test@test.cl');
    expect(component.formGroupStepOne.get('email').valid).toBeTrue();
  });

  it(`should form step two valid `, () => {

    component.formGroupStepTwo.get('photo').setValue('testing');
    component.formGroupStepTwo.get('color').setValue('testing');

    expect(component.formGroupStepTwo.valid).toBeTrue();

  });


  it(`should form step three valid `, () => {

    (component.formGroupStepThree.get('hours') as FormGroup).get('start').setValue('9');
    (component.formGroupStepThree.get('hours') as FormGroup).get('end').setValue('21');
    (component.formGroupStepThree.get('days') as FormArray).setValue(
      [ 
        ..._.range(5).map(x =>  new FormControl(true)),  
        ..._.range(2).map(x =>  new FormControl(false))
      ]
    )
    component.formGroupStepThree.get('accept').setValue(true);
    expect(component.formGroupStepThree.valid).toBeTrue();

  });

 
});
