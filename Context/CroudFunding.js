import React, { useState, useEffect} from "react";

import { ethers } from "ethers";


import  { CrowdFundingABI, CrowdFundingAddress } from "./contants";

// Fetch Smart Contract

const fetchContract = (signerOrProvider) => new ethers.Contract(CrowdFundingAddress, CrowdFundingABI, signerOrProvider);

let eth

if (typeof window !== 'undefined') {
    eth = window.ethereum
}

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(eth)
    const signer = provider.getSigner()
    const transactionContract = new ethers.Contract(
        CrowdFundingAddress,
        CrowdFundingABI,
        signer,
    )

    return transactionContract
}

export const CrowdFundingContext = React.createContext();

export const CrowdFundingProvider = ({ children }) => {
    const titleData = "Crowd Funding Contract";
    const [currentAccount, setCurrentAccount] = useState("");

    const createCampaign = async (campaign) => {
        const { title, description, amount, deadline} = campaign;
        const contract = getEthereumContract()

        try {
            const transaction = await contract.createCampaign(
                currentAccount, // owner
                title,
                description,
                ethers.utils.parseUnits(amount, 18),
                Math.floor(new Date(deadline).getTime() / 1000)
            );

            await transaction.wait();

            console.log("contract call success", transaction)

        } catch (error) {
            console.log("contract call failure", error);
        }
    }

    const getCampaigns = async () => {
        const transactionContract = getEthereumContract()
        const campaigns = await transactionContract.getCampaigns();

        const parsedCampaigns = campaigns.map((campaign, i) => ({
            owner: campaign.owner,
            title: campaign.title,
            description: campaign.description,
            target: ethers.utils.formatEther(campaign.target.toString()),
            deadline: campaign.deadline.toNumber(),
            amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
            pId: i,
        }));

        return parsedCampaigns
    }

    const getUserCampaigns = async () => {
        const contract =  getEthereumContract()
        const provider = new ethers.providers.Web3Provider(eth)
        const allCampaigns = await contract.getCampaigns();

        const signer = provider.getSigner();
        const currentUser = await signer.getAddress();

        const filterCampaigns = allCampaigns.filter(
            (campaign) => campaign.owner.toLowerCase() === currentUser.toLowerCase()
        );

        const userData = filterCampaigns.map((campaign, i) => ({
            owner: campaign.owner,
            title: campaign.title,
            description: campaign.description,
            target: ethers.utils.formatEther(campaign.target.toString()),
            deadline: campaign.deadline.toNumber(),
            amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
            pId: i,
        }));

        return userData;
    }

    const donate = async (pId, amount) => {
        const contract = getEthereumContract()

        const campaignData = await contract.donateToCampaign(pId, { value: ethers.utils.parseEther(amount) } )
        await campaignData.wait()

        location.reload();
        return campaignData;
    }

    const getDonations = async (pId) => {
        const contract = getEthereumContract();

        const donations = await contract.getDonators(pId);
        const numberOfDonations = donations[0].length;

        const parsedDonations = [];

        for(let i = 0; i < numberOfDonations; i++) {
            parsedDonations.push({
                donator: donations[0][i],
                donation: ethers.utils.formatEther(donations[1][i].toString()),
            })
        }

        return parsedDonations;
    }

    // Check if wallet is connected

    const checkIfWalletIsConnected = async  () => {
        try {
            if (!window.ethereum) {
                return;
            }

            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            })

            if(accounts.length) {
                setCurrentAccount(accounts[0]);
            } else {
                console.log("No Account Found")

            }
        } catch (error) {
            console.log("Something went wrong while connecting to wallet with error: ", error)

        }
    }

    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);

    const connectWallet = async () => {
        try{
            if (!window.ethereum) {
                setOpenError(true);
                setError("Install Metamask!");
                return;
            }

            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts"
            })

            setCurrentAccount(accounts[0]);
        } catch (error){
            console.log("Error while connecting to wallet")
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
    )

};