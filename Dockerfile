FROM node:8-alpine

EXPOSE 3000

WORKDIR /web

COPY . /web/

RUN apk add --no-cache bash
RUN chmod +x wait_for_it.sh

RUN npm install

CMD ["./wait_for_it.sh","-t","20","database:3306", "--", "node", "app.js"]