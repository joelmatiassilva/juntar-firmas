FROM python:latest
COPY dist /
EXPOSE 80
CMD python -m http.server 80
