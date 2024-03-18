#!/bin/bash

curl -sSO https://dl.google.com/cloudagents/add-google-cloud-ops-agent-repo.sh
sudo bash add-google-cloud-ops-agent-repo.sh --also-install

current_location=$(pwd)
echo "Current location after installing Ops Agent: $current_location"

# Create the directory if it doesn't exist
sudo mkdir -p /var/webapp

# Create an empty log file
sudo touch /var/webapp/myapp.log

# Set appropriate permissions if needed
sudo chmod 644 /var/webapp/myapp.log

config_file="/etc/google-cloud-ops-agent/config.yaml"

# Define the YAML content to be inserted
yaml_content=$(cat <<EOF
logging:
  receivers:
    my-app-receiver:
      type: files
      include_paths:
        - /var/webapp/myapp.log
      record_log_file_path: true
  processors:
    my-app-processor:
      type: parse_json
      time_key: time
      time_format: "%Y-%m-%dT%H:%M:%S.%L%Z"
  service:
    pipelines:
      default_pipeline:
        receivers: [my-app-receiver]
        processors: [my-app-processor]
EOF
)

# Use sed to insert the YAML content after the license section
sudo sed -i '/^# limitations under the License.$/r /dev/stdin' "$config_file" <<< "$yaml_content"


