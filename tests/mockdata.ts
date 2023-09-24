import { Parameter } from '@aws-sdk/client-ssm';

export const mockData: Parameter[] = [
  {
    "Name": "/production/services/my-service/pagination-limit",
    "Type": "String",
    "Value": "25",
    "Version": 1,
    "LastModifiedDate": new Date("2022-09-03T02:55:00.389000-04:00"),
    "ARN": "arn:aws:ssm:us-east-1:000000000000:parameter/production/services/my-service/pagination-limit",
    "DataType": "text"
  },
  {
    "Name": "/production/services/my-service/post-table",
    "Type": "String",
    "Value": "ProductionPostTable",
    "Version": 1,
    "LastModifiedDate": new Date("2022-09-03T02:55:00.389000-04:00"),
    "ARN": "arn:aws:ssm:us-east-1:000000000000:parameter/production/services/my-service/post-table",
    "DataType": "text"
  },
  {
    "Name": "/production/services/my-service/default-language",
    "Type": "String",
    "Value": "en",
    "Version": 1,
    "LastModifiedDate": new Date("2022-09-03T02:55:00.389000-04:00"),
    "ARN": "arn:aws:ssm:us-east-1:000000000000:parameter/production/services/my-service/default-language",
    "DataType": "text"
  },
  {
    "Name": "/production/services/my-service/port",
    "Type": "String",
    "Value": "3000",
    "Version": 1,
    "LastModifiedDate": new Date("2022-09-03T02:55:00.389000-04:00"),
    "ARN": "arn:aws:ssm:us-east-1:000000000000:parameter/production/services/my-service/port",
    "DataType": "text"
  },
  {
    "Name": "/production/services/my-service/db-connection-string",
    "Type": "String",
    "Value": "mongodb://127.0.0.1:27017/",
    "Version": 1,
    "LastModifiedDate": new Date("2022-09-03T02:55:00.389000-04:00"),
    "ARN": "arn:aws:ssm:us-east-1:000000000000:parameter/production/services/my-service/db-connection-string",
    "DataType": "text"
  },
  {
    "Name": "/production/services/my-service/db-name",
    "Type": "String",
    "Value": "myServiceDB",
    "Version": 1,
    "LastModifiedDate": new Date("2022-09-03T02:55:00.389000-04:00"),
    "ARN": "arn:aws:ssm:us-east-1:000000000000:parameter/production/services/my-service/db-name",
    "DataType": "text"
  },
  {
    "Name": "/production/services/my-service/signup-with-facebook",
    "Type": "String",
    "Value": "true",
    "Version": 1,
    "LastModifiedDate": new Date("2022-09-03T02:55:00.389000-04:00"),
    "ARN": "arn:aws:ssm:us-east-1:000000000000:parameter/production/services/my-service/signup-with-facebook",
    "DataType": "text"
  },
  {
    "Name": "/production/services/my-service/signup-with-google",
    "Type": "String",
    "Value": "false",
    "Version": 1,
    "LastModifiedDate": new Date("2022-09-03T02:55:00.389000-04:00"),
    "ARN": "arn:aws:ssm:us-east-1:000000000000:parameter/production/services/my-service/signup-with-google",
    "DataType": "text"
  },
  {
    "Name": "/production/services/my-service/signup-with-password",
    "Type": "String",
    "Value": "false",
    "Version": 1,
    "LastModifiedDate": new Date("2022-09-03T02:55:00.389000-04:00"),
    "ARN": "arn:aws:ssm:us-east-1:000000000000:parameter/production/services/my-service/signup-with-password",
    "DataType": "text"
  },
  {
    "Name": "/production/services/my-service/cache-ttl",
    "Type": "String",
    "Value": "86400",
    "Version": 1,
    "LastModifiedDate": new Date("2022-09-03T02:55:00.389000-04:00"),
    "ARN": "arn:aws:ssm:us-east-1:000000000000:parameter/production/services/my-service/cache-ttl",
    "DataType": "text"
  },
  {
    "Name": "/production/services/my-service/token-salt",
    "Type": "String",
    "Value": "6228276c92eb195f1977ed7f49887e107b592a1a4d0e83a5",
    "Version": 1,
    "LastModifiedDate": new Date("2022-09-03T02:55:00.389000-04:00"),
    "ARN": "arn:aws:ssm:us-east-1:000000000000:parameter/production/services/my-service/token-salt",
    "DataType": "text"
  },
  {
    "Name": "/production/services/my-service/default-plan",
    "Type": "String",
    "Value": "basic",
    "Version": 1,
    "LastModifiedDate": new Date("2022-09-03T02:55:00.389000-04:00"),
    "ARN": "arn:aws:ssm:us-east-1:000000000000:parameter/production/services/my-service/default-plan",
    "DataType": "text"
  },
];
