# STAGE 1 - build do JAR usando Maven + JDK 17
FROM maven:3.9.4-eclipse-temurin-17 AS build
WORKDIR /workspace

# Copia apenas arquivos de definição primeiro para aproveitar cache
COPY pom.xml .
# Se houver settings ou outros arquivos necessários, copie-os também
# COPY settings.xml /root/.m2/settings.xml

# Copia o código-fonte
COPY src ./src

# Build (sem testes para acelerar; remova -DskipTests se quiser rodar testes)
RUN mvn -B -DskipTests package

# STAGE 2 - runtime menor com apenas o JRE
FROM eclipse-temurin:17-jre
WORKDIR /app

# Copia o JAR gerado no stage anterior
COPY --from=build /workspace/target/*.jar app.jar

# Porta da aplicação Spring Boot
EXPOSE 8080

# Start
CMD ["java", "-jar", "app.jar"]
