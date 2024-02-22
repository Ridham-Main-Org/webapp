#!/bin/bash


# Define the service file path
service_file="/opt/gcp-centos8.service"

# Create the service file using a here document
sudo tee "$service_file" > /dev/null <<-EOF
[Unit]
Description=CSYE 6225 App
ConditionPathExists=/opt/server.js
After=network.target

[Service]
Type=simple
User=csye6225
Group=csye6225
WorkingDirectory=/opt
ExecStart=/usr/bin/node /opt/server.js
Restart=always
RestartSec=3
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=csye6225

[Install]
WantedBy=multi-user.target
EOF

echo "Contents of $service_file:"
cat "$service_file"
# Copy service file to systemd
sudo cp "$service_file" /etc/systemd/system/

echo "Contents of /etc/systemd/system/ directory after copying:"
ls -l /etc/systemd/system/
# Reload systemd to recognize the new service file
sudo systemctl daemon-reload

# Start and enable the service
sudo systemctl start gcp-centos8.service
sudo systemctl enable gcp-centos8.service
