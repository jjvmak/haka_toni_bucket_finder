From node:10-alpine

Run apk add --no-cache vim

Copy src /backend/src
Copy rData /backend/rData
Copy bucketfinder /frontend/bucketfinder

Run cd /frontend/bucketfinder && \
    npm install && \
    npm run build && \
    cp -r build /backend/src

Copy start.sh /usr/local/bin/
Run chmod ugo+x /usr/local/bin/start.sh

Workdir /backend/src

CMD [ "start.sh" ]
