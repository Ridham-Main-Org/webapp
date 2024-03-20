#!/bin/bash

curl -sSO https://dl.google.com/cloudagents/add-google-cloud-ops-agent-repo.sh
sudo bash add-google-cloud-ops-agent-repo.sh --also-install

current_location=$(pwd)
echo "Current location after installing Ops Agent: $current_location"

# Create the directory if it doesn't exist
sudo mkdir -p /var/log/webapp

# Create an empty log file
sudo touch /var/log/webapp/myapp.log

# Set appropriate permissions if needed
sudo chmod 644 /var/log/webapp/myapp.log

config_file="/etc/google-cloud-ops-agent/config.yaml"

# Define the YAML content to be inserted
yaml_content=$(cat <<EOF
logging:
  receivers:
    my-app-receiver:
      type: files
      include_paths:
        - /var/log/webapp/myapp.log
      record_log_file_path: true
  processors:
    my-app-processor:
      type: parse_json
      time_key: time
      time_format: "%Y-%m-%d %H:%M:%S.%L%Z"
    move_severity:
      type: modify_fields
          map_values:
            debug: DEBUG
            info: INFO
            warn: WARN
            error: ERROR
            fatal: FATAL
      fields:
        severity:
          move_from: jsonPayload.level
  service:
    pipelines:
      default_pipeline:
        receivers: [my-app-receiver]
        processors: [my-app-processor, move_severity]
EOF
)

# Use sed to insert the YAML content after the license section
sudo sed -i '/^# limitations under the License.$/r /dev/stdin' "$config_file" <<< "$yaml_content"

sudo systemctl restart google-cloud-ops-agent
sudo systemctl enable google-cloud-ops-agent

