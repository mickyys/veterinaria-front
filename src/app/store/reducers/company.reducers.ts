import { createReducer, on, Action } from "@ngrx/store";
import { Company } from "src/app/models/company.model";
import { register, registerError, registerSuccess } from "../actions/company.actions";

export interface State {
    data : [Company],
    company : Company,
    loaded : boolean,
    loading : boolean,
    error : any,
};

const estadoInicial : State = {
    data : null,
    company : null,
    loaded : false,
    loading : false,
    error : null
}

const companyReducer = createReducer(
    estadoInicial,
    on(register, state => ({ ...state,  loading : true, error : null })),
    on(registerSuccess, (state, { company }) => ({ ...state,  loading : false, loaded : true, data : [], company : company, error : null })),
    on(registerError, (state, { payload }) => ({ ...state,  loading : false, loaded : true, data : [], company : null, error : payload })),
);

export function reducer(state: State | undefined, action: Action) {
    return companyReducer(state, action);
}