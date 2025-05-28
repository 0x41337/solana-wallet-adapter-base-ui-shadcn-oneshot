import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./index.css"

import Page from "./app"
import { SolanaProvider } from "@/providers/wallet"

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <SolanaProvider>
            <Page />
        </SolanaProvider>
    </StrictMode>
)
