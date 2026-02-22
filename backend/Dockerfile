FROM maven:3-eclipse-temurin-25-alpine AS build
WORKDIR /app
COPY . .
RUN mvn package -DskipTests

FROM eclipse-temurin:25-alpine-3.23
COPY --from=build /app/target/subsly-backend-0.0.1-SNAPSHOT.jar /app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "-Dspring.profiles.active=prod" ,"/app.jar"]