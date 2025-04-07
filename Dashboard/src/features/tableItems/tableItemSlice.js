import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data : [
        { id: 1, name: 'ec2-instance-in-public-subnet', autoRemediation: 'Enabled', resources: 'AWS::EC2::Instance', trigger: 'Configuration Change', severity: 'CRITICAL' },
        { id: 2, name: 'directory-mfa-disabled', autoRemediation: 'Disabled', resources: 'AWS::DirectoryService::SimpleAD, AWS::DirectoryService::MicrosoftAD ', trigger: 'Configuration Change', severity: 'HIGH' },
        { id: 3, name: 'iam-users-old-key', autoRemediation: 'Enabled', resources: 'AWS::IAM::User', trigger: 'Periodic, 24 Hours', severity: 'HIGH' },
        { id: 4, name: 'vpc-tag-compliance', autoRemediation: 'Disabled', resources: 'AWS::EC::VPC', trigger: 'Configuration Change', severity: 'LOW' },
        { id: 5, name: 'dynamo-backups-disabled', autoRemediation: 'Enabled', resources: 'AWS::DynamoDB::Table', trigger: 'Configuration Change', severity: 'LOW' },
        { id: 6, name: 's3-versioning-enabled', autoRemediation: 'Disabled', resources: 'AWS::S3::Bucket', trigger: 'Configuration Change', severity: 'LOW' },
    ],

    data2 : [
        { id: 1, name: 'directory-mfa-disabled', autoRemediation: 'Unavailable', resources: 'AWS::DirectoryService::SimpleAD, AWS::DirectoryService::MicrosoftAD ', trigger: 'Configuration Change', severity: 'HIGH' },
        { id: 2, name: 'ec2-instance-in-public-subnet', autoRemediation: 'Available', resources: 'AWS::EC2::Instance', trigger: 'Configuration Change', severity: 'CRITICAL' },
        { id: 3, name: 'iam-users-old-key', autoRemediation: 'Available', resources: 'AWS::IAM::User', trigger: 'Periodic, 24 Hours', severity: 'HIGH' },
        { id: 4, name: 'dynamo-backups-disabled', autoRemediation: 'Available', resources: 'AWS::DynamoDB::Table', trigger: 'Configuration Change', severity: 'LOW' },
        { id: 5, name: 'vpc-tag-compliance', autoRemediation: 'Unavailable', resources: 'AWS::EC::VPC', trigger: 'Configuration Change', severity: 'LOW' },
        { id: 6, name: 's3-versioning-enabled', autoRemediation: 'Unavailable', resources: 'AWS::S3::Bucket', trigger: 'Configuration Change', severity: 'LOW' },
        { id: 7, name: 'cloudwatch-logs-enabled', autoRemediation: 'Unavailable', resources: 'AWS::CloudWatch::Log', trigger: 'Periodic, 24 Hours', severity: 'HIGH' },
    ]
}

export const tableItemSlice = createSlice({
    name: 'tableItems',
    initialState,
    reducers : {}
})

export const {} = tableItemSlice.actions

export default tableItemSlice.reducer