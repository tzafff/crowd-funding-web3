import React from "react";
import Image from 'next/image'; // Import Image from next/image
import Link from 'next/link';   // Import Link from next/link

const Card = ({ allCampaign, setOpenModal, setDonate, title }) => {

    const daysLeft = (deadline) => {
        const now = new Date().getTime();
        const deadlineDate = new Date(deadline * 1000).getTime(); // assuming the deadline is in seconds
        const timeDifference = deadlineDate - now;
        const daysRemaining = Math.ceil(timeDifference / (1000 * 3600 * 24)); // converting from milliseconds to days

        return daysRemaining > 0 ? daysRemaining : 0;
    };

    return (
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl
      md:px-24 lg:px-8 lg:py-20">
            <p className="py-16 text-2xl font-bold leading-5">{title}</p>
            <div className="grid gap-5 lg:grid-cols-3 sm:max-w-sm sm:max-auto lg:max-w-full">
                {allCampaign?.map((campaign, i) => (
                    <div
                        onClick={() => (setDonate(campaign), setOpenModal(true))}
                        key={i}
                        className="cursor-pointer border overflow-hidden transition-shadow duration-300 bg-white rounded"
                    >
                        <Image
                            src="https://images.pexels.com/photos/932638/pexels-photo-932638.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=3&amp;h=750&amp;w=1260"
                            alt={campaign.title} // Use campaign title for alt text for better accessibility
                            width={1260} // Define width to avoid layout shifts
                            height={750} // Define height to avoid layout shifts
                            className="object-cover w-full h-64 rounded"
                        />
                        <div className="py-5 pl-2">
                            <p className="mb-2 text-xs font-semibold text-gray-600 uppercase">
                                Days Left: {daysLeft(campaign.deadline)}
                            </p>
                            <Link href={`/campaign/${campaign.id}`} passHref>
                                <a
                                    aria-label="Article"
                                    className="inline-block mb-3 text-black transition-colors duration-200 hover:text-teal-700"
                                >
                                    <p className="text-2xl font-bold leading-5">{campaign.title}</p>
                                </a>
                            </Link>
                            <p className="mb-4 text-gray-700">{campaign.description}</p>
                            <div className="flex space-x-4">
                                <p className="font-semibold">Target: {campaign.target} ETH</p>

                                <p className="font-semibold">
                                    Raised Amount: {campaign.amountCollected} ETH
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Card;