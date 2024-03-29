import {init} from 'web3-connection';
import {contractsInfos, defaultRPC, initialContractsInfos, blockTime, localRPC} from '$lib/config';
import {initAccountData} from './account-data';
import {initTransactionProcessor} from 'ethereum-tx-observer';
import {initViemContracts} from 'web3-connection-viem';
import {initBalance} from '$lib/blockchain/state/balance';
import {zeroAddress} from 'viem';
import {logs} from 'named-logs';

const logger = logs('jolly-roger');

export const accountData = initAccountData();

// TODO we need to hook tx-observer with a provider and make it process tx

const stores = init({
	autoConnectUsingPrevious: true,
	options: ['builtin'],
	parameters: {
		blockTime: blockTime || 5,
		finality: 12, // TODO
	},
	defaultRPC,
	networks: initialContractsInfos,
	provider: {
		errorOnTimeDifference: false,
	},
	observers: {
		onTxSent(tx, hash) {
			accountData.onTxSent(tx, hash as `0x{string}`); // TODO web3-connection 0x{string}
		},
	},
	acccountData: {
		async loadWithNetworkConnected(state, setLoadingMessage, waitForStep) {
			const chainId = state.network.chainId;
			const address = state.address;
			await accountData.load(address, chainId, state.network.genesisHash);
		},
		async unload() {
			await accountData.unload();
		},
	},
	devNetwork:
		// does not connect through node, so only enable devNetwork when in the browser
		typeof window != 'undefined' && localRPC
			? {
					url: localRPC.url,
					chainId: localRPC.chainId,
					checkGenesis: true,
			  }
			: undefined,
});

export const txObserver = initTransactionProcessor({finality: 12}); // TODO config.finality

// we hook up accountData and txObserver
// they do not need to know about each other
// except that account data follow the same type of "pending tx" as input/output
// but accountData can be strucutred as it wishes otherwise. just need to emit an event for "clear" and "newTx"
// and since accountData implement load and unload and is passed to web3-connection, these load and unload will be called automatically
accountData.on((event: any) => {
	switch (event.name) {
		case 'clear':
			txObserver.clear();
			break;
		case 'newTx':
			txObserver.add(event.txs);
			break;
	}
});
txObserver.onTx((v) => {
	logger.info(`onTx ${v.hash}`);
	accountData.updateTx(v);
});
stores.connection.onNewBlock(() => {
	logger.info(`onNewBlock`);
	txObserver.process();
});
stores.connection.subscribe(($connection) => {
	if ($connection.provider) {
		txObserver.setProvider($connection.provider);
	}
});

contractsInfos.subscribe((contractsInfos) => {
	stores.connection.updateContractsInfos(contractsInfos);
});

export const {connection, network, account, pendingActions, execution, execute, devProvider} = stores;

export const contracts = initViemContracts(execute);

export const balanceETH = initBalance({
	token: zeroAddress,
	connection,
	account,
});

export const balanceMockERC20_A = initBalance({
	token: initialContractsInfos.contracts.MockERC20.address,
	connection,
	account,
});

if (typeof window !== 'undefined') {
	(window as any).execution = execution;
	(window as any).connection = connection;
	(window as any).network = network;
	(window as any).account = account;
	(window as any).pendingActions = pendingActions;

	(window as any).accountData = accountData;
}