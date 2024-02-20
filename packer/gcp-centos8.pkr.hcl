#variables here
// variable "app_code" {}
// variable "project_id" {}
// variable "zone" {}

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
  ssh_username        = "packer"

  // Additional builder configuration...
}

build {
  sources = ["source.googlecompute.gcp-centos8-custom-image"]

  provisioner "shell" {
    script = "scripts/add_user_group.sh"
  }

  // provisioner "file" {
  //     source      = var.app_code
  //     destination = "/tmp/${var.app_code}"
  // }
  // provisioner "file" {
  //   source      = "./my-webapp-copy.zip"
  //   destination = "/tmp/my-webapp-copy.zip"
  // }
  provisioner "file" {
    source      = "/Users/ridham/CLOUD-ASSIGNMENTS/my-webapp-copy.zip"
    destination = "/tmp/my-webapp-copy.zip"
  }

  provisioner "shell" {
    script = "scripts/move_file.sh"
  }

  provisioner "shell" {
    script = "scripts/install_postgres.sh"
  }

  provisioner "shell" {
    script = "scripts/install_dependencies.sh" # Path to your install dependencies script
  }

  provisioner "shell" {
    script = "scripts/update_ownership.sh"
    // args = ["${var.code_location}"]
  }

  provisioner "shell" {
    script = "scripts/cp_configure_service_file_systemd.sh"
  }

  //   post-processors = [
  //         {
  //         type   = "shell"
  //         script = "scripts/delete_zip.sh"
  //         // command = ["{{ .Path }}"]
  //     }
  //   ]

  post-processor "shell-local" {
    inline = [
      "chmod +x scripts/delete_zip.sh",
      "scripts/delete_zip.sh"
      ]
  }
}



// need to figure out how to take latest code zip file from git and copy here

#Add vpc value to default in builder block