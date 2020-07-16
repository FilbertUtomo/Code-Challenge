FROM php:7.3.1-apache
COPY ./usr/src/app
WORKDIR /tmp
ENV FLASK_APP index.html
ENV FLASK_RUN_HOST 0.0.0.0
RUN apk add --no-cache gcc musl-dev linux-headers
RUN git clone https://github.com/FilbertUtomo/To-do-List.git
EXPOSE 5001
COPY . .
CMD ["flask", "run"]