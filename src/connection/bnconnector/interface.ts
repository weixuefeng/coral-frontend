import { Connector, ConnectParams } from "@thirdweb-dev/wallets";
import { AbstractClientWallet } from '@thirdweb-dev/wallets'
import { Signer, providers } from "ethers";
import type { Chain } from "@thirdweb-dev/chains";
import { OkxConnector } from "connection/btcconnector/connectors/Okx";
import { OKXWallet } from "@thirdweb-dev/react";


export class BinanceConnector extends OkxConnector {
  
}

export class BinanceWallet extends OKXWallet {
   
}
  