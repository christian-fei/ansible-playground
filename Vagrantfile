NET = "192.168.11"
RAM = 512
UBUNTU_BOX = "ubuntu/vivid64"
WEB_PLAYBOOK_NAME = "web"
LB_PLAYBOOK_NAME = "lb"
DB_PLAYBOOK_NAME = "db"
INVENTORY = "vagrant_inventory"
HOSTS = {
  lb:   [LB_PLAYBOOK_NAME,  "#{NET}.10", RAM, UBUNTU_BOX, 8080],
  web1: [WEB_PLAYBOOK_NAME, "#{NET}.11", RAM, UBUNTU_BOX, 8081],
  db:   [DB_PLAYBOOK_NAME,  "#{NET}.15", RAM, UBUNTU_BOX, 8085],
}

Vagrant.configure("2") do |config|
  HOSTS.each do | (name, cfg) |
    playbook_name, ip, ram, box, host_port = cfg
    config.vm.define name do |machine|
      machine.vm.hostname = name
      machine.vm.box = box
      machine.vm.network :private_network, ip: ip
      machine.ssh.insert_key = false
      machine.vm.provider :virtualbox do |vb|
        vb.customize ["modifyvm", :id, "--memory", ram]
        vb.customize ["modifyvm", :id, "--cpus", 1]
      end
      machine.vm.network :forwarded_port, guest: 80, host: host_port
      machine.vm.provision :ansible do |ansible|
        ansible.inventory_path = "provisioning/#{INVENTORY}"
        ansible.playbook = "provisioning/#{playbook_name}.yml"
        ansible.verbose = "vvv"
        # workaround for ansible parallel execution 'issue':
        # in web.yml the synchronize module is used (rsync wrapper)
        # and it breaks when using ansible parallel execution mode.
        # it breaks because i get prompted the password for *both* machines
        ansible.limit = [ip]
      end
    end
  end
end
