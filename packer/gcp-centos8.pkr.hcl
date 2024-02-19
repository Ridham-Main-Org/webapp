packer {
  required_plugins {
    googlecompute = {
      source  = "github.com/hashicorp/googlecompute"
      version = "~> 1"
    }
  }
}
source "googlecompute" "gcp-centos8-custom-image" {
  project_id          = "celestial-gecko-414117"
  source_image_family = "centos-stream-8"
  zone                = "us-west1-a"
  disk_size           = 20
  disk_type           = "pd-standard"
  image_name          = "webapp-image-{{timestamp}}"
  image_description   = "webapp Custom Image"
  image_family        = "webapp-custom-images"
  image_project_id    = "celestial-gecko-414117"
  ssh_username = "packer"

  // Additional builder configuration...
}

build {
    sources = ["source.googlecompute.gcp-centos8-custom-image"]
  
    provisioner "shell" {
        inline = [
            "sudo groupadd csye6225",
            "sudo useradd -g csye6225 -s /usr/sbin/nologin csye6225"
            ]
        }
    provisioner "file" {
        source      = var.source_path
        destination = "/tmp/${var.file_name}"
    }

    provisioner "shell" {
        script = "scripts/move_file.sh"  # Path to your script file
    }
    provisioner "shell" {
        script = "scripts/install_dependencies.sh"  # Path to your install dependencies script
        args   = ["${var.code_location}"]
    }

    provisioner "shell"{
        script = "scripts/update_ownership.sh"
        arg = ["${var.code_location}"]
    }

    provisioner "shell"{
        script= "scripts/create_copy_service_file_systemd.sh"
        
    }



}



    // need to figure out how to take latest code zip file from git and copy here

#Add vpc value to default in builder block