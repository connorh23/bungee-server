# BungeeServer
The BungeeServer is a stack template which uses Serverless, Sequelize/MySQL, AWS Lambda, and a custom REST API to create a seamless, out-of-the-box data server.
### ENV
The following variables should be outlined in your ```.env``` file.  Please note that environment keys with the prefix
```BUNGEE_``` are necessary for the application to function properly.
```
BUNGEE_AWS_REGION           /* AWS region for the application (i.e. 'us-west-2')    */
BUNGEE_APP_NAME             /* The name you're giving to your app!                  */
BUNGEE_DEFAULT_DB           /* Default database name in the MySQL RDS Instance      */
BUNGEE_DB_HOST              /* URL to your RDS instance                             */
BUNGEE_DB_USER              /* The username for your RDS Insance                    */
BUNGEE_DB_PASSWORD          /* The password for your RDS Instance                   */
BUNGEE_RDS_INSTANCE_TYPE    /* The EC2 Insance Type for your RDS Instancel
BUNGEE_STAGE
```
- All of these variables except ```BUNGEE_DB_HOST``` will be set automatically by the ```bungee-cli``` if you use it to create an application.
- ```BUNGEE_DB_HOST``` can be retrieved from the [RDS Console](https://us-west-2.console.aws.amazon.com/rds/home?region=us-west-2) once you have deployed the application
for the first time.
- A list of acceptable values for ```BUNGEE_RDS_INSTANCE_TYPE``` is available [here](https://aws.amazon.com/rds/instance-types/).

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







