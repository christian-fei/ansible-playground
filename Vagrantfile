WEB_NET = '192.168.11.'
WEB_RAM = 512
WEB_BOX = 'ubuntu/vivid64'
WEB_PLAYBOOK_NAME= 'web'
HOSTS = {
   "web1" => [WEB_PLAYBOOK_NAME, WEB_NET+"10", WEB_RAM, WEB_BOX],
   "web2" => [WEB_PLAYBOOK_NAME, WEB_NET+"11", WEB_RAM, WEB_BOX],
}

Vagrant.configure('2') do |config|
  HOSTS.each do | (name, cfg) |
    playbook_name, ip, ram, box = cfg
    config.vm.define name do |machine|
      machine.vm.hostname = name
      machine.vm.box = box
      machine.vm.network :private_network, ip: ip
      # machine.vm.network :forwarded_port, guest: 80, host: 8080
      machine.vm.provision :ansible do |ansible|
        ansible.inventory_path = "provisioning/hosts"
        ansible.playbook = "provisioning/#{playbook_name}.yml"
        ansible.limit = playbook_name
      end
      machine.vm.provider "virtualbox" do |vb|
        vb.customize ["modifyvm", :id, "--memory", ram]
        vb.customize ["modifyvm", :id, "--cpus", 1]
      end
    end
  end
end
