FROM node:lts-alpine

# create destination directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# copy the app, note .dockerignore
COPY . /usr/src/app/
RUN npm install

# build necessary, even if no static files are needed,
# since it builds the server as well
RUN npm run build

# expose 5000 on container
EXPOSE 5000

# set app serving to permissive / assigned
ENV NUXT_HOST=0.0.0.0
# set app port
ENV NUXT_PORT=5000

# start the app
CMD [ "npm", "start" ]
