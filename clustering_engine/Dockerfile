FROM python:3.9-alpine
FROM devashishupadhyay/scikit-learn-docker

RUN apt-get upgrade
RUN apt-get install -y  gcc python3-dev musl-dev

# We copy just the requirements.txt first to leverage Docker cache
COPY ./requirements.txt /app/requirements.txt

WORKDIR /app

RUN pip install -r requirements.txt

COPY . /app

EXPOSE 5000

CMD [ "python3", "-u", "main.py" ]