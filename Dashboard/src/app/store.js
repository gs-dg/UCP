import { configureStore } from '@reduxjs/toolkit';
import accountReducer from '../features/accounts/accountSlice';
import tableItemReducer from '../features/tableItems/tableItemSlice';
import configItemReducer from '../features/configItems/configItemSlice';
import compItemReducer from '../features/compItems/compItemSlice';
import exceptionReducer from '../features/exceptions/exceptionSlice';
import exceptionItemReducer from '../features/exceptionItems/exceptionItemSlice';
import remediationReducer from '../features/remediations/remediationSlice';
import resourceReducer from '../features/resources/resourceSlice';

export const store = configureStore({
    reducer : {
        account : accountReducer, 
        tableItems : tableItemReducer, 
        configItems : configItemReducer,
        compTableItems: compItemReducer,
        exceptions: exceptionReducer,
        exceptionItems: exceptionItemReducer,
        remediations: remediationReducer,
        resource: resourceReducer,
    }
})