# Bungee

## bungee-lib
- Environment management
- HTTP utilities

---
## bungee-server(less)

### Purpose
- DB Cluster
- Sequelize ORM
- REST API

### ENV
```
DEFAULT_DB,
DB_USER,
DB_PASSWORD,
DB_HOST
```
### Local Development
```
npm run deploy:local
```

### Deploy to staging
```
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






