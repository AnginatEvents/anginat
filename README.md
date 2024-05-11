# Anginat

## Environment variables

Set up the following environment variables

```env
# Used to encrypt the NextAuth.js JWT, and to hash email verification tokens. This is the default value for the secret option in NextAuth and Middleware.
# Generate using the openssl command in terminal
# openssl rand -base64 32

NEXTAUTH_SECRET=

# Canonical URL of the deployed website
# Eg: set to localhost:3000/ for developement

NEXTAUTH_URL=

# Credentials obtained from Google Cloud Console
# Used here for the OAuth
# https://developers.google.com/identity/protocols/oauth2

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Useless: Used to contain path to service_accounts.json
GOOGLE_APPLICATION_CREDS=


# We do now use firebase adapter anymore so this is kinda pointless but still here
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=

# AWS Credentials
# Read [AWS Permissions] below to find the exact perms needed for the DB user in IAM
# Region for the developer branch was us-east-1

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
```

## Creating the Table on DynamoDB

Since we use DynamoDB for our operations with Auth and OTP the tables need 
to be created with the correct Partition and Secondary Keys

<details>
<summary>User Authentication and Session Database</summary>
This table is named `user-auth` and contains all the details used by NextAuth

- Partition Key: `pk` Type: `String`
- Secondary Key: `sk` Type: `String`

Create a Global Secondary index called `GSI1` Read the Details Section below for info:
- Partition Key: `GSI1PK` Type: `String`
- Partition Key: `GSI1SK` Type: `String`

#### Details

This table is partitioned by users which has the format `USER#<uuid>` which is used by NextAuth internally.
However since we also need to look users up by email, without using the EXTREMELY expensive Scan operation,
we have a Global Secondary Index that stores the email as a part of the Partition and Secondary Key.

This allows us to use the Query/Get operation on the Global Secondary Index, which means we still get the
lightning fast reads while searching the user with email. See this
[function](https://github.com/AnginatEvents/anginat/blob/f75b9c2989770fb0a6cbe450e87de328ce846140/lib/db/dynamo_conn.ts#L81) to see this in use

PS: The email is only part of one of the objects that NextAuth Adapter creates which is for the object with
`type` as `USER`. There are other objects, Read DynamoDB Adapter for NextAuth for the details.


</details>

<details>
    <summary>User Uploaded Codes</summary>
This table is named `user-codes` and contains the codes that the user will upload using CSV files

- Partition Key: `pk` Type: `String`
- Secondary Key: `code` Type: `String`
</details>

## AWS Permissions

We try to create our IAM user with the minimum permissions for this project's DynamoDB Access.

- Open the AWS console and go to “IAM”, then “Users”.
- Create a new user. The purpose of this user is to give programmatic access to DynamoDB.
- Create an Access Key and then copy Key ID and Secret to your .env/.env.local file.
- Select “Add Permission” and “Create Inline Policy”.
- Copy the JSON below into the JSON input and replace region, account_id and table_name with your values.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "DynamoDBAccess",
      "Effect": "Allow",
      "Action": [
        "dynamodb:BatchGetItem",
        "dynamodb:BatchWriteItem",
        "dynamodb:Describe*",
        "dynamodb:List*",
        "dynamodb:PutItem",
        "dynamodb:DeleteItem",
        "dynamodb:GetItem",
        "dynamodb:Scan",
        "dynamodb:Query",
        "dynamodb:UpdateItem"
      ],
      "Resource": [
        "arn:aws:dynamodb:{region}:{account_id}:table/{table_name}",
        "arn:aws:dynamodb:{region}:{account_id}:table/{table_name}/index/GSI1"
      ]
    }
  ]
}
```
