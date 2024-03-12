import { useCallback, useEffect, useState, useRef } from "react";
import { Helmet } from "react-helmet";
import { Outlet, Link, NavLink } from "react-router-dom";
import xstore from "../components/xstore";
import ee from "../components/ee";
// import detectEthereumProvider from "@metamask/detect-provider";
// import { isMobile } from "react-device-detect";
// import { ethers } from "ethers";
// import { getAddress, signTransaction } from "sats-connect";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// import okxWeb3 from "@okwallet/extension";
// import axios from "axios";
// const { CHAINS } = okxWeb3;

declare var window: any;

let lastMessageTimeout: any = null;

// unisat = 1, okx = 2
let walletType: any = null;

const Layout = (props: any) => {
  // const [unisatInstalled, setUnisatInstalled] = useState(false);

  // const code = "ordilaunch@2023";
  const [connected, setConnected] = useState(false);
  const [accounts, setAccounts] = useState < string[] > ([]);
  const [wallet, setWallet] = useState < any > (null);
  const [loading, setLoading] = useState < boolean > (false);
  const [loginWallet, setLoginWallet] = useState < boolean > (false);
  const [profile, setProfile] = useState < boolean > (false);
  const [balance, setBalance] = useState(0);
  // const [referralCode, setReferralCode] = useState < string > ("");

  const [message, setMessage] = useState < any > ({
    text: "",
    type: "", //error,warning,success,info
    timeout: 1000,
  });

  const selfRef = useRef < { accounts: string[] } > ({
    accounts: [],
  });
  const self = selfRef.current;

  const getBasicInfo = async (address: any) => {
    // switch (+walletType) {
    //   case 1: {
    //     const unisat = (window as any).unisat;
    //     if (unisat) {
    //       const balance = await unisat.getBalance();
    //       setBalance(balance);
    //     }
    //     break;
    //   }
    //   case 2: {
    //     const balance = await okxWeb3.getBalance(CHAINS.bitcoin);
    //     console.error("balance -> ", balance);
    //     setBalance(balance);
    //     break;
    //   }
    // }
    const response = await fetch(
      `https://api.blockcypher.com/v1/btc/main/addrs/${address}`,
      { mode: "cors" }
    );
    const data = await response.json();
    setBalance(data.balance || 0);
  };

  const handleAccountsChanged = (_accounts: string[], _walletType: any) => {
    if (self.accounts[0] === _accounts[0]) {
      // prevent from triggering twice
      return;
    }
    self.accounts = _accounts;
    if (_accounts.length > 0) {
      walletType = _walletType;
      setAccounts(_accounts);
      setConnected(true);
      setWallet(_accounts[0]);
      getBasicInfo(_accounts[0]);
      setCookie("login", "true", 365);
      setCookie("walletType", _walletType, 365);
      setLoginWallet(false);
    } else {
      setConnected(false);
      setCookie("login", "false", 365);
    }
  };

  const okxConnect = async () => {
    // const result1 = await window.btc?.request("getAddresses");
    // console.error("result1 -> ", result1);
    // return;
    // console.error("window.okxwallet.bitcoin -> ", window.okxwallet?.bitcoin);
    const result = await window.okxwallet?.bitcoin.connect();
    if (!result?.address) {
      showMessage("Your Okx wallet has not bitcoin address.", "error");
      return;
    }
    handleAccountsChanged([result.address], 2);
    // okxWeb3
    //   .init({
    //     success: (wallet: any) => {
    //       //console.log("wallet -> ", wallet);
    //     },
    //     changed: (wallet: any) => {
    //       //console.log("wallet -> ", wallet);
    //     },
    //     error: (error: any) => {
    //       console.log("error -> ", error);
    //     },
    //     uninstall: () => {},
    //   })
    //   .then((wallet: any) => {
    //     // return wallet account information
    //     if (!wallet?.addresses?.bitcoin?.address) {
    //       showMessage("Your Okx wallet has not bitcoin address.", "error");
    //     } else {
    //       handleAccountsChanged([wallet?.addresses?.bitcoin?.address], 2);
    //     }
    //   })
    //   .catch((error: any) => {
    //     // Error returned when rejected
    //     console.error(error);
    //   });
  };

  useEffect(() => {
    if (getCookie("login") == "false") {
      return;
    }

    // let walletType = getCookie("walletType");
    // switch (+walletType) {
    //   case 1: {
    //     (window as any).unisat
    //       ?.getAccounts()
    //       .then((accounts: string[]) => {
    //         if (+accounts.length <= 0) {
    //           okxConnect();
    //         } else {
    //           handleAccountsChanged(accounts, 1);
    //         }
    //       })
    //       .catch((e: any) => {
    //         console.error("error -> ", e);
    //         okxConnect();
    //       });
    //     break;
    //   }
    //   case 2: {
    //     (async () => {
    //       const result = await window.okxwallet?.bitcoin.connect();
    //       handleAccountsChanged([result.address], 2);
    //     })();
    //     break;
    //   }
    //   case 3: {
    //     (async () => {
    //       const wallet = await window.btc?.request("getAddresses");
    //       let address: any = null;
    //       if (+wallet?.result?.addresses?.length > 0) {
    //         address = wallet.result?.addresses.find(
    //           (item: any) => item.symbol == "BTC"
    //         ).address;
    //       }
    //       if (address) {
    //         handleAccountsChanged([address], 3);
    //       }
    //     })();
    //     break;
    //   }
    //   case 4: {
    //     (async () => {
    //       const getAddressOptions: any = {
    //         payload: {
    //           purposes: ["ordinals", "payment"],
    //           message: "Address for receiving Ordinals and payments",
    //           network: {
    //             type: "Mainnet",
    //           },
    //         },
    //         onFinish: (response: any) => {
    //           console.error("response -> ", response);
    //           let address: any = null;
    //           if (+response?.addresses?.length > 0) {
    //             address = response?.addresses.find(
    //               (item: any) => item.purpose == "payment"
    //             ).address;
    //           }
    //           if (address) {
    //             handleAccountsChanged([address], 4);
    //           }
    //         },
    //       };

    //       await getAddress(getAddressOptions);
    //     })();
    //     break;
    //   }
    //   default:
    //     break;
    // }
  }, []);

  useEffect(() => {
    // const urlSearchParams = new URLSearchParams(window.location.search);
    // const params = Object.fromEntries(urlSearchParams.entries());
    // // console.error("params -> ", params);
    // if (params.ref || params.reference) {
    //   let addr = params.ref || params.reference;
    //   // console.error("ref addr -> ", addr);
    //   try {
    //     addr = ethers.utils.getAddress(addr);
    //     setCookie("refAddress", addr, 365);
    //   } catch (e) {
    //     console.error("ethers.utils.getAddress(addr) -> ", e);
    //   }
    // }
  }, []);

  const showMessage = (text: any, type: any = "info", timeout: any = 5000) => {
    if (lastMessageTimeout) {
      clearTimeout(lastMessageTimeout);
    }
    setMessage({
      text,
      type,
      timeout,
    });
    lastMessageTimeout = setTimeout(() => {
      setMessage({
        text: "",
      });
      clearTimeout(lastMessageTimeout);
    }, timeout);
  };

  const loginHiroClickHandler = async () => {
    if (!window.btc) {
      showMessage("Please install Hiro wallet extension first", "error");
      return;
    }
    const wallet = await window.btc?.request("getAddresses");
    let address: any = null;
    if (+wallet?.result?.addresses?.length > 0) {
      address = wallet.result?.addresses.find(
        (item: any) => item.symbol == "BTC"
      ).address;
    }
    if (address) {
      handleAccountsChanged([address], 3);
    } else {
      showMessage("Your Hiro wallet has not bitcoin address.", "error");
    }
  };

  const loginXverseClickHandler = async () => {
    const getAddressOptions: any = {
      payload: {
        purposes: ["ordinals", "payment"],
        message: "Address for receiving Ordinals and payments",
        network: {
          type: "Mainnet",
        },
      },
      onFinish: (response: any) => {
        //console.error("response -> ", response);
        let address: any = null;
        if (+response?.addresses?.length > 0) {
          address = response?.addresses.find(
            (item: any) => item.purpose == "payment"
          ).address;
        }
        if (address) {
          handleAccountsChanged([address], 4);
        } else {
          showMessage("Your Xverse wallet has not bitcoin address.", "error");
        }
      },
      onCancel: () => showMessage("Request canceled"),
    };

    // await getAddress(getAddressOptions);
  };

  const loginOkxClickHandler = async () => {
    // if (referralCode != code) {
    //   showMessage(
    //     `${referralCode == null || referralCode.trim() == ""
    //       ? "Please enter a referral code."
    //       : "Your referral code dose not match."
    //     }`,
    //     "error"
    //   );
    //   return;
    // }
    if (wallet) {
      return;
    }
    const okxwallet = window.okxwallet;
    if (!okxwallet) {
      showMessage("Please install Okx wallet extension first", "error");
      return;
    }
    okxConnect();
  };

  const loginUnisatClickHandler = async () => {
    // if (referralCode != code) {
    //   showMessage(
    //     `${referralCode == null || referralCode.trim() == ""
    //       ? "Please enter a referral code."
    //       : "Your referral code dose not match."
    //     }`,
    //     "error"
    //   );
    //   return;
    // }
    if (wallet) {
      return;
    }
    const unisat = (window as any).unisat;
    if (!unisat) {
      showMessage("Please install Unisat wallet extension first", "error");
      return;
    }
    const result = await unisat.requestAccounts();
    handleAccountsChanged(result, 1);
  };

  // const checkReferralCodeClickHandler = async () => {
  //   if (referralCode != code) {
  //     showMessage(
  //       `${referralCode == null || referralCode.trim() == ""
  //         ? "Please enter a referral code."
  //         : "Your referral code dose not match."
  //       }`,
  //       "error"
  //     );
  //     return;
  //   } else {
  //     showMessage(
  //       `Your referral code is correct. Please connect your wallet to start swapping.`,
  //       "info"
  //     );
  //   }
  // };

  const pageLoadingChanged = (data: any) => {
    setLoading(data);
  };

  const pageMessageChanged = (data: any) => {
    showMessage(data?.text, data?.type, data?.timeout);
  };

  useEffect(() => {
    ee.on("page-loading", pageLoadingChanged);
    ee.on("page-message", pageMessageChanged);
    return () => {
      ee.remove("page-loading", pageLoadingChanged);
      ee.remove("page-message", pageMessageChanged);
    };
  }, []);

  const strip = (text: any) => {
    try {
      return (
        new DOMParser()?.parseFromString(text, "text/html")?.body
          ?.textContent || ""
      );
    } catch (e) {
      return "";
    }
  };

  const [isMenuMobile, setMenuMobile] = useState(false);

  const showMenuMobile = () => {
    setMenuMobile(!isMenuMobile);
  };

  const showLoginWallet = () => {
    setLoginWallet(!loginWallet);
  };

  const showProfile = () => {
    setProfile(!profile);
  };

  const closeLoginWallet = () => setLoginWallet(false);

  const handleClickMenu = useCallback((e: any) => {
    e.target.parentElement.classList.add("left-[-100%]");
    e.target.parentElement.classList.remove("left-0");
  }, []);

  const disconnectUnisatClickHandler = async (e: any) => {
    setCookie("login", "false", 365);
    window.location.reload();
  };

  const setCookie = (cname: any, cvalue: any, exdays: any) => {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  };

  const getCookie = (cname: any) => {
    let name = cname + "=";
    let ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  };

  return (
    <>
      <Helmet>
        <title>{xstore?.title}</title>
        {xstore?.description && (
          <meta name="description" content={xstore?.description} />
        )}
        {!xstore?.description && (
          <meta name="description" content={xstore?.title} />
        )}
        <meta name="viewport" content="width=device-width, user-scalable=no" />
        <link rel="icon" href={xstore?.faviconUrl} />
        {xstore?.socialThumbUrl && (
          <meta property="og:image" content={xstore?.socialThumbUrl} />
        )}
        {!xstore?.socialThumbUrl && (
          <meta property="og:image" content={xstore?.faviconUrl} />
        )}
        <meta name="viewport" content="width=device-width, user-scalable=no" />
        <link rel="icon" href={xstore?.faviconUrl} />
        <style
          type="text/css"
          dangerouslySetInnerHTML={{
            __html: `

              @font-face {
                font-family: '${xstore?.fontFamily}';
                src: url(${xstore?.fontUrl});
                font-style: normal;
                font-display: swap;
              }

              @font-face {
                font-family: '${xstore?.fontHeading}';
                src: url(${xstore?.fontUrlHeading});
                font-style: normal;
                font-display: swap;
              }

              h1,h2,h3 {
                font-family: ${xstore?.fontHeading}, sans-serif;
                color: ${xstore?.headingColor};
                line-height: 1;
              }

              body {
                font-family: ${xstore?.fontFamily}, sans-serif;
              }

              .btn.bg-primary:hover,
              div .primary:hover{
                color: ${xstore?.primaryColor};
              }
            `,
          }}
        />
      </Helmet>

      <div className="main p-0 relative bg-bg bg-banner bg-contain bg-repeat-x">
        <div className="bg-before relative sub-page bg-air"></div>
        <div className="container relative flex flex-col h-full">
          <header className="header z-20 lg:py-8 py-4">
            <div className="flex items-center">
              <Link
                to={"/"}
                className="relative z-10 lg:mb-8 block mr-auto"
              >
                {xstore.faviconUrl && (
                  <img
                    className="w-[150px] lg:w-[220px]"
                    src={xstore.page.header?.logo?.imageUrl}
                    alt={strip(xstore.page.header?.logo?.title) || ""}
                  />
                )}
              </Link>
              <div className="flex items-center">
                {!wallet && (
                  <button
                    onClick={showLoginWallet}
                    className="flex justify-center items-center lg:px-8 px-4 py-2.5 lg:text-[18px] text-[14px]"
                  >
                    Connect wallet
                  </button>
                )}
                {wallet && (
                  <div className="relative">
                    <div
                      onClick={showProfile}
                      className="flex justify-center items-center lg:px-6 lg:py-2.5 p-4 rounded-lg border border-border cursor-pointer text-[16px]"
                    >
                      <img className="w-8 h-8 rounded-full mr-3" src="images/logo-token.png" alt="" />
                      0xf5....774A2
                    </div>
                    {profile && (
                      <div className="p-2 rounded-xl bg-[rgba(34,34,34,0.8)] filter-blur font-semibold text-[16px] absolute right-0 min-w-[263px]">
                        <Link to={'/my-wallet'} className=" cursor-pointer font-semibold flex items-center p-3">
                          <img className="mr-4" src="images/icon/use.svg" alt="" />
                          My Wallet
                        </Link>
                        <Link to={'/my-reward'} className="cursor-pointer font-semibold flex items-center p-3">
                          <img className="mr-4" src="images/icon/gif.svg" alt="" />
                          Reward
                        </Link>
                        <div className=" cursor-pointer font-semibold flex items-center p-3">
                          <img className="mr-4" src="images/icon/logout.svg" alt="" />
                          Logout
                        </div>
                      </div>
                    )}
                  </div>
                )}
                {loginWallet && (
                  <div className="flex items-center justify-center fixed z-30 h-full w-full top-0 left-0">
                    <div className="mx-[15px] bg-login-popup rounded-xl p-4 lg:p-[64px] sm:p-[30px_20px] border border-border relative md:w-[772px] w-full z-[1] flex flex-col justify-center">
                      <h3 className="mb-8 inline-flex text-gradient">Connect your wallet</h3>
                      <div className="flex flex-wrap items-center md:-mx-4 -mx-2">
                        <div className="flex-[0_0_50%] md:px-4 px-2 md:mb-8 mb-4">
                          <div
                            className={"cursor-pointer p-3 rounded-lg border border-border flex items-center"}
                          >
                            <img
                              className="w-6 mr-3"
                              src="/images/icons/metamask.svg"
                              alt=""
                            />
                            <p className="font-fontHeading font-semibold text-[14px]">MetaMask</p>
                          </div>
                        </div>
                        <div className="flex-[0_0_50%] md:px-4 px-2 md:mb-8 mb-4">
                          <div
                            className={"cursor-pointer p-3 rounded-lg border border-border flex items-center"}
                          >
                            <img
                              className="w-6 mr-3"
                              src="/images/icons/walletconnect.svg"
                              alt=""
                            />
                            <p className="font-fontHeading font-semibold text-[14px]">WalletConnect</p>
                          </div>
                        </div>
                        <div className="flex-[0_0_50%] md:px-4 px-2 md:mb-8 mb-4">
                          <div
                            className={"cursor-pointer p-3 rounded-lg border border-border flex items-center"}
                          >
                            <img
                              className="w-6 mr-3"
                              src="/images/icons/coinbase.svg"
                              alt=""
                            />
                            <p className="font-fontHeading font-semibold text-[14px]">Coinbase Wallet</p>
                          </div>
                        </div>
                        <div className="flex-[0_0_50%] md:px-4 px-2 md:mb-8 mb-4">
                          <div
                            className={"cursor-pointer p-3 rounded-lg border border-border flex items-center"}
                          >
                            <img
                              className="w-6 mr-3"
                              src="/images/icons/trust.svg"
                              alt=""
                            />
                            <p className="font-fontHeading font-semibold text-[14px]">Trust Wallet</p>
                          </div>
                        </div>
                        <div className="flex-[0_0_50%] md:px-4 px-2 md:mb-8 mb-4">
                          <div
                            className={"cursor-pointer p-3 rounded-lg border border-border flex items-center"}
                          >
                            <img
                              className="w-6 mr-3"
                              src="/images/icons/argent.svg"
                              alt=""
                            />
                            <p className="font-fontHeading font-semibold text-[14px]">Argent</p>
                          </div>
                        </div>
                        <div className="flex-[0_0_50%] md:px-4 px-2 md:mb-8 mb-4">
                          <div
                            className={"cursor-pointer p-3 rounded-lg border border-border flex items-center"}
                          >
                            <img
                              className="w-6 mr-3"
                              src="/images/icons/onto.svg"
                              alt=""
                            />
                            <p className="font-fontHeading font-semibold text-[14px]">Onto</p>
                          </div>
                        </div>
                        <div className="flex-[0_0_50%] md:px-4 px-2 md:mb-8 mb-4">
                          <div
                            className={"cursor-pointer p-3 rounded-lg border border-border flex items-center"}
                          >
                            <img
                              className="w-6 mr-3"
                              src="/images/icons/imwallet.svg"
                              alt=""
                            />
                            <p className="font-fontHeading font-semibold text-[14px]">imWallet</p>
                          </div>
                        </div>
                        <div className="flex-[0_0_50%] md:px-4 px-2 md:mb-8 mb-4">
                          <div
                            className={"cursor-pointer p-3 rounded-lg border border-border flex items-center"}
                          >
                            <img
                              className="w-6 mr-3"
                              src="/images/icons/steakwallet.svg"
                              alt=""
                            />
                            <p className="font-fontHeading font-semibold text-[14px]">Steakwallet</p>
                          </div>
                        </div>
                        <div className="flex-[0_0_50%] md:px-4 px-2">
                          <div
                            className={"cursor-pointer p-3 rounded-lg border border-border flex items-center"}
                          >
                            <img
                              className="w-6 mr-3"
                              src="/images/icons/trust.svg"
                              alt=""
                            />
                            <p className="font-fontHeading font-semibold text-[14px]">Trust</p>
                          </div>
                        </div>
                        <div className="flex-[0_0_50%] md:px-4 px-2">
                          <div
                            className={"cursor-pointer p-3 rounded-lg border border-border flex items-center"}
                          >
                            <img
                              className="w-6 mr-3"
                              src="/images/icons/bitkeep.svg"
                              alt=""
                            />
                            <p className="font-fontHeading font-semibold text-[14px]">Bitkeep</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      onClick={closeLoginWallet}
                      className="top-0 left-0 bg-[rgba(0,0,0,0.8)] absolute h-full w-full content-[''] cursor-pointer"
                    ></div>
                  </div>
                )}
              </div>
              {/* <button
                onClick={showMenuMobile}
                className="flex lg:hidden relative z-10 p-0 bg-transparent justify-center items-center bg-gradient-to-t hover:border-none hover:bg-gradient-to-t hover:bg-transparent border-none"
              >
                <img
                  className="w-[18px]"
                  src={xstore.page.header?.menu}
                  alt=""
                />
              </button> */}
              {/* {xstore?.page.header.menuItem.map((item: any, index: any) => {
                  return (
                    <NavLink
                      key={index}
                      onClick={handleClickMenu}
                      className="m-[8px_0] w-full flex items-center group font-semibold text-[15px] leading-[15px] rounded-2xl hover:bg-primary"
                      to={item.url}
                    >
                      {item.icon && (
                        <>
                          <i
                            className={`${item.icon} border-[1.5px] border-[#050300] shadow-[0_0_3px_rgba(0,0,0,0.5)] mr-[37px] text-[20px] w-8 h-8 flex items-center justify-center bg-[#33250F] group-hover:bg-primary rounded-full`}
                          ></i>
                        </>
                      )}
                      {item.title}
                    </NavLink>
                  );
                })} */}
            </div>
          </header>
          <div className="main flex items-center justify-center lg:min-h-[calc(100vh_-_253px)] min-h-screen">
            <Outlet />
          </div>
          <footer className="lg:py-8 py-4">
            <div className="container sm:flex items-center">
              <div className="mr-auto mb-6 sm:mb-0">
                <Link className="" to="/">
                  <img className="mx-auto sm:mx-0 w-[130px] mb-2" src={xstore.page.header.logo.imageUrl} alt={xstore.page.header.logo.title} />
                </Link>
                <p className="text-[14px] text-[#7D7D7D] text-center sm:text-left">©2024 Satochain. All rights reserved</p>
              </div>
              <div className="flex items-center justify-center">
                {xstore?.page.header.socialLinks.map((item: any, index: any) => {
                  return (
                    <a
                      key={index}
                      className="px-2"
                      href={item.url}
                      target="_blank"
                    >
                      <img className="w-5" src={`/images/${item.imageUrl}`} alt="" />
                    </a>
                  );
                })}
              </div>
            </div>
          </footer>
        </div>
      </div>
      {message?.text && (
        <div className="fixed bottom-[15px] left-[15px] z-[1000] p-[8px_5px_5px_5px] text-white bg-black text-[85%] px-[12px] rounded-[5px]">
          <span className={message.type === "error" ? "error" : ""}>
            &nbsp;
            {message.text}
          </span>
        </div>
      )}
    </>
  );
};

export default Layout;
