# jsPASAT

A customizable [Paced Auditory Serial Addition Test](https://en.wikipedia.org/wiki/Paced_Auditory_Serial_Addition_Test) (PASAT) measure built with [jsPsych](https://github.com/jodeleeuw/jsPsych).


## Basic installation (using Ubuntu 14.04, Upstart and Nginx)

Clone the repository:

    git clone git@github.com:shamrt/jsPASAT.git


Copy the Upstart configuration file (in `etc/`) to `/etc/init`, edit it as necessary, and make it executable:

    cp etc/upstart.conf /etc/init/jspasat.conf
    chmod +x /etc/init/jspasat.conf

Note: See [howtonode.org](http://howtonode.org/deploying-node-upstart-monit) if you have trouble.


Copy the Nginx configuration (modify it, too, as necessary):

    cp etc/nginx.conf /etc/nginx/sites-enabled/jspasat


Start the project:

    start jspasat
