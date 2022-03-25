FROM httpd:2.4.46-alpine
COPY dist/ /usr/local/apache2/htdocs/
COPY apache/.htaccess /usr/local/apache2/htdocs/
COPY apache/httpd.conf /usr/local/apache2/conf/httpd.conf
RUN chmod -R 755 /usr/local/apache2/htdocs/
EXPOSE 80
