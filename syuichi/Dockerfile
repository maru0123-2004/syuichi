FROM python:3.10.9-slim

WORKDIR /usr/src/app/backend
COPY ./syuichi/docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN adduser --system --shell /bin/bash nonroot && \
    pip install --no-cache-dir --upgrade poetry wheel pysu && \
    chmod +rx /usr/local/bin/docker-entrypoint.sh

USER nonroot

COPY pyproject.toml ./
COPY poetry.lock ./
COPY manage.py ./

RUN poetry install --no-cache --no-root --with postgres

USER root
RUN python3 -c "from urllib.request import urlretrieve; urlretrieve('https://download.docker.com/linux/debian/dists/bullseye/pool/stable/amd64/docker-ce-cli_24.0.7-1~debian.11~bullseye_amd64.deb', '/tmp/docker.deb')" && \
    dpkg -i /tmp/docker.deb && rm /tmp/docker.deb
ENV DJANGO_DEBUG=1
EXPOSE 8000
ENTRYPOINT [ "/usr/local/bin/docker-entrypoint.sh" ]
CMD  poetry run python manage.py migrate && poetry run python manage.py runserver