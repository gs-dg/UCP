import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    exception : [
        { id: '009abc123eg', name: 'ec2-instance-in-public-subnet', status: 'RESOURCE DELETED', severity: 'INFO', region: 'North California', approval: '12/08/2021', expiry: '22/06/2025', },
        { id: '009abc123ef', name: 'ec2-instance-in-private-subnet', status: 'EXPIRED', severity: 'CRITICAL', region: 'Oregon', approval: '01/03/2016', expiry: '01/06/2022', },
        { id: '0o6abc345ef', name: 'iam-users-old-key', status: 'ACTIVE', severity: 'HIGH', region: 'London', approval: '12/08/2021', expiry: '22/06/2025', },
        { id: '008abc125ij', name: 'directory-mfa-enabled', status: 'ACTIVE', severity: 'HIGH', region: 'Ohio', approval: '12/08/2021', expiry: '22/06/2025', },
        { id: '006pqr343cW', name: 's3-versioning-enabled', status: 'RECERTIFIED', severity: 'MEDIUM', region: 'Tokyo', approval: '07/03/2025', expiry: '22/06/2028', },
        { id: '0o5abc789jk', name: 'iam-users-new-key', status: 'NEW', severity: 'LOW', region: 'Paris', approval: '02/03/2025', expiry: '01/06/2026', },
        { id: '007dfg123xz', name: 'vpc-tag-compliance', status: 'ACTIVE', severity: 'LOW', region: 'Tokyo', approval: '12/08/2021', expiry: '22/06/2025', },
        { id: '009xyz678ab', name: 'dynamo-backups-disabled', status: 'RECERTIFIED', severity: 'LOW', region: 'London', approval: '07/03/2025', expiry: '22/06/2028', },
        { id: '006pqr343cv', name: 's3-versioning-disabled', status: 'RESOURCE DELETED', severity: 'MEDIUM', region: 'Mumbai', approval: '12/08/2021', expiry: '22/06/2025', },
        { id: '009abc124gh', name: 'directory-mfa-disabled', status: 'NEW', severity: 'CRITICAL', region: 'North Virginia', approval: '02/03/2025', expiry: '01/06/2026', },
    ],
    
    exception2 : [
        { id: '009abc123eg', name: 'ec2-instance-in-public-subnet', status: 'RESOURCE DELETED', severity: 'INFO', region: 'North California', approval: '12/08/2021', expiry: '22/06/2025', },
        { id: '0o6abc345ef', name: 'iam-users-old-key', status: 'ACTIVE', severity: 'HIGH', region: 'London', approval: '12/08/2021', expiry: '22/06/2025', },
        { id: '006pqr343cv', name: 's3-versioning-disabled', status: 'RESOURCE DELETED', severity: 'MEDIUM', region: 'Mumbai', approval: '12/08/2021', expiry: '22/06/2025', },
        { id: '008abc125ij', name: 'directory-mfa-enabled', status: 'ACTIVE', severity: 'HIGH', region: 'Ohio', approval: '12/08/2021', expiry: '22/06/2025', },
        { id: '0o5abc789jk', name: 'iam-users-new-key', status: 'NEW', severity: 'LOW', region: 'Paris', approval: '02/03/2025', expiry: '01/06/2026', },
        { id: '006pqr343cW', name: 's3-versioning-enabled', status: 'RECERTIFIED', severity: 'MEDIUM', region: 'Tokyo', approval: '07/03/2025', expiry: '22/06/2028', },
        { id: '009xyz678ab', name: 'dynamo-backups-disabled', status: 'RECERTIFIED', severity: 'LOW', region: 'London', approval: '07/03/2025', expiry: '22/06/2028', },
        { id: '009abc124gh', name: 'directory-mfa-disabled', status: 'NEW', severity: 'CRITICAL', region: 'North Virginia', approval: '02/03/2025', expiry: '01/06/2026', },
        { id: '009abc123ef', name: 'ec2-instance-in-private-subnet', status: 'EXPIRED', severity: 'CRITICAL', region: 'Oregon', approval: '01/03/2016', expiry: '01/06/2022', },
    ],

}

export const exceptionItemSlice = createSlice({
    name : 'exceptionItems',
    initialState,
    reducers : {}
})

export const {} = exceptionItemSlice.actions

export default exceptionItemSlice.reducer