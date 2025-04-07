import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    configs : [
        { name: 'i-009abc123ef', id: 'i-009abc123ef', region: 'Oregon', compliance: 'COMPLIANT', annotation: 'Instance is launched in a private subnet' },
        { name: 'i-009abc124gh', id: 'i-009abc124gh', region: 'North Virginia', compliance: 'COMPLIANT', annotation: 'This resource is an exception' },
        { name: 'i-008abc125ij', id: 'i-008abc125ij', region: 'Ohio', compliance: 'NON-COMPLIANT', annotation: 'Instance is launched in a public subnet' },
        { name: 'i-0o6abc345ef', id: 'i-0o6abc345ef', region: 'London', compliance: 'COMPLIANT', annotation: 'Instance is in stopped state' },
        { name: 'i-0o5abc789jk', id: 'i-0o5abc789jk', region: 'Paris', compliance: 'NON-COMPLIANT', annotation: 'Instance is launched in a public subnet' },
        { name: 'i-007dfg123xz', id: 'i-007dfg123xz', region: 'Tokyo', compliance: 'COMPLIANT', annotation: 'Instance is in stopped state' },
        { name: 'i-009xyz678ab', id: 'i-009xyz678ab', region: 'London', compliance: 'COMPLIANT', annotation: 'This resource is an exception' },
        { name: 'i-006pqr343cv', id: 'i-006pqr343cv', region: 'Mumbai', compliance: 'NON-COMPLIANT', annotation: 'Instance is launched in a public subnet' },
        { name: 'i-009abc123eg', id: 'i-009abc123eg', region: 'North California', compliance: 'COMPLIANT', annotation: 'Instance is in stopped state' },
    ],
    
    configs2 : [
        { name: 'i-009abc124gh', id: 'i-009abc124gh', region: 'North Virginia', compliance: 'COMPLIANT', annotation: 'This resource is an exception' },
        { name: 'i-008abc125ij', id: 'i-008abc125ij', region: 'Ohio', compliance: 'NON-COMPLIANT', annotation: 'Instance is launched in a public subnet' },
        { name: 'i-0o5abc789jk', id: 'i-0o5abc789jk', region: 'Paris', compliance: 'COMPLIANT', annotation: 'Instance is launched in a public subnet' },
        { name: 'i-006pqr343cv', id: 'i-006pqr343cv', region: 'Mumbai', compliance: 'NON-COMPLIANT', annotation: 'Instance is launched in a public subnet' },
        { name: 'i-007dfg123xz', id: 'i-007dfg123xz', region: 'Tokyo', compliance: 'COMPLIANT', annotation: 'Instance is in stopped state' },
        { name: 'i-0o6abc345ef', id: 'i-0o6abc345ef', region: 'London', compliance: 'COMPLIANT', annotation: 'Instance is in stopped state' },
        { name: 'i-009abc123ef', id: 'i-009abc123ef', region: 'Oregon', compliance: 'NON-COMPLIANT', annotation: 'Instance is launched in a private subnet' },
        { name: 'i-009xyz678ab', id: 'i-009xyz678ab', region: 'London', compliance: 'COMPLIANT', annotation: 'This resource is an exception' },
        { name: 'i-009xyz679ac', id: 'i-009xyz679ac', region: 'Ohio', compliance: 'NON-COMPLIANT', annotation: 'Instance is launched in a public subnet' },
        { name: 'i-009abc123eg', id: 'i-009abc123eg', region: 'North California', compliance: 'COMPLIANT', annotation: 'Instance is in stopped state' },
    ],

}

export const configItemSlice = createSlice({
    name : 'configItems',
    initialState,
    reducers : {}
})

export const {} = configItemSlice.actions

export default configItemSlice.reducer