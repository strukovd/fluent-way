#!/usr/bin/env bash

SERVER_IP=5.23.48.222

export JAVA_HOME=$(/usr/libexec/java_home -v 17)
sed -i '' 's/profiles.active: dev/profiles.active: client-api/g' ./core/src/main/resources/application.yaml && \
echo "CHANGED BUILD PROFILE TO PROD" && \

echo "BUILDING PROJECT..." && \
mvn clean package -DskipTests=true && \
echo "BUILD OK" && \

sed -i '' 's/profiles.active: client-api/profiles.active: dev/g' ./core/src/main/resources/application.yaml && \
echo "CHANGED BUILD PROFILE BACK TO DEV" && \

echo "SENDING COMMAND TO STOP SERVER..." || exit 1;
ssh "root@$SERVER_IP" "systemctl stop fluentway-client-server";
echo "SERVER STOP COMMAND SENT" && \

echo "COPYING JAR FILE TO SERVER..." && \
scp ./client/target/client-api.jar "root@$SERVER_IP":/opt && \
echo "JAR FILE COPIED TO SERVER" && \

echo "SENDING COMMAND TO START SERVER..." && \
scp ./fluentway-client-server.service "root@$SERVER_IP":/etc/systemd/system && \
ssh "root@$SERVER_IP" "systemctl daemon-reload" && \
ssh "root@$SERVER_IP" "systemctl start fluentway-client-server" && \

echo "DEPLOY SERVER $SERVER_IP OK" || echo "DEPLOY FAIL"
