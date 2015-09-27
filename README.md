This is an example of provisioning vagrant with ansible and fiddle around with a multi-host infrastructure.

Just `vagrant up` and 

```
echo "192.168.11.12 ansible-provisioning.dev" >> /etc/hosts
```

to get started.

The current infrastructure looks like this:

```
                      ------------------
                      |  HAProxy (lb)  |
                      ------------------
                      /                \
              ----------------   ----------------
              | proxy (web1) |   | proxy (web2) |
              ----------------   ----------------
             /  \                             / \
        ------- -------                 ------- -------
        | app | | api |                 | app | | api |
        ------- -------                 ------- -------
```



#### gathering facts about hosts

```
ansible web \
  -i provisioning/vagrant_hosts \
  --user=vagrant \
  --private-key=.vagrant/machines/web/virtualbox/private_key \
  -m setup
```


#### restart api

```
ansible web \
  -i provisioning/vagrant_hosts \
  --user=vagrant \
  --private-key=.vagrant/machines/web/virtualbox/private_key \
  -m command -a "sudo systemctl restart api"
```


#### see all the glory

```
tree -I node_modules
```

