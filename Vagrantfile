WEB_NET = "192.168.11."
WEB_RAM = 512
WEB_BOX = "ubuntu/vivid64"
WEB_PLAYBOOK_NAME = "web"
INVENTORY_NAME = "vagrant_hosts"
HOSTS = {
  "web1" => [WEB_NET+"10", WEB_RAM, WEB_BOX],
  "web2" => [WEB_NET+"11", WEB_RAM, WEB_BOX],
}

Vagrant.configure("2") do |config|
  HOSTS.each do | (name, cfg) |
    ip, ram, box = cfg
    config.vm.define name do |machine|
      machine.vm.hostname = name
      machine.vm.box = box
      machine.vm.network :private_network, ip: ip
      machine.ssh.insert_key = false
      machine.vm.provider "virtualbox" do |vb|
        vb.customize ["modifyvm", :id, "--memory", ram]
        vb.customize ["modifyvm", :id, "--cpus", 1]
      end
      machine.vm.provision :ansible do |ansible|
        ansible.inventory_path = "provisioning/#{INVENTORY_NAME}"
        ansible.playbook = "provisioning/#{WEB_PLAYBOOK_NAME}.yml"
        # ansible.verbose = "vvv"
        # workaround for ansible parallel execution 'issue':
        # in web.yml the synchronize module is used (rsync wrapper)
        # and it breaks when using ansible parallel execution mode.
        # it breaks because i get prompted the password for *both* machines
        ansible.limit = [ip]
      end
    end
  end
end
