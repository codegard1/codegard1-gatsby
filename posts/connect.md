---
tags:
  - FreeNAS
  - ESXi
published: true
date: 2020-06-03T17:10:15.641Z
title: 'Connect '
---
I have two servers: an ESXi host running several VMs and a FreeNAS server for backup storage. Each one has two physical NIC's.

Goal: establish a network between the two hosts that is strictly for ISCSi traffic between ESXi and a ZFS volume on FreeNAS

## Create a ZFS on FreeNAS

1. From the FreeNAS web UI, open Storage > Pools > Add
2. Create a new ZFS volume called "backup2" (figure 1) 

![Create Backup2 ZVOL](/assets/annotation-2020-06-03-131554.png "Figure 1")

## Configure Second NIC on FreeNAS'

1. From the FreeNAS web UI, open Network > Add
2. Configure the second NIC with an IP address on a different network from the primary interface (figure 2)
