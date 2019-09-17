# DETAIL on DEPLOYMENT

Server address:

```
    http://128.199.134.167

    PORT:
        -   testnest: 8546
        -   frontend: 82
        -   backend: 80
```

Ssh command:
```
    ssh root@128.199.134.167
```

Create ssh tunnel and browse file in VSC:
```
    rmate [filename]
```

Chain database link:
```
    /usr/src/truegrail-token/chaindb
```

Nginx configuration path:

```

    /etc/nginx/conf.d/default.conf
```

Some useful command:

   Find the total of inode of child folders (to solve the incident run out of inodes):


```
    find . -printf "%h\n" | cut -d/ -f-2 | uniq -c | sort -rn
```


## Ganache Network

Command to init:

```
   ganache-cli -i 5777 -m 'fiction lawn clown fabric horn tape naive shine luggage duty lumber call' --db /usr/src/truegrail-token/chaindb &
```

Configurations:

```
network_id: 5777
Ganache CLI v6.4.2 (ganache-core: 2.5.4)

Available Accounts
==================
(0) 0x91d0d05eb8e3157d734e7fc2ad8830030a60d374 (~100 ETH)
(1) 0x5642d66fbc8f157ce6055465bd93d74723a96168 (~100 ETH)
(2) 0xc46ae8f444d84cac73c90a2c8d1266c5f206dd26 (~100 ETH)
(3) 0x9d45312bd1a529cd29c5fb263e3a629aa144f4c7 (~100 ETH)
(4) 0x98d459b01cb4d0470badf055da5e42f3d179520e (~100 ETH)
(5) 0xfe457af97f17841e2964cc14c1836b7d9aadfc90 (~100 ETH)
(6) 0x5fab5febc0dd8dad08e2e7990146e5606b1a96d0 (~100 ETH)
(7) 0xc6bcb3529fc9897c4681141bd6a008e6309e2d92 (~100 ETH)
(8) 0x54ad32735c6eec33f18787f66cf1b2bc9fda47cc (~100 ETH)
(9) 0x0b026c1b0767c107d0b8a347578e1a60f7a8132e (~100 ETH)

Private Keys
==================
(0) 0x44b7d6fe45bd0fa2f0dfa3db95f1af252b55aa474e27230a0d6365405f458e7e
(1) 0xef5b21fd1c92525a6ec378e789d45721454d0eff7798c1aa28ddc182b36c995f
(2) 0x66f888b6d2bcdbaa9dedf0e0ab03813c8b375e9d2c7c0250ddf81667de3317ca
(3) 0x3386a0dd94ef731301a78203d92f847b221200a8169934e49750c957f8268c36
(4) 0x4baaa4f1c71cee7b7ecc11573d144145543d9c1f2a4001480eb60cc96fbc9017
(5) 0x887ecd7d52472c2cc5ac9b99812c3d458b1e3393e2535b7c497c59004b4468c4
(6) 0xd752bedfe0f120e6d3c87396ee2cd4b3a7fda52a58f3e22f9b60582c797ae731
(7) 0x28b257beaec02b561a2e40f3032fc65d8c75c5ee87f57522b047df2ac765db37
(8) 0x06fdfd5ffa2be94b5881361783cbb5004c03bdc64e7cb24fdd2fb51e5093a0a0
(9) 0xe9e796179cdd679b40e2607424091748a96c7bd18ab188d4d8d06b08ef60cdb0

HD Wallet
==================
Mnemonic:      fiction lawn clown fabric horn tape naive shine luggage duty lumber call
Base HD Path:  m/44'/60'/0'/0/{account_index}

Gas Price
==================
20000000000

Gas Limit
==================
6721975

Listening on 127.0.0.1:8546
```


## SQL server

configurations:

```
    username: root
    password:
    database: truegrail
    port: 3306
```



# Deployment procedure:
When updating the implementation of truegrail-token repository:
-   Rebuild the truegrail-token and get the new build file TrueGrailToken.json in build/contract
-   Copy that to file to truegrail-backend folder
