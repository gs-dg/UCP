import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data : [
        { id: 1, name: 'ec2-instance-in-public-subnet', status: 'enabled', severity: 'INFO',  resources: 'AWS::EC2::Instance'},
        { id: 2, name: 'dynamo-backups-disabled', status: 'enabled', severity: 'CRITICAL', resources: 'AWS::DynamoDB::Table'},
        { id: 3, name: 'iam-users-old-key', status: 'unavailable', severity: 'HIGH', resources: 'AWS::IAM::User', category: 'IAM', },
        { id: 4, name: 'directory-mfa-disabled', status: 'disabled', severity: 'HIGH', resources: 'AWS::DirectoryService::SimpleAD, AWS::DirectoryService::MicrosoftAD'},
        { id: 5, name: 's3-versioning-enabled', status: 'enabled', severity: 'MEDIUM', resources: 'AWS::S3::Bucket'},
        { id: 6, name: 'vpc-tag-compliance', status: 'disabled', severity: 'LOW', resources: 'AWS::EC::VPC',},
    ],

    data2 : [
        { id: 1, name: 'vpc-tag-compliance', status: 'disabled', severity: 'LOW', resources: 'AWS::EC2::VPC',},
        { id: 2, name: 'ec2-instance-in-public-subnet', status: 'enabled', severity: 'INFO',  resources: 'AWS::EC2::Instance'},
        { id: 3, name: 'iam-users-old-key', status: 'unavailable', severity: 'HIGH', resources: 'AWS::IAM::User', category: 'IAM', },
        { id: 4, name: 'dynamo-backups-disabled', status: 'enabled', severity: 'CRITICAL', resources: 'AWS::DynamoDB::Table'},
        { id: 5, name: 's3-versioning-enabled', status: 'enabled', severity: 'MEDIUM', resources: 'AWS::S3::Bucket'},
        { id: 6, name: 'directory-mfa-disabled', status: 'disabled', severity: 'HIGH', resources: 'AWS::DirectoryService::SimpleAD, AWS::DirectoryService::MicrosoftAD'},
        { id: 7, name: 'ec2-instance-in-private-subnet', status: 'disabled', severity: 'HIGH', resources: 'AWS::EC2::Instance',},
    ],
}

export const remediationSlice = createSlice({
    name : 'remediations',
    initialState,
    reducers : {}
})

export const {} = remediationSlice.actions

export default remediationSlice.reducer