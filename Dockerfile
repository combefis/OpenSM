# Build:
# docker build -t opensm .
#
# Run:
# docker run -it opensm
#
# Compose:
# docker-compose up -d

FROM ubuntu:latest
MAINTAINER OpenSM

EXPOSE 80 443 3000 5858 8443 27017

ENV NODE_ENV development

# Install Utilities
RUN apt-get update -q  \
    && apt-get install -yqq \
    curl \
    git \
    ssh \
    gcc \
    make \
    python \
    mongodb \
    build-essential \
    libkrb5-dev \
    sudo \
    apt-utils \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Install nodejs
RUN curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
RUN sudo apt-get install -yq nodejs \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Install OpenSM Prerequisites
RUN npm install --quiet -g gulp bower yo mocha karma-cli pm2 && npm cache clean

RUN mkdir -p /opt/opensm/public/lib
WORKDIR /opt/opensm

COPY package.json /opt/opensm/package.json
RUN npm install --quiet && npm cache clean

COPY bower.json /opt/opensm/bower.json
COPY .bowerrc /opt/opensm/.bowerrc
RUN bower install --quiet --allow-root --config.interactive=false

COPY . /opt/opensm

# Run OpenSM server
CMD nohup mongod --dbpath /opt/opensm/ & sleep 5 && npm install && npm start
