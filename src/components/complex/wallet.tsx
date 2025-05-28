"use client"

import * as React from "react"

import { Slot } from "@radix-ui/react-slot"
import type { VariantProps } from "class-variance-authority"

import { useWallet } from "@solana/wallet-adapter-react"
import type { WalletName } from "@solana/wallet-adapter-base"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

import {
    Dialog,
    DialogTitle,
    DialogHeader,
    DialogTrigger,
    DialogContent,
    DialogDescription,
} from "@/components/ui/dialog"

import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useWalletState } from "@/providers/wallet"

import { CopyIcon, WalletIcon, LoaderIcon, LogOutIcon } from "lucide-react"

export const WalletProviderOption = ({
    icon,
    name,
    ...props
}: React.ComponentProps<"button"> & { icon: string }) => {
    return (
        <button
            className={"p-2 rounded-md hover:bg-secondary hover:cursor-pointer"}
            {...props}
        >
            <div className="flex flex-row items-center justify-start gap-2">
                <div className="flex flex-row items-center justify-start gap-2">
                    <img src={icon} alt={name} className="w-7 rounded-md" />
                    <p className="text-xl font-semibold">{name}</p>
                </div>
            </div>
        </button>
    )
}

const WalletProviderPickerMenu = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const { select, connect, wallet: selectedWallet } = useWallet()

    const [wallet, setWallet] = useWalletState()

    const [pendingAdapter, setPendingAdapter] =
        React.useState<WalletName | null>(null)

    const handleClick = (index: number) => {
        const { adapter } = wallet.wallets[index]
        select(adapter)
        setWallet({ ...wallet, chosen: index })
        setPendingAdapter(adapter)
    }

    React.useEffect(() => {
        if (pendingAdapter && selectedWallet?.adapter.name === pendingAdapter) {
            connect().catch(console.error)
            setPendingAdapter(null)
        }
    }, [pendingAdapter, selectedWallet, connect])

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Connect your wallet</DialogTitle>
                    <DialogDescription>
                        Connect your wallet in just a few clicks.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-2">
                    {wallet.wallets.map((w, i) => (
                        <WalletProviderOption
                            key={i}
                            icon={w.icon}
                            name={w.name}
                            onClick={() => {
                                handleClick(i)
                            }}
                        />
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    )
}

const getShortenedPublicKeyFrom = (publicKey: string | undefined | null) => {
    return publicKey ? publicKey.slice(0, 4) + "..." + publicKey.slice(-4) : ""
}

const WalletConnectedManagerDropdown = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const { publicKey, disconnect } = useWallet()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem
                    onClick={() => {
                        if (publicKey) {
                            navigator.clipboard.writeText(publicKey.toString())
                        }
                    }}
                    asChild
                >
                    <div className="flex flex-row items-center justify-start">
                        <CopyIcon />
                        <p>Copy address</p>
                    </div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={disconnect} asChild>
                    <div className="flex flex-row items-center justify-start">
                        <LogOutIcon />
                        <p>Disconnect wallet</p>
                    </div>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export const Wallet = ({
    className,
    variant,
    size,
    asChild = false,
    ...props
}: React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & { asChild?: boolean }) => {
    const Comp = asChild ? Slot : "button"

    const { publicKey, connected, connecting } = useWallet()

    // If a connection is in progress.
    if (connecting) {
        return (
            <Comp
                data-slot="button"
                className={cn(
                    buttonVariants({ variant, size, className }),
                    "hover: cursor-pointer"
                )}
                {...props}
                disabled
            >
                <div className="flex flex-row gap-2 items-center justify-between">
                    <LoaderIcon />
                    <p>Connecting...</p>
                </div>
            </Comp>
        )
    }

    // Use the connected wallet.
    if (connected) {
        return (
            <WalletConnectedManagerDropdown>
                <Comp
                    data-slot="button"
                    className={cn(
                        buttonVariants({ variant, size, className }),
                        "hover: cursor-pointer"
                    )}
                    {...props}
                >
                    <div className="flex flex-row gap-2 items-center justify-between">
                        <WalletIcon />
                        <p>
                            {getShortenedPublicKeyFrom(publicKey?.toString())}
                        </p>
                    </div>
                </Comp>
            </WalletConnectedManagerDropdown>
        )
    }

    // Choose a wallet provider and connect.
    return (
        <WalletProviderPickerMenu>
            <Comp
                data-slot="button"
                className={cn(
                    buttonVariants({ variant, size, className }),
                    "hover: cursor-pointer"
                )}
                {...props}
            >
                <div className="flex flex-row gap-2 items-center justify-between">
                    <WalletIcon />
                    <p>Connect Wallet</p>
                </div>
            </Comp>
        </WalletProviderPickerMenu>
    )
}
