FROM node:11 as npmbuild
ADD package.json /build/package.json
ADD package-lock.json /build/package-lock.json
WORKDIR /build
RUN npm i --production
ADD . /build
RUN npm run build
RUN mv /build/build /build/dist

FROM tiangolo/uwsgi-nginx-flask:python3.6

ADD . /app
WORKDIR /app
RUN pip install -r requirements.txt
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf
ADD custom_nginx.conf /nginx-config/nginx.conf
COPY --from=npmbuild /build/dist /frontend