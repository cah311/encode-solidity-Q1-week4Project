import { AppService } from "./app.service";
import { RequestTokensDTO } from "./dtos/requestToken.dto";
import { VotingDTO } from "./dtos/Voting.dto";
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getContractAddress(): {
        result: string;
    };
    getBallotAddress(): {
        result: string;
    };
    getTotalSupply(): Promise<number>;
    getAllowance(from: string, to: string): Promise<number>;
    getTransaction(hash: string): Promise<import("@ethersproject/abstract-provider").TransactionResponse>;
    requestTokens(body: RequestTokensDTO): Promise<import("@ethersproject/abstract-provider").TransactionResponse>;
    exerciseVote(body: VotingDTO): Promise<import("@ethersproject/abstract-provider").TransactionResponse>;
    getVotingPower(address: string): Promise<number>;
    getWinningProposal(): Promise<number>;
}
