import React, { useState } from "react";
import Link from 'next/link'; // Import Link from next/link

const Hero = ({ titleData, createCampaign }) => {
    const [campaign, setCampaign] = useState({
        title: "",
        description: "",
        amount: "",
        deadline: "",
    });

    const createNewCampaign = async (e) => {
        e.preventDefault();
        try {
            await createCampaign(campaign);
        } catch (error) {
            console.log(error);
        }
    };

    const coverLineStyle = {
        width: '100%',
        height: '2rem',
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: '-1.9rem',
        zIndex: 3,
    };

     const backgroundStyle = {
        backgroundColor: '#644df6',
    };

     const backgroundMainStyle = {
        backgroundColor: '#1a1a1a',
    };

     const newColorStyle = {
        color: '#1a1a1a',
    };

    return (
        <div className="relative">
            <span style={coverLineStyle}></span>
            <div className="relative bg-opacity-75" style={backgroundMainStyle}>
                <div className="relative px-4 py-16 mx-auto overflow-hidden sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
                    <div className="flex flex-col items-center justify-between xl:flex-row">
                        <div className="w-full max-w-xl mb-12 xl:mb-0 xl:pr-16 xl:w-7/12">
                            <h2 className="max-w-lg mb-6 text-3xl font-bold tracking-tight text-white sm:text-5xl sm:leading-none">
                                Tzaff Web3 <br className="hidden md:block" />
                                Crowd Funding CK
                            </h2>
                            <p className="max-w-xl mb-4 text-base text-gray-200 md:text-lg">
                                Lorem Ipsum is simply dummy text of the printing and
                                typesetting industry. Lorem Ipsum has been the
                                standard dummy text ever since the 1500s,
                            </p>
                            <Link href="/" passHref>
                                <a
                                    aria-label="Learn More"
                                    className="inline-flex items-center font-semibold tracking-wider text-teal-400 transition-colors duration-200 hover:text-teal-700"
                                >
                                    Learn More
                                    {/* <Arrow /> */}
                                </a>
                            </Link>
                        </div>
                        <div className="w-full max-w-xl xl:px-8 xl:w-5/12">
                            <div className="bg-white rounded shadow-2xl p-7 sm:p-10">
                                <h3 className="mb-4 text-xl font-semibold sm:text-center sm:mb-6 sm:text-2xl">
                                    Campaign
                                </h3>
                                <form>
                                    <div className="mb-4">
                                        <label
                                            htmlFor="title"
                                            className="block mb-2 text-sm font-medium"
                                        >
                                            Title
                                        </label>
                                        <input
                                            onChange={(e) =>
                                                setCampaign({
                                                    ...campaign,
                                                    title: e.target.value,
                                                })
                                            }
                                            placeholder="Title"
                                            required
                                            type="text"
                                            className="w-full h-12 px-4 border border-gray-300 rounded shadow-sm focus:border-teal-400 focus:outline-none"
                                            id="title"
                                            name="title"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label
                                            htmlFor="description"
                                            className="block mb-2 text-sm font-medium"
                                        >
                                            Description
                                        </label>
                                        <input
                                            onChange={(e) =>
                                                setCampaign({
                                                    ...campaign,
                                                    description: e.target.value,
                                                })
                                            }
                                            placeholder="Description"
                                            required
                                            type="text"
                                            className="w-full h-12 px-4 border border-gray-300 rounded shadow-sm focus:border-teal-400 focus:outline-none"
                                            id="description"
                                            name="description"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label
                                            htmlFor="amount"
                                            className="block mb-2 text-sm font-medium"
                                        >
                                            Target Amount
                                        </label>
                                        <input
                                            onChange={(e) =>
                                                setCampaign({
                                                    ...campaign,
                                                    amount: e.target.value,
                                                })
                                            }
                                            placeholder="Amount"
                                            required
                                            type="text"
                                            className="w-full h-12 px-4 border border-gray-300 rounded shadow-sm focus:border-teal-400 focus:outline-none"
                                            id="amount"
                                            name="amount"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label
                                            htmlFor="deadline"
                                            className="block mb-2 text-sm font-medium"
                                        >
                                            Deadline
                                        </label>
                                        <input
                                            onChange={(e) =>
                                                setCampaign({
                                                    ...campaign,
                                                    deadline: e.target.value,
                                                })
                                            }
                                            placeholder="Date"
                                            required
                                            type="date"
                                            className="w-full h-12 px-4 border border-gray-300 rounded shadow-sm focus:border-teal-400 focus:outline-none"
                                            id="deadline"
                                            name="deadline"
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <button
                                            onClick={(e) => createNewCampaign(e)}
                                            type="submit"
                                            className="w-full h-12 px-6 font-medium text-white bg-teal-400 rounded shadow-md transition duration-200 hover:bg-teal-500 focus:outline-none focus:shadow-outline"
                                        >
                                            Create Campaign
                                        </button>
                                    </div>
                                    <p className="mt-4 text-xs text-gray-600 sm:text-sm underline">
                                        Create Your Campaign to raise funds.
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;