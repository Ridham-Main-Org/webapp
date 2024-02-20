#!/bin/bash


#Copy service file to systemd
sudo cp /opt/my-webapp-copy/gcp-centos8.service /etc/systemd/system/

#Reload systemd to recognize the new service file
sudo systemctl daemon-reload

sudo systemctl start gcp-centos8.service

sudo systemctl enable gcp-centos8.service