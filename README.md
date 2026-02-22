# Application launch instructions

## 1. Application launch

The application requires a database server and web service to be running in order to function properly.

Possible ways to launch the database server:

### a) From the IDE level (e.g. IntelliJ IDEA, Eclipse)

1. Open the main class `IoApplication.java`
2. Run the `main()` method (e.g. right-click → "Run IoApplication")

### b) From the command line (Gradle)

./gradlew bootRun

How to run the web service:
1. Open a terminal (e.g., Command Prompt or Windows PowerShell on Windows).
2. Navigate to the project’s root directory (you can skip this step if the terminal is already opened in the project environment).
3. Use the command `cd src/main/frontend/io-app` to enter the directory containing the service files.
4. Start the service using the command `npm start`.

## 2. Available interfaces

### a) From the IDE level (e.g. IntelliJ IDEA, Eclipse)

1. REST endpoints http://localhost:8080/{endpoint_name}

2. API documentation (Swagger UI) http://localhost:8080/swagger-ui/index.html#

3. H2 console (in-memory database) http://localhost:8080/h2-console
   ### H2 database login credentials:
   ##### JDBC URL: jdbc:h2:mem:testdb
   ##### User Name: sa
   ##### Password: (empty - leave the field empty)
