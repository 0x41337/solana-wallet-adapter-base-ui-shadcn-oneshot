"use client"

import { Button } from "@/components/ui/button"
import { Wallet } from "@/components/complex/wallet"

import { useWallet } from "@solana/wallet-adapter-react"

export default function Page() {
    const { connected, publicKey } = useWallet()

    if (connected) {
        console.log(
            `🎉 Everything is working! To prove it, here is your public key: ${publicKey} 🎉`
        )
    }

    return (
        <main>
            {/* background */}
            <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]"></div>

            <div className="flex flex-col text-center items-center min-h-screen justify-center gap-5">
                <a href="https://github.com/0x41337/solana-wallet-adapter-base-ui-shadcn-oneshot">
                    <Button
                        variant="outline"
                        className="rounded-full hover:cursor-pointer"
                    >
                        See the project on github
                    </Button>
                </a>
                <h1 className="text-4xl font-bold tracking-tight">
                    Integrate with Solana in minutes not weeks!
                </h1>
                <p className="leading-4 max-w-lg">
                    Copy and Paste, Easy to use and understand. We've done the
                    hard work, now you just need to customize it however you
                    want, and you'll be able to connect wallets to your dAPP!
                </p>
                <Wallet />
            </div>
        </main>
    )
}
