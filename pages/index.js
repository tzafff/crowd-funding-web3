import React, { useState, useEffect, useContext} from "react";
import { CrowdFundingContext } from '@/Context/CroudFunding'
import { Hero, Card, PupUp } from '../components'

const Index = () => {

  const {
    titleData,
    currentAccount,
    getCampaigns,
    createCampaign,
    donate,
    getUserCampaigns,
    getDonations,
  } = useContext(CrowdFundingContext);

  const [allCampaign, setAllCampaign] = useState([]);
  const [userCampaign, setUserCampaign] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const allData = await getCampaigns();
        setAllCampaign(allData);

        if (currentAccount) {
          const userData = await getUserCampaigns();
          setUserCampaign(userData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentAccount, getCampaigns, getUserCampaigns]);

  // DONATE POPUP MODEL
  const [openModal, setOpenModal] = useState(false);
  const [donateCampaign, setDonateCampaign] = useState();

  console.log(userCampaign)


  return (
      <>
        <Hero titleData={titleData} createCampaign={createCampaign}/>

        <Card
            title="All Listed Campaign"
            allCampaign={allCampaign}
            setOpenModal={setOpenModal}
            setDonate={setDonateCampaign}
        />
        <Card
            title="Your Created Campaign"
            allCampaign={userCampaign}
            setOpenModal={setOpenModal}
            setDonate={setDonateCampaign}
        />

        {openModal && (
            <PupUp
                setOpenModal={setOpenModal}
                getDonations={getDonations}
                donate={donateCampaign}
                donateFunction={donate}
            />
        )}
      </>
  );
};

export default Index;
