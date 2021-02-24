# BungeeServer
The BungeeServer is a stack template which uses Serverless, Sequelize/MySQL, AWS Lambda, and a custom REST API to create a seamless, out-of-the-box data server.
### ENV
The following variables should be outlined in your ```.env``` file.  Generating a ```bungee-server``` project with the ```bungee-cli``` will set many of these values for you.
```
AWS_REGION=
BUNGEE_APP_NAME=
BUNGEE_DEFAULT_DB=
BUNGEE_DB_HOST=
BUNGEE_DB_USER=
BUNGEE_DB_PASSWORD=
BUNGEE_RDS_INSTANCE_TYPE=
BUNGEE_STAGE=
```
### Build Project
```bash
npm run build          # Standard build
npm run build:clean    # Delete old build artifacts before building
```
### Local Development
```bash
npm run deploy:local
```

### Deploy to staging
```bash
npm run deploy:stage
```
---

## bungee-client
- API wrapper for bungee-server api(s)
- Uses ```bungee-lib```

---

## bungee-ui
- Browse & manage data
- Uses ```bungee-server``` via ```bungee-client```
### Local Development
```
npm run deploy:local
```

---
# TODO List

### bungee-lib

    
### bungee-client
- Query support
1- Unit tests

## bungee-serverless
- DB optimization
- Jest unit tests






