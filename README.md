```
echo "192.168.11.12 ansible-provisioning.dev" >> /etc/hosts
```

#### gathering facts about hosts

```
ansible web \
  -i provisioning/hosts \
  --user=vagrant \
  --private-key=.vagrant/machines/web/virtualbox/private_key \
  -m setup
```


#### restart api

```
ansible web \
  -i provisioning/hosts \
  --user=vagrant \
  --private-key=.vagrant/machines/web/virtualbox/private_key \
  -m command -a "sudo systemctl restart api"
```


#### see all the glory

```
tree -I node_modules
```

