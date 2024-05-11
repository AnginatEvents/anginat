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
# Region for the developer branch was us-east-1

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
```
