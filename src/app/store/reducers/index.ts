import * as CompanyReducer from './company.reducers';

export const selectCompany = (state: CompanyReducer.State) => state.company;
export const selectCompanys = (state: CompanyReducer.State) => state.data;