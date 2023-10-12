# web3-pwa-monorepo


## Installation

Assuming that you have [zellij](https://zellij.dev/) installed:

```bash
pnpm i
```

```sh
cd contracts
pnpm i
```

```sh
cd web-svelte
pnpm i
```

## Quickstart

There are two main components, which are **blockchain component** and **web component**

1. Spinning up the **blockchain component**:

```sh
cd contracts
pnpm start
```

If it appears that you need to intall more dependencies, just delete `/contracts/lib`, modify the command and re-run it.

> **Note**💡

In the first time, it is needed to install relevant dependencies:

```sh
cd contracts
pnpm prepare
```

This will open a customized terminal with three sub-terminals, including anvil, testing and interaction.

2. In another terminal, run deployment scripts to the local network:

```sh
pnpm contracts:deploy
```
This will atomically deploy sets of deployment scripts.

3. Export deployment artifacts with formated schema to be used later in front-end part:

```sh
pnpm contracts:export-local
```
This schema includes **address** and **abi**.

4. Running the **front-end component**:

```sh
pnpm web:svelte:dev
```

> **Note**💡

5. (Optional) kill **blockchain component** when not needed

```sh
cd contracts
pnpm stop
```

## Re-initiate Project

```bash
pnpm init
```

```bash
forge init contracts
cd contracts
```

```bash
npm create svelte@latest web
cd web
```