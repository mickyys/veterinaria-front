import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { CompanyService } from './../../providers/company.service';
import * as CompanyActions from '../actions/company.actions';
 
@Injectable()
export class  CompanyEffects {
 
  registerCompany$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CompanyActions.REGISTER),
      mergeMap(action => { 
            const { company } = action;
            return this.companyService.register(company)
            .pipe(
                map(company => ({ type: CompanyActions.REGISTER_SUCCESS, payload: company })),
                catchError((err) => of({ type: CompanyActions.REGISTER_ERROR, payload : err }))
            )
      })
    )
  );
 
  constructor(
    private actions$: Actions,
    private companyService: CompanyService
  ) {}
}