FROM python:3.11-slim
WORKDIR /app
ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1
COPY pyproject.toml .
RUN pip install --upgrade pip && pip install --no-cache-dir -e .
COPY app ./app
EXPOSE 4002
CMD ["uvicorn","app.main:app","--host","0.0.0.0","--port","4002"]
