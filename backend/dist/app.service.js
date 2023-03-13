"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const ethers_1 = require("ethers");
const tokenJson = require("./assets/MyToken.json");
const tokenizedBallotJson = require("./assets/TokenizedBallot.json");
const dotenv = require("dotenv");
dotenv.config();
const CONTRACT_ADDRESS = "0x93BBbECD82CA74697FE04F793F01Ec5e3e803f4B";
const CONTRACT_TOKENIZED_BALLOT_ADDRESS = "0xB12F99BE913B1f60C65a5D8d2df3C67194B20e13";
let AppService = class AppService {
    constructor() {
        this.alchemyProvider = new ethers_1.ethers.providers.AlchemyProvider("goerli", process.env.ALCHEMY_API_KEY);
        const privateKey = process.env.PRIVATE_KEY;
        if (!privateKey || privateKey.length <= 0)
            throw new Error("Missing environment private key");
        this.wallet = new ethers_1.ethers.Wallet(privateKey);
        this.signer = this.wallet.connect(this.alchemyProvider);
        this.contract = new ethers_1.ethers.Contract(CONTRACT_ADDRESS, tokenJson.abi, this.signer);
        this.tokenizedBallot = new ethers_1.ethers.Contract(CONTRACT_ADDRESS, tokenizedBallotJson.abi, this.signer);
    }
    getContractAddress() {
        return CONTRACT_ADDRESS;
    }
    getBallotAddress() {
        return CONTRACT_TOKENIZED_BALLOT_ADDRESS;
    }
    async getTotalSupply() {
        const totalSupplyBN = await this.contract.totalSupply();
        const totalSupplyString = ethers_1.ethers.utils.formatEther(totalSupplyBN);
        const totalSupplynumber = parseFloat(totalSupplyString);
        return totalSupplynumber;
    }
    async getAllowance(from, to) {
        const allowanceBN = await this.contract.allowance(from, to);
        const allowanceString = ethers_1.ethers.utils.formatEther(allowanceBN);
        const allowanceNumber = parseFloat(allowanceString);
        return allowanceNumber;
    }
    async getTransaction(hash) {
        return this.provider.getTransaction(hash);
    }
    async requestTokens(address, amount) {
        console.log(amount);
        const numString = amount.toString();
        console.log(numString);
        const txHash = await this.contract.mint(address, ethers_1.ethers.utils.parseEther(numString));
        return txHash;
    }
    async exerciseVote(proposalIndex, amount) {
        const txVote = await this.tokenizedBallotvote(proposalIndex, ethers_1.ethers.utils.parseUnits(amount.toString()));
        return txVote;
    }
    async getVotingPower(address) {
        const votingPower = await this.contract.votingPower(address);
        return votingPower;
    }
    async getWinningProposal() {
        const winningProposal = await this.contract.winningProposal();
        return winningProposal;
    }
};
AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map