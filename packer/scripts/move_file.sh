#!/bin/bash
echo "Contents of /tmp:"
ls -l /tmp

sudo cp -r /tmp/my-webapp-copy.zip /opt/my-webapp-copy.zip

# Print the contents of /tmp and /opt
echo "Contents of /tmp:"
ls -l /tmp

echo "Contents of /opt:"
ls -l /opt