server {
    
    root /var/www/covid;
    index  index.php index.html index.htm;
	server_name covid.accureference.com;
    client_max_body_size 100M;
	
	
	location / {




		if ($request_method = 'OPTIONS') {
			add_header 'Access-Control-Allow-Origin' '*';
			add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
			#
			# Custom headers and headers various browsers *should* be OK with but aren't
			#
			add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range';
			#
			# Tell client that this pre-flight info is valid for 20 days
			#
			add_header 'Access-Control-Max-Age' 1728000;
			add_header 'Content-Type' 'text/plain; charset=utf-8';
			add_header 'Content-Length' 0;
			return 204;
		}

		add_header 'Access-Control-Allow-Origin' '*';
		add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
		add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range';
		add_header 'Access-Control-Expose-Headers' 'Content-Length,Content-Range';



        try_files $uri $uri/ /index.php?$query_string;       
    }

    location ~ \.php$ {
        try_files $uri =404;
        fastcgi_split_path_info  ^(.+\.php)(/.+)$;
        fastcgi_index            index.php;
        fastcgi_pass             unix:/var/run/php/php7.2-fpm.sock;        # for Ubuntu 17.10
        include                  fastcgi_params;
        fastcgi_param   PATH_INFO       $fastcgi_path_info;
        fastcgi_param   SCRIPT_FILENAME $document_root$fastcgi_script_name;
    }


    listen [::]:443 ssl ipv6only=on; # managed by Certbot
    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/covid.accureference.com/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/covid.accureference.com/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

}
server {
    if ($host = covid.accureference.com) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


    listen 80;
    listen [::]:80;
	server_name covid.accureference.com;
    return 404; # managed by Certbot


}