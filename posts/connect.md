---
tags:
  - FreeNAS
  - ESXi
published: false
date: 2020-06-03T17:10:15.641Z
title: Connect ESXi Host Directly to FreeNAS
---
I have two servers: an ESXi host running several VMs and a FreeNAS server for backup storage. Each one has two physical NIC's.

Goal: establish a network between the two hosts that is strictly for ISCSi traffic between ESXi and a ZFS volume on FreeNAS

## Create a ZFS on FreeNAS

1. From the FreeNAS web UI, open Storage > Pools > Add
2. Create a new ZFS volume called "backup2" (figure 1) 

![Create Backup2 ZVOL](/assets/annotation-2020-06-03-131554.png "Figure 1")

## Configure Second NIC on FreeNAS

1. From the FreeNAS web UI, open Network > Add
2. Configure the second NIC with an IP address on a different network from the primary interface (figure 2)

   DHCP: No

   Autoconfigure IPv6: Yes

   IP Address: (e.g.) 192.168.3.200 

![Configure second NIC](/assets/annotation-2020-06-03-132627.png "Figure 2")

## Configure ISCSi for backup2

1. From the FreeNAS web UI, open Sharing > Block Shares (ISCSI)
2. Create a new portal group or edit the existing one to include the IP address of the secondary NIC (figure 3) and Save
3. Create an initiator for ESXi, using the expected IP address of the ESXi host's second NIC
4. Create an ISCSi Target called "backup2" that uses the portal group from step 2 and the initiator from step 3
5. Create an extent for the "backup2" zvol
6. Create an associated target that connects the backup2 target with the backup2 extent. Set the LUN ID to an otherwise unused number

![Configure ISCSI Portal](/assets/annotation-2020-06-03-133246.png "Figure 3")

## Configure Second NIC on ESXi

1. Create a Virtual Switch for ISCSi using the unused NIC
2. Create a new Port Group for ISCSi, VLAN ID 0
3. Create a new VMKernel w/ the ISCSi Switch and the ISCSi Port Group

   IP: 192.168.2.201

   IPv^ Autoconfigure: Yes

   No Services
