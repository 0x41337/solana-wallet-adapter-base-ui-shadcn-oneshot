# 🦄 Solana Wallet (shadcn-style Component)

Solana wallet connection component inspired by the [shadcn/ui](https://ui.shadcn.com/) philosophy: **Copy, paste and use. Simple, decoupled and extensible.**

---

## 🚀 What is this?

This component provides a ready-made interface for connecting Solana wallets, using:

-   ✅ Tailwind CSS
-   ✅ shadcn/ui
-   ✅ Jotai (lightweight state management)
-   ✅ Solana Wallet Adapter

---

## 🏗️ Component structure

The component is divided into **two files**, following the shadcn/ui architecture:

```
components/
    └── complex/
        └── wallet.tsx → UI Component (interface)
providers/
    └── wallet.tsx → Wallet Provider (state and connection)
```

---

## 🌆 Installation

1️⃣ Install the required dependencies:

```sh
# The main deps
$ npm install --save \
    jotai \
    @solana/wallet-adapter-base \
    @solana/wallet-adapter-react \
    @solana/wallet-adapter-wallets \
    @solana/web3.js \

# The shadcn used comps
$ npx shadcn@latest add button dialog dropdown-menu
```

2️⃣ Copy the files:

-   `/components/complex/wallet.tsx` → Wallet UI (If you want you can change the `complex` as you need!)
-   `/providers/wallet.tsx` → Wallet Provider

---

## 🔌 How to use

### Wrap your application with the Provider:

```tsx
// app/layout.tsx or app/providers.tsx

import { SolanaProvider } from "@/providers/wallet"

export function Providers({ children }: { children: React.ReactNode }) {
    return <SolanaProvider>{children}</SolanaProvider>
}
```

---

### Add Wallet button:

```tsx
import { Wallet } from "@/components/complex/wallet"

export default function Home() {
    return (
        <main className="flex min-h-screen items-center justify-center">
            <Wallet />
        </main>
    )
}
```

---

## 🎨 Features

-   ✅ Modal to choose wallet (Phantom, Coinbase, Solflare)
-   ✅ Connect and disconnect
-   ✅ Show short address (e.g. `AbcD...EfGh`)
-   ✅ Copy address to clipboard
-   🔥 AutoConnect enabled

---

## 🧐 Extensible by design

Want to add more wallets? ⭢️ Just change **`/providers/wallet.tsx`**:

```tsx
walletAtom = atom({
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
```

And also in the Provider hook:

```tsx
const wallets = React.useMemo(
    () => [
        new PhantomWalletAdapter(),
        new CoinbaseWalletAdapter(),
        new SolflareWalletAdapter(),
    ],
    []
)
```

---

## 🌐 Connected to Mainnet

By default, the provider is already configured to:

```ts
const network = WalletAdapterNetwork.Mainnet
const endpoint = clusterApiUrl(network)
```

## If you want to change it, just switch to `Devnet` or `Testnet`.

## ✨ Philosophy

-   🔗 **Zero hidden magic**
-   🛠️ **Easy to understand, change and extend**
-   🛋️ **Copy-paste friendly**, like shadcn/ui itself

---

## 🤝 Contribute

Open issues, submit PRs, suggest improvements — any feedback is welcome.
