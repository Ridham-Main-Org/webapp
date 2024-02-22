#variables here
// variable "app_code" {}
variable "project_id" {
  default = "celestial-gecko-414117"
}
variable "zone" {
  default = "us-west1-a"
}

packer {
  required_plugins {
    googlecompute = {
      source  = "github.com/hashicorp/googlecompute"
      version = "~> 1"
    }
  }
}
source "googlecompute" "gcp-centos8-custom-image" {
  project_id          = var.project_id
  source_image_family = "centos-stream-8"
  zone                = var.zone
  disk_size           = 20
  disk_type           = "pd-standard"
  image_name          = "webapp-image-{{timestamp}}"
  image_description   = "webapp Custom Image"
  image_family        = "webapp-custom-images"
  image_project_id    = var.project_id
  ssh_username        = "packer"
}

build {
  sources = ["source.googlecompute.gcp-centos8-custom-image"]

  provisioner "shell" {
    script = "./packer/scripts/add_user_group.sh"
  }

  provisioner "file" {
    source      = "./my-webapp-copy.zip"
    destination = "/tmp/"
  }

  provisioner "shell" {
    script = "./packer/scripts/move_file.sh"
  }

  provisioner "shell" {
    script = "./packer/scripts/install_postgres.sh"
  }

  provisioner "shell" {
    script = "./packer/scripts/install_dependencies.sh"
  }

  provisioner "shell" {
    script = "./packer/scripts/update_ownership.sh"
  }

  provisioner "shell" {
    script = "./packer/scripts/cp_configure_service_file_systemd.sh"
  }
}
