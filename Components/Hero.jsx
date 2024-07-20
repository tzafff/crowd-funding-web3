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
            const data = await createCampaign(campaign);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="relative">
            <span className="coverLine"></span>
            <div className="relative bg-opacity-75 backgroundMain">
                {/*<svg*/}
                {/*    className="absolute inset-x-0 bottom-0 text-white"*/}
                {/*    viewBox="0 0 1160 163"*/}
                {/*    xmlns="http://www.w3.org/2000/svg"*/}
                {/*>*/}
                {/*    <path*/}
                {/*        fill="currentColor"*/}
                {/*        d="M-164 13L-104 39.7C-44 66 76 120 196 141C316 162 436 152 556 119.7C676 88 796 34 916 13C1036 -8 1156 2 1216 7.7L1276 13V162.5H1216C1156 162.5 1036 162.5 916 162.5C796 162.5 676 162.5 556 162.5C436 162.5 316 162.5 196 162.5C76 162.5 -44 162.5 -104 162.5H-164V13Z"*/}
                {/*    />*/}
                {/*</svg>*/}
                <div className="relative px-4 py-16 mx-auto overflow-hidden sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
                    <div className="flex flex-col items-center justify-between xl:flex-row">
                        <div className="w-full max-w-xl mb-12 xl:mb-0 xl:pr-16 xl:w-7/12">
                            <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-white sm:text-5xl sm:leading-none">
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
                                    className="inline-flex items-center font-semibold tracking-wider transition-colors duration-200 text-teal-400 hover:text-teal-700 "
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
                                    <div className="mb-1 sm:mb-2">
                                        <label
                                            htmlFor="title"
                                            className="inline-block mb-2 font-medium"
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
                                            className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-teal-400 focus:outline-none focus:shadow-outline"
                                            id="title"
                                            name="title"
                                        />
                                    </div>
                                    <div className="mb-1 sm:mb-2">
                                        <label
                                            htmlFor="description"
                                            className="inline-block mb-2 font-medium"
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
                                            className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-teal-400 focus:outline-none focus:shadow-outline"
                                            id="description"
                                            name="description"
                                        />
                                    </div>
                                    <div className="mb-1 sm:mb-2">
                                        <label
                                            htmlFor="target"
                                            className="inline-block mb-2 font-medium"
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
                                            className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-teal-400 focus:outline-none focus:shadow-outline"
                                            id="target"
                                            name="target"
                                        />
                                    </div>
                                    <div className="mb-1 sm:mb-2">
                                        <label
                                            htmlFor="deadline"
                                            className="inline-block mb-2 font-medium"
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
                                            className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-teal-400 focus:outline-none focus:shadow-outline"
                                            id="deadline"
                                            name="deadline"
                                        />
                                    </div>
                                    <div className="mt-4 mb-2 sm:mb-4">
                                        <button
                                            onClick={(e) => createNewCampaign(e)}
                                            type="submit"
                                            className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-teal-400 focus:shadow-outline focus:outline-none"
                                        >
                                            Create Campaign
                                        </button>
                                    </div>
                                    <p className="text-xs text-gray-600 sm:text-sm underline">
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