import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    accounts : [
        {'name': 'Governance', 'ou': 'Prod', 'id': 123412341234, 'owner': 'Sam Doe', 'activeRegions': 25}, 
        {'name': 'Finance', 'ou': 'Prod', 'id': 123412341235, 'owner': 'Jone Doe', 'activeRegions': 32}, 
        {'name': 'Governance', 'ou': 'Non-Prod', 'id': 123412351236, 'owner': 'Alice Perry', 'activeRegions': 15}, 
        {'name': 'Finance', 'ou': 'Non-Prod', 'id': 123412351237, 'owner': 'Wan Der', 'activeRegions': 18}, 
        {'name': 'Governance', 'ou': 'Pilot', 'id': 123412361238, 'owner': 'Bob Perry', 'activeRegions': 12}, 
        {'name': 'Finance', 'ou': 'Pilot', 'id': 123412361239, 'owner': 'Zen Hung', 'activeRegions': 22}
      ]
}

export const accountSlice = createSlice({
    name : 'account',
    initialState,
    reducers : {}
})

export const {} = accountSlice.actions

export default accountSlice.reducer