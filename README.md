```
echo "192.168.12.8 ansible-provisioning.dev" >> /etc/hosts
```


#### gathering facts about hosts

```
ansible web \
  -i provisioning/hosts \
  --user=vagrant \
  --private-key=.vagrant/machines/web/virtualbox/private_key \
  -m setup
```
