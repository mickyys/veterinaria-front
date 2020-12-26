import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import _ from 'lodash';
import * as CompanyReducers from './../../store/reducers/company.reducers';
import * as CompanyActions from './../../store/actions/company.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public steps = {
    step_one : 1,
    step_two : 2,
    step_three : 3
  }

  public myDate : Date = new Date();
  public color : any = "#9c27b0";
  public toggle : boolean = true;
  public step : number = this.steps.step_one;
  public fieldTextType: boolean = false;

  public submitStepOne : boolean = false;
  public submitStepTwo : boolean = false;
  public submitStepThree : boolean = false;

  public schedule = {
    hours : [..._.range(24)].map(i => +i + 1),
    days : ['LU','MA','MI','JU','VI','SA','DO'],
    start : 8,
    end : 21
  }

  public form : FormGroup;

  constructor(private formBuilder: FormBuilder, private store : Store<CompanyReducers.State>,){}

  ngOnInit() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('register-page');
    body.classList.add('off-canvas-sidebar');

    this.form = this.formBuilder.group({
      step_one :  this.formBuilder.group({
        name: [null, Validators.required],
        email: [null, [Validators.required, Validators.email]],
        password: ['', Validators.required],
        phone: ['', Validators.required],
        address: ['', Validators.required],
        commune: ['', Validators.required],
      }),
      step_two : this.formBuilder.group({
        photo: ['', Validators.required],
        color: [this.color, Validators.required],
      }),
      step_three : this.formBuilder.group({
        hours: this.formBuilder.group({
          start : [this.schedule.start, Validators.required],
          end : [this.schedule.end, Validators.required]
        }),
        days: new FormArray([ 
          ..._.range(5).map(x =>  new FormControl(true)),  
          ..._.range(2).map(x =>  new FormControl(false))
        ]),
        accept : ['', [Validators.required, Validators.requiredTrue]]
      }),
    });
  }

  get days(){
    return this.formGroupStepThree.get('days') as FormArray;
  }

  get formGroupStepOne() {
    return this.form.get("step_one") as FormGroup;
  }

  get formGroupStepTwo() {
    return this.form.get("step_two") as FormGroup;
  }

  get formGroupStepThree() {
    return this.form.get("step_three") as FormGroup;
  }

  public isFormGroupStepOneTouchOrDirty(name): boolean{
    return (this.submitStepOne || this.formGroupStepOne.get(name).dirty || this.formGroupStepOne.get(name).touched);
  }

  public isFormGroupStepTwoTouchOrDirty(name): boolean{
    return (this.submitStepTwo || this.formGroupStepTwo.get(name).dirty || this.formGroupStepTwo.get(name).touched);
  }
  
  public isFormGroupStepThreeTouchOrDirty(name): boolean{
    return (this.submitStepThree || this.formGroupStepThree.get(name).dirty || this.formGroupStepThree.get(name).touched);
  }  

  onSubmitStepOne(){
    this.submitStepOne = true;    
    if(this.formGroupStepOne.valid){
      this.step = this.steps.step_two;;
      this.submitStepOne = false;   
    }
  }

  onSubmitStepTwo(){
    this.submitStepTwo = true;   
    if(this.formGroupStepTwo.valid){
      this.step = this.steps.step_three;
      this.submitStepTwo = false;   
    }
  }

  onSubmitStepThree(){
    this.submitStepThree = true;   
    if(this.formGroupStepThree.valid){
      this.step = 4;
      this.submitStepThree = false;  
      this.store.dispatch(CompanyActions.register({
        ...this.formGroupStepOne.value,
        ...this.formGroupStepTwo.value,
        ...this.formGroupStepThree.value
      }));
    }
  }

  backStepOne(){
    this.step = this.steps.step_one;
  }

  backStepTwo(){
    this.step = this.steps.step_two;
  }

  handleUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        this.formGroupStepTwo.get('photo').setValue(reader.result);
    };  
  }

  cancelUpload(){
    this.formGroupStepTwo.get('photo').setValue(null);
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  ngOnDestroy(){
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('register-page');
    body.classList.remove('off-canvas-sidebar');
  }

}
