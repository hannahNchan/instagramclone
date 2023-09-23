import {
    AmplifyProjectInfo,
    AmplifyS3ResourceTemplate,
} from '@aws-amplify/cli-extensibility-helper'

export function override(
    resources: AmplifyS3ResourceTemplate,
    amplifyProjectInfo: AmplifyProjectInfo
) {
    // @ts-ignore
    resources.s3Bucket.publicAccessBlockConfiguration = {
        blockPublicAcls: false,
    }
    resources.addCfnResource(
        {
            type: 'AWS::S3::BucketPolicy',
            properties: {
                Bucket: {
                    Ref: 'S3Bucket',
                },
                PolicyDocument: {
                    Statement: [
                        {
                            Action: ['s3:GetObject'],
                            Effect: 'Allow',
                            Resource: [
                                {
                                    'Fn::Sub':
                                        'arn:aws:s3:::${S3Bucket}/protected/*',
                                },
                            ],
                            Principal: {
                                AWS: ['*'],
                            },
                        },
                    ],
                },
            },
        },
        'MyS3BucketPolicy'
    )
}