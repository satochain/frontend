// import axios from "axios";
import xstore from "../components/xstore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { ethers } from "ethers";
const features = [
  {
    title: "Smart Contract",
    image: "contract.png",
    desc: "The consensus mechanism linking Satochain with Bitcoin, enabling applications to utilize Bitcoin's security.",
  },
  {
    title: "Bitcoin DeFi",
    image: "defi.png",
    desc: "Satochain brings DeFi to Bitcoin, unlocking over $300 billion in capital and setting the stage for activation of the Bitcoin economy.",
  },
  {
    title: "Bitcoin NFTs",
    image: "nft.png",
    desc: "Satochain launches DeFi on Bitcoin, releasing over $300 billion in funds and catalyzing the Bitcoin economy's growth",
  },
];
const Landing = () => {
  // useEffect(() => {
  //   const urlSearchParams = new URLSearchParams(window.location.search);
  //   const params = Object.fromEntries(urlSearchParams.entries());
  //   // console.error("params -> ", params);
  //   if (params.ref || params.reference) {
  //     let addr = params.ref || params.reference;
  //     console.error("ref addr -> ", addr);
  //     try {
  //       addr = ethers.getAddress(addr);
  //       setCookie("refAddress", addr, 365);
  //     } catch (e) {
  //       console.error("ethers.utils.getAddress(addr) -> ", e);
  //     }
  //   }
  // }, []);

  // const setCookie = (cname: any, cvalue: any, exdays: any) => {
  //   const d = new Date();
  //   d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  //   let expires = "expires=" + d.toUTCString();
  //   document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  // };

  return (
    <>
      <div className="bg-bg bg-top bg-cover bg-no-repeat lg:pb-[140px] pb-[60px]">
        <div className="bg-banner bg-contain bg-repeat-x relative z-[1] overflow-hidden">
          <header className="header py-3 lg:py-5 font-fontHeading relative">
            <div className="container flex flex-wrap items-center justify-center sm:justify-end">
              <div className="mr-auto">
                <Link to="/">
                  <img
                    className="mx-auto sm:mx-0 w-[150px] sm:w-auto"
                    src={xstore.page.header.logo.imageUrl}
                    alt={xstore.page.header.logo.title}
                  />
                </Link>
              </div>
              <div className="flex items-center">
                {/* {xstore?.page.header.menuHome.map((item: any, index: any) => {
                  return (
                    <a
                      key={index}
                      className="lg:px-8 sm:px-4 px-2.5 leading-[24px] text-[14px] sm:text-[18px] xl:text-[20px]"
                      href={item.url}
                    >
                      {item.title}
                    </a>
                  );
                })} */}
                {xstore?.page.header.socialLinks.map(
                  (item: any, index: any) => {
                    return (
                      <a
                        key={index}
                        className="lg:pl-8 pl-4"
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          className="w-5"
                          src={`/images/icon/${item.imageUrl}`}
                          alt=""
                        />
                      </a>
                    );
                  }
                )}
              </div>
            </div>
          </header>
          <div className="container xl:pt-[148px] pt-[70px] relative z-[1]">
            <div className="md:flex items-center">
              <div className="flex-1">
                <h1 className="mb-6">Build for Bitcoin</h1>
                <p className="text-colorOpacity pb-10 sm:max-w-[350px]">
                  Enhance Bitcoin's economy using secure, Bitcoin-based apps and
                  smart contracts.
                </p>
                <div className="sm:flex items-center xl:pb-[247px] pb-[100px]">
                  <Link
                    className="btn pl-6"
                    to="#"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Try for FREE
                    <img
                      className="ml-3 lg:ml-6"
                      src="images/icon/arrow-right.svg"
                      alt=""
                    />
                  </Link>
                </div>
              </div>
              <div className="flex-1">
                <img className="mx-auto" src="images/home/rocket.png" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="relative md:min-h-[68.06249999999999vw]">
          <div className="elipp absolute left-1/2 -translate-x-1/2 lg:top-[-140px] md:top-[-100px] hidden md:block">
            {" "}
          </div>
          <div className="container relative text-center lg:pt-[150px] pt-10">
            <h2 className="mb-6">Features</h2>
            <div className="md:flex items-stretch -mx-3">
              {features.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="md:flex-[0_0_33.33333%] smd:px-3 h-full"
                  >
                    <div className="md:px-8 md:py-7 p-4">
                      <img
                        className="mx-auto mb-5"
                        src={`images/home/${item.image}`}
                        alt=""
                      />
                      <h3 className="mb-6 inline-flex justify-center text-gradient">
                        {item.title}
                      </h3>
                      <p className="text-colorOpacity">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="relative mt-[70px] md:mt-0 mb-10 md:mb-[135px]">
          <img
            className="absolute left-0 md:top-[-100%]"
            src="images/home/bg-gradient-img1.png"
            alt=""
          />
          <div className="container md:flex items-center relative">
            <div className="flex-1 md:order-2">
              <div className="bg-gradient-20 bg-gradient-dark relative h-full p-4 lg:p-10">
                <div className="relative z-[1]">
                  <h2 className="text-gradient lg:mb-[70px] mb-10">
                    sBTC: Unlocking Bitcoin by Satochain
                  </h2>
                  <p className="flex items-center mb-3">
                    <img className="mr-2" src="images/icon/check.svg" alt="" />
                    Trust-minimized
                  </p>
                  <p className="flex items-center mb-3">
                    <img className="mr-2" src="images/icon/check.svg" alt="" />
                    Decentralized
                  </p>
                  <p className="flex items-center mb-3">
                    <img className="mr-2" src="images/icon/check.svg" alt="" />
                    Censorship resistant
                  </p>
                </div>
              </div>
            </div>
            <div className="flex-1 md:order-1">
              <img src="images/home/look.png" alt="" />
            </div>
          </div>
        </div>
        <div className="relative mt-[70px] md:mt-0 mb-10 md:mb-[135px]">
          <img
            className="absolute right-0 md:top-[-95%]"
            src="images/home/bg-gradient-img2.png"
            alt=""
          />
          <div className="container md:flex items-center relative">
            <div className="flex-1">
              <div className="bg-gradient-20 bg-gradient-dark relative h-full p-4 lg:p-10">
                <div className="relative z-[1]">
                  <h2 className="text-gradient mb-6">
                    Earn BTC by participating as validators
                  </h2>
                  <p className="text-colorOpacity mb-10">
                    Hold and temporarily secure BTC, Satochain's native
                    currency, to bolster the network's security and consensus.
                    Over 2000 bitcoins have been allocated as consensus rewards
                  </p>
                  <Link className="btn btn-outline" to={`/`}>
                    Join Satochain
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <img src="images/home/bag.png" alt="" />
            </div>
          </div>
        </div>
        <div className="relative mt-[70px] md:mt-0 mb-10 md:mb-[135px]">
          <img
            className="absolute left-0 md:top-[-25%]"
            src="images/home/bg-gradient-img3.png"
            alt=""
          />
          <div className="container md:flex items-center relative">
            <div className="flex-1 md:order-2">
              <div className="bg-gradient-20 bg-gradient-dark relative h-full p-4 lg:p-10">
                <div className="relative z-[1]">
                  <h2 className="text-gradient mb-6">
                    Build powerful apps, secured by Bitcoin
                  </h2>
                  <p className="text-colorOpacity mb-10">
                    Transactions on the Satochain layer are automatically
                    finalized on Bitcoin, allowing for the creation of apps and
                    digital assets that are integrated with the robust security
                    of Bitcoin.
                  </p>
                  <Link className="btn btn-outline" to={`/`}>
                    Start Building
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex-1 md:order-1">
              <img src="images/home/laptop.png" alt="" />
            </div>
          </div>
        </div>
        <footer className="bg-footer bg-cover bg-top before-footer relative">
          <div className="container">
            <div className="py-10 px-4 rounded-[48px] bg-primary bg-gradient-box text-center">
              <div className="md:flex items-center justify-center">
                <div className="mr-auto hidden lg:block">
                  <img
                    className="lg:w-[286px]"
                    src="images/home/global.png"
                    alt=""
                  />
                </div>
                <div>
                  <img
                    className="mx-auto mb-8"
                    src="images/logo-white.svg"
                    alt=""
                  />
                  <h2 className="mb-6">Make Bitcoin mass adopt</h2>
                  <p className="mb-10">
                    Engage, collaborate, and connect with thousands of
                    Satochainer globally.
                  </p>
                  <div className="flex items-center justify-center">
                    {xstore?.page.header.socialLinks.map(
                      (item: any, index: any) => {
                        return (
                          <a
                            key={index}
                            className="flex items-center font-bold text-[14px] p-1 pr-4 rounded-full bg-[rgba(255,255,255,0.1)] mx-2"
                            href={item.url}
                            target="_blank"
                          >
                            <img
                              className="mr-2"
                              src={`images/icon/${item.imageUrl2}`}
                              alt=""
                            />
                            {item.title}
                          </a>
                        );
                      }
                    )}
                  </div>
                </div>
                <div className="ml-auto hidden lg:block">
                  <img
                    className="lg:w-[286px]"
                    src="images/home/box.png"
                    alt=""
                  />
                </div>
              </div>
              <div className="pt-6 border-t border-[rgba(255,255,255,0.1)] lg:mt-[100px] mt-[60px] text-[14px]">
                <p className="text-[rgba(255,255,255,0.75)]">
                  © 2024 Satochain. All right reserved.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Landing;
