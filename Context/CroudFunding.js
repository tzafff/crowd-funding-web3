import React, { useState, useEffect, createContext } from "react";
import { ethers } from "ethers";
import { CrowdFundingABI, CrowdFundingAddress } from "./contants";

const fetchContract = (signerOrProvider) =>
    new ethers.Contract(CrowdFundingAddress, CrowdFundingABI, signerOrProvider);

let eth;

if (typeof window !== 'undefined') {
    eth = window.ethereum;
}

const getEthereumProvider = () => new ethers.providers.Web3Provider(eth);
const getEthereumSigner = () => getEthereumProvider().getSigner();

const getEthereumContract = (signer) =>
    fetchContract(signer || getEthereumProvider());

export const CrowdFundingContext = createContext();

export const CrowdFundingProvider = ({ children }) => {
    const titleData = "Crowd Funding Contract";
    const [currentAccount, setCurrentAccount] = useState("");

    const createCampaign = async (campaign) => {
        const { title, description, amount, deadline } = campaign;
        const contract = getEthereumContract(getEthereumSigner());

        try {
            const transaction = await contract.createCampaign(
                currentAccount,
                title,
                description,
                ethers.utils.parseUnits(amount, 18),
                Math.floor(new Date(deadline).getTime() / 1000)
            );

            await transaction.wait();
            console.log("contract call success", transaction);
        } catch (error) {
            console.log("contract call failure", error);
        }
    };

    const getCampaigns = async () => {
        const contract = getEthereumContract();
        const campaigns = await contract.getCampaigns();

        return campaigns.map((campaign, i) => ({
            owner: campaign.owner,
            title: campaign.title,
            description: campaign.description,
            target: ethers.utils.formatEther(campaign.target.toString()),
            deadline: campaign.deadline.toNumber(),
            amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
            pId: i,
        }));
    };

    const getUserCampaigns = async () => {
        const contract = getEthereumContract();
        const allCampaigns = await contract.getCampaigns();

        const provider = getEthereumProvider();
        const signer = provider.getSigner();
        const currentUser = await signer.getAddress();

        const filterCampaigns = allCampaigns.filter(
            (campaign) => campaign.owner.toLowerCase() === currentUser.toLowerCase()
        );

        return filterCampaigns.map((campaign, i) => ({
            owner: campaign.owner,
            title: campaign.title,
            description: campaign.description,
            target: ethers.utils.formatEther(campaign.target.toString()),
            deadline: campaign.deadline.toNumber(),
            amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
            pId: i,
        }));
    };

    const donate = async (pId, amount) => {
        const contract = getEthereumContract(getEthereumSigner());

        try {
            const campaignData = await contract.donateToCampaign(pId, {
                value: ethers.utils.parseEther(amount),
            });
            await campaignData.wait();
            console.log("Donation successful", campaignData);
        } catch (error) {
            console.log("Donation failed", error);
        }
    };

    const getDonations = async (pId) => {
        const contract = getEthereumContract();
        const donations = await contract.getDonators(pId);

        return donations[0].map((donator, i) => ({
            donator,
            donation: ethers.utils.formatEther(donations[1][i].toString()),
        }));
    };

    const checkIfWalletIsConnected = async () => {
        try {
            if (!eth) {
                return;
            }

            const accounts = await eth.request({ method: "eth_accounts" });
            if (accounts.length) {
                setCurrentAccount(accounts[0]);
            } else {
                console.log("No Account Found");
            }
        } catch (error) {
            console.log("Something went wrong while connecting to wallet with error: ", error);
        }
    };

    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);

    const connectWallet = async () => {
        try {
            if (!eth) {
                console.error("Install Metamask!");
                return;
            }

            const accounts = await eth.request({ method: "eth_requestAccounts" });
            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log("Error while connecting to wallet", error);
        }
    };

    return (
        <CrowdFundingContext.Provider
            value={{
                titleData,
                currentAccount,
                createCampaign,
                getCampaigns,
                getUserCampaigns,
                donate,
                getDonations,
                connectWallet,
            }}
        >
            {children}
        </CrowdFundingContext.Provider>
    );
};