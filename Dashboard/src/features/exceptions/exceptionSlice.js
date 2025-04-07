import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    exception : [
        { id: 1, name: 'ec2-instance-in-public-subnet', exceptions: 27, severity: 'INFO',  resources: 'AWS::EC2::Instance', category: 'Network Security', },
        { id: 2, name: 'dynamo-backups-disabled', exceptions: 0, severity: 'CRITICAL', resources: 'AWS::DynamoDB::Table', category: 'Data Protection', },
        { id: 3, name: 'iam-users-old-key', exceptions: 5, severity: 'HIGH', resources: 'AWS::IAM::User', category: 'IAM', },
        { id: 4, name: 'directory-mfa-disabled', exceptions: 12, severity: 'HIGH', resources: 'AWS::DirectoryService::SimpleAD, AWS::DirectoryService::MicrosoftAD', category: 'Network Security', },
        { id: 5, name: 's3-versioning-enabled', exceptions: 7, severity: 'MEDIUM', resources: 'AWS::S3::Bucket', category: 'Data Protection', },
        { id: 6, name: 'vpc-tag-compliance', exceptions: 15, severity: 'LOW', resources: 'AWS::EC::VPC', category: 'Network Security', },
    ],
    
    exception2 : [
        { id: 1, name: 'iam-users-old-key', exceptions: 5, severity: 'HIGH', resources: 'AWS::IAM::User', category: 'IAM', },
        { id: 2, name: 'dynamo-backups-disabled', exceptions: 0, severity: 'CRITICAL', resources: 'AWS::DynamoDB::Table', category: 'Data Protection', },
        { id: 3, name: 'directory-mfa-disabled', exceptions: 12, severity: 'HIGH', resources: 'AWS::DirectoryService::SimpleAD, AWS::DirectoryService::MicrosoftAD', category: 'Network Security', },
        { id: 4, name: 'vpc-tag-compliance', exceptions: 15, severity: 'LOW', resources: 'AWS::EC2::VPC', category: 'Network Security', },
        { id: 5, name: 's3-versioning-enabled', exceptions: 7, severity: 'MEDIUM', resources: 'AWS::S3::Bucket', category: 'Data Protection', },
        { id: 6, name: 'ec2-instance-in-public-subnet', exceptions: 27, severity: 'INFO',  resources: 'AWS::EC2::Instance', category: 'Network Security', },
        { id: 7, name: 'ec2-instance-in-private-subnet', exceptions: 10, severity: 'HIGH', resources: 'AWS::EC2::Instance', category: 'Network Security',},
    ],

}

export const exceptionSlice = createSlice({
    name : 'exceptions',
    initialState,
    reducers : {}
})

export const {} = exceptionSlice.actions

export default exceptionSlice.reducer