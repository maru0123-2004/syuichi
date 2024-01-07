#!/bin/sh
set -e

USER_ID=${LOCAL_USER_ID:-1000}
groupadd -f -g $(stat -c %g /var/run/docker.sock) docker
usermod -u $USER_ID -aG docker nonroot
chown -R nonroot ./

exec /usr/local/bin/pysu nonroot "$@"