import { createAction, props } from '@ngrx/store';
import { Company } from 'src/app/models/company.model';

export const REGISTER = '[COMPANY] register';
export const REGISTER_SUCCESS = '[COMPANY] register Success';
export const REGISTER_ERROR = '[COMPANY] register Error';

export const register = createAction(REGISTER, props<{company: Company}>());
export const registerSuccess = createAction(REGISTER_SUCCESS, props<{company: Company}>());
export const registerError = createAction(REGISTER_ERROR, props<{payload : any}>());