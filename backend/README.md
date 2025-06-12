
##  How to Run the Application Locally

### 🔧 Step 1: Setup the MySQL Database

Create a MySQL database named `your_db_name`:

```sql
CREATE DATABASE intern_shop_db;
```

### Step 2: Configure application.properties
Check that the following settings exist in:
```src/main/resources/application.properties```

``` 
spring.application.name=InternShop
spring.datasource.url=jdbc:mysql://localhost:3306/your_db_name?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
JWT_SECRET=secret_token
```
### Step 3: Seed database
On first run only, leave 
```
spring.jpa.hibernate.ddl-auto=create 
```
This will reset the DB and allow seeding.
After the first run (and once data is seeded), change this setting in application.properties:
```spring.jpa.hibernate.ddl-auto=update```

### Step 4: Run the app
```mvn spring-boot:run```







