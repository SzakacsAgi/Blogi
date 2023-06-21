FROM maven:3.8.3-openjdk-17 AS builder

WORKDIR /app

COPY ./pom.xml pom.xml
COPY ./src src/

RUN mvn clean package

FROM eclipse-temurin:17-jre-alpine

COPY --from=builder app/target/blogi-frontend-latest.jar blogi-frontend-latest.jar

EXPOSE 8080

CMD ["java", "-jar", "blogi-frontend-latest.jar"]