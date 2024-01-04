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

RUN poetry install --no-cache

USER root
EXPOSE 8000
ENTRYPOINT [ "/usr/local/bin/docker-entrypoint.sh" ]
CMD  poetry run python manage.py runserver