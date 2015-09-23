Vagrant.configure('2') do |config|
  config.vm.define "web" do |web|
    web.vm.box = "ubuntu/vivid64"
    web.vm.network :private_network, ip: "192.168.11.4"
    web.vm.network "forwarded_port", guest: 80, host: 8080
    web.vm.provision :ansible do |ansible|
      ansible.inventory_path = "provisioning/hosts"
      ansible.playbook = "provisioning/web.yml"
      # ansible.verbose = true
    end
    web.vm.provider "virtualbox" do |vb|
      vb.customize ["modifyvm", :id, "--memory", 1024]
      vb.customize ["modifyvm", :id, "--cpus", 2]
    end
  end
end
