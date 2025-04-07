import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    resources : [
        {resource: 'arn:aws:iam:ap-south-1:123412341234:iam-role', type: 'IAM', 'id': 123412341234, region: 'ap-south-1', compliance: 'COMPLIANT'}, 
        {resource: 'arn:aws:s3:global:123412341235:s3-bucket', type: 'S3', 'id': 123412341235, region: 'global', compliance: 'NON-COMPLIANT'}, 
        {resource: 'arn:aws:iam:us-east-1:123412351236:iam-user', type: 'IAM', 'id': 123412351236, region: 'us-east-1', compliance: 'COMPLIANT'}, 
        {resource: 'arn:aws:config:eu-west-1:123412351237:config-disabled', type: 'config', 'id': 123412351237, region: 'eu-west-1', compliance: 'COMPLIANT'}, 
        {resource: 'arn:aws:vpc:eu-north-1:123412351238:vpc-subnet', type: 'VPC', 'id': 123412361238, region: 'eu-north-1', compliance: 'NON-COMPLIANT'}, 
        {resource: 'arn:aws:ec2:us-east-1:123412361239:ec2-instance', type: 'EC2', 'id': 123412361239, region: 'us-east-1', compliance: 'COMPLIANT'},
        {resource: 'arn:aws:vpc:ap-south-1:123412361242:vpc-az', type: 'VPC', 'id': 123412361242, region: 'ap-south-1', compliance: 'COMPLIANT'},
        {resource: 'arn:aws:config:eu-north-1:123412361243:config-resource', type: 'Config', 'id': 123412361243, region: 'eu-north-1', compliance: 'NON-COMPLIANT'},
        {resource: 'arn:aws:ec2:eu-west-1:123412361245:ec2-sg', type: 'EC2', 'id': 123412361245, region: 'eu-west-1', compliance: 'NON-COMPLIANT'}
    ], 

    resources2 : [
        {resource: 'arn:aws:iam:us-east-1:123412351236:iam-user', type: 'IAM', 'id': 123412351236, region: 'us-east-1', compliance: 'NON-COMPLIANT'}, 
        {resource: 'arn:aws:config:eu-west-1:123412351237:config-disabled', type: 'config', 'id': 123412351237, region: 'eu-west-1', compliance: 'COMPLIANT'}, 
        {resource: 'arn:aws:iam:ap-south-1:123412341234:iam-role', type: 'IAM', 'id': 123412341234, region: 'ap-south-1', compliance: 'COMPLIANT'}, 
        {resource: 'arn:aws:ec2:us-east-1:123412361239:ec2-instance', type: 'EC2', 'id': 123412361239, region: 'us-east-1', compliance: 'COMPLIANT'},
        {resource: 'arn:aws:vpc:eu-north-1:123412351238:vpc-subnet', type: 'VPC', 'id': 123412361238, region: 'eu-north-1', compliance: 'COMPLIANT'}, 
        {resource: 'arn:aws:s3:global:123412341235:s3-bucket', type: 'S3', 'id': 123412341235, region: 'global', compliance: 'NON-COMPLIANT'}, 
        {resource: 'arn:aws:config:eu-north-1:123412361243:config-resource', type: 'Config', 'id': 123412361243, region: 'eu-north-1', compliance: 'NON-COMPLIANT'},
        {resource: 'arn:aws:vpc:ap-south-1:123412361242:vpc-az', type: 'VPC', 'id': 123412361242, region: 'ap-south-1', compliance: 'NON-COMPLIANT'},
    ], 
}

export const resourceSlice = createSlice({
    name : 'resource',
    initialState,
    reducers : {}
})

export const {} = resourceSlice.actions

export default resourceSlice.reducer