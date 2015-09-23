Vagrant.configure('2') do |config|
  config.vm.define "web" do |web|
    web.vm.box = "ubuntu/vivid64"
    web.vm.network :private_network, ip: "192.168.11.4"
    web.vm.network "forwarded_port", guest: 80, host: 8080
    web.vm.provision :ansible do |ansible|
      ansible.inventory_path = "provisioning/hosts"
      ansible.playbook = "provisioning/web.yml"
      ansible.host_key_checking = false # http://stackoverflow.com/questions/23492032/cant-disable-ansibles-host-key-checking
      # ansible.verbose = true
    end
    web.vm.provider "virtualbox" do |vb|
      vb.customize ["modifyvm", :id, "--memory", 1024]
      vb.customize ["modifyvm", :id, "--cpus", 2]
    end
  end
end
