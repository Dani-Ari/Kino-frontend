FROM nginx:alpine

# Remove default nginx assets
RUN rm -rf /usr/share/nginx/html/*

# Copy static folder (includes css, js, pages, partials)
COPY static/ /usr/share/nginx/html/

# Copy index.html to root
COPY index.html /usr/share/nginx/html/

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]