FROM openjdk:8-jdk-alpine
VOLUME /tmp
ARG DEPENDENCY=./build/dependency
COPY ${DEPENDENCY}/BOOT-INF/lib /app/lib
COPY ${DEPENDENCY}/META-INF /app/META-INF
COPY ${DEPENDENCY}/BOOT-INF/classes /app
RUN ["mkdir", "files"]
ENTRYPOINT ["java","-cp","app:app/lib/*","com.healer.webkakao.fileserver.FileserverApplication"]