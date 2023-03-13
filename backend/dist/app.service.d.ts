import { ethers } from "ethers";
export declare class AppService {
    [x: string]: any;
    alchemyProvider: ethers.providers.AlchemyProvider;
    contract: ethers.Contract;
    tokenizedBallot: ethers.Contract;
    wallet: ethers.Wallet;
    signer: ethers.Signer;
    constructor();
    getContractAddress(): string;
    getBallotAddress(): string;
    getTotalSupply(): Promise<number>;
    getAllowance(from: string, to: string): Promise<number>;
    getTransaction(hash: string): Promise<ethers.providers.TransactionResponse>;
    requestTokens(address: string, amount: number): Promise<ethers.providers.TransactionResponse>;
    exerciseVote(proposalIndex: number, amount: number): Promise<ethers.providers.TransactionResponse>;
    getVotingPower(address: string): Promise<number>;
    getWinningProposal(): Promise<number>;
}
