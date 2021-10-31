FROM gw000/keras:2.1.4-py3

RUN mkdir /app
WORKDIR /app

# install dependencies from debian packages
RUN apt-get update -qq \
 && apt-get install --no-install-recommends -y \
    python3-matplotlib \
    python3-pillow \
    python3-pip \
    python3-setuptools \
    python3-tk

RUN python3 --version

# install dependencies from python packages
RUN pip3 --no-cache-dir install \
    pandas \
    scipy \
    scikit-learn

RUN pip3 install --upgrade numpy==1.14

RUN pip3 --no-cache-dir install \
    statsmodels

RUN python3 -m pip install \
    Django==2.2.16 \
    djangorestframework

RUN pip3 install psycopg2-binary

RUN pip3 install tensorflowjs

# install your app

COPY . /app/

RUN pwd
RUN ls -la

# default command
CMD [ "python3", "manage.py", "runserver", "0.0.0.0:8000", "--nothreading"]
