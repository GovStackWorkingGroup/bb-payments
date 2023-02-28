FROM node:14-alpine

RUN npm install -g @mockoon/cli@2.2.1
COPY mockoon-paymentsbbvoucher.json ./mockoon-paymentsbbvoucher.json

# Do not run as root.
RUN adduser --shell /bin/sh --disabled-password --gecos "" mockoon
RUN chown -R mockoon ./mockoon-paymentsbbvoucher.json
USER mockoon

EXPOSE 3003

ENTRYPOINT ["/entrypoint.sh"]

# Usage: docker run -p <host_port>:<container_port> mockoon-test