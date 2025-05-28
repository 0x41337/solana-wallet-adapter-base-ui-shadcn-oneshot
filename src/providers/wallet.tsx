"use client"

import * as React from "react"

import { atom, useAtom } from "jotai"

import { clusterApiUrl } from "@solana/web3.js"

import {
    type WalletName,
    WalletAdapterNetwork,
} from "@solana/wallet-adapter-base"

import {
    WalletProvider,
    ConnectionProvider,
} from "@solana/wallet-adapter-react"

// Adapters
import { PhantomWalletName } from "@solana/wallet-adapter-phantom"
import { CoinbaseWalletName } from "@solana/wallet-adapter-coinbase"
import { SolflareWalletName } from "@solana/wallet-adapter-solflare"

import {
    PhantomWalletAdapter,
    CoinbaseWalletAdapter,
    SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets"

export type WalletProviderType = {
    icon: string
    name: string
    adapter: WalletName
}

export type WallerAtomType = {
    chosen: number
    wallets: WalletProviderType[]
}

export const walletAtom = atom<WallerAtomType>({
    chosen: 0,
    wallets: [
        {
            name: "Phantom",
            icon: "https://github.com/phantom.png",
            adapter: PhantomWalletName,
        },
        {
            name: "Coinbase",
            icon: "https://github.com/coinbase.png",
            adapter: CoinbaseWalletName,
        },
        {
            name: "Solflare",
            icon: "https://github.com/solflare-wallet.png",
            adapter: SolflareWalletName,
        },
    ],
})

export const useWalletState = () => {
    return useAtom(walletAtom)
}

export const SolanaProvider = ({ children }: { children: React.ReactNode }) => {
    const network = WalletAdapterNetwork.Mainnet

    const endpoint = React.useMemo(() => clusterApiUrl(network), [network])

    const wallets = React.useMemo(
        () => [
            new PhantomWalletAdapter({ network }),
            new CoinbaseWalletAdapter({ network }),
            new SolflareWalletAdapter({ network }),
        ],
        [network]
    )

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                {children}
            </WalletProvider>
        </ConnectionProvider>
    )
}
