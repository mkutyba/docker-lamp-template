FROM php:5.6-apache

ADD ./php/php.ini /usr/local/etc/php/php.ini

# apache mod rewrite
RUN a2enmod rewrite

# xdebug
RUN pecl install xdebug \
	&& echo zend_extension=xdebug.so > /usr/local/etc/php/conf.d/xdebug.ini

# composer
RUN curl -sS https://getcomposer.org/installer | php \
	&& mv composer.phar /usr/bin/composer

# additional packages
RUN pecl install zip \
	&& echo extension=zip.so > /usr/local/etc/php/conf.d/zip.ini

RUN apt-get update \
	&& apt-get install -y \
		git \
		libssl-dev \
		php5-intl \
		php5-gd \
        php5-mysql \
	&& rm -rf /var/lib/apt/lists/*
