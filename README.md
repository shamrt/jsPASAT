# jsPASAT

A customizable [Paced Auditory Serial Addition Test](https://en.wikipedia.org/wiki/Paced_Auditory_Serial_Addition_Test) (PASAT) measure built with [jsPsych](https://github.com/jodeleeuw/jsPsych).


## Basic installation (using Ubuntu 14.04, Upstart and Nginx)

Clone the repository:

    git clone git@github.com:shamrt/jsPASAT.git

Clone the jsPsych submodule:

    git submodule init
    git submodule update

Copy the Upstart configuration file (in `etc/`) to `/etc/init`, edit it as necessary, and make it executable:

    cp etc/upstart.conf /etc/init/jspasat.conf
    chmod +x /etc/init/jspasat.conf

Note: See [howtonode.org](http://howtonode.org/deploying-node-upstart-monit) if you have trouble.


Copy the Nginx configuration (modify it, too, as necessary):

    cp etc/nginx.conf /etc/nginx/sites-enabled/jspasat


Start the project:

    start jspasat


## Data compilation

To compile the raw data out by jsPASAT, run the following commands (note: `python` [2.7], `pip`, and `virtualenv` are required).

First, setup your virtual environment:

    virtualenv env

Next, activate it (note: you'll need to activate each time you open a new terminal window):

    # in Linux
    source env/bin/activate
    # in Windows
    env/Scripts/activate.exe

Next, install the required python packages:

    pip install -r requirements.txt

Finally, run the Python script:

    python scripts/tidy_data.py

A new file will be created/updated in the `data` directory.


## Run tests

Unit tests for the data compilation code (along with mock data) can be run with the following:

    py.test scripts
