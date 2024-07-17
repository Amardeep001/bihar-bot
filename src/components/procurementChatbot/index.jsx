import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import SendIcon from "@mui/icons-material/Send";
import { Snackbar } from "@mui/material";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ThreeDotsLoader } from "../commonComponent/loader";
import { API_URL } from "../../utils/constants";
import procurementLogo from "../../assets/images/procurement_logo.jpg";
import gfrPdf from "../../assets/docs/Compilation_of_amendments_in_GFR_2017_English_upto_31_12_2023_Final 2.pdf";
import bfrPdf from "../../assets/docs/Bihar-Finance-Rules-2005-english 2.pdf";
import cvcPdf from "../../assets/docs/Three Cover MoF_2022_curve_works.cdr.pdf";

// common template ui for both tabs
const ProcurementChatbot = () => {
  const paragraphRef = useRef(null);
  const inputRef = useRef(null);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const gadInput = JSON.parse(localStorage.getItem("procurementInput"));
  const gadOutput = JSON.parse(localStorage.getItem("procurementOutput"));
  const [gadChatbotInput, setGadChatbotInput] = useState(gadInput || []);
  const [gadChatbotOutput, setGadChatbotOutput] = useState(gadOutput || []);
  const [open, setOpen] = React.useState(false);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = async () => {
    // if (searchText === "") {
    //   Swal.fire("Please enter some text!");
    //   return;
    // }
    let arr = gadChatbotInput;
    arr.push(searchText || arr[arr.length - 1]);
    setGadChatbotInput(arr);
    localStorage.setItem("procurementInput", JSON.stringify(arr));
    setSearchText("");
    setLoading(true);
    try {
      let res = await axios.post(`${API_URL}v1/procurement`, {
        input: {
          language: "en",
          text: searchText || arr[arr.length - 1],
          audio: "",
        },
        output: {
          format: "text",
        },
      });

      if (res) {
        let outputArr = gadChatbotOutput;
        outputArr.push(res.data?.output?.text);
        setGadChatbotOutput(outputArr);
        localStorage.setItem("procurementOutput", JSON.stringify(outputArr));
        setLoading(false);
      }
    } catch (error) {
      console.log("there is some error", error);
      setLoading(false);
      // Swal.fire({
      //   icon: "error",
      //   title: "Oops...",
      //   text: "Something went wrong!",
      // });
      let outputArr = gadChatbotOutput;
      outputArr.push("something went wrong");
      setGadChatbotOutput(outputArr);
      localStorage.setItem("procurementOutput", JSON.stringify({ outputArr }));
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard?.writeText(text);
    setOpen(true);
  };

  const handleEdit = (text) => {
    inputRef.current.focus();
    setSearchText(text);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleRegenerate = () => {
    handleSearch();
  };

  useEffect(() => {
    if (gadChatbotInput.length) {
      paragraphRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [gadChatbotInput.length]);

  return (
    <div className="w-[80%] relative h-full rounded-lg bg-white ">
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        message="text is copied."
        sx={{ width: "100%" }}
      />
      <div className="flex px-5 items-center h-[120px] ">
        <img
          alt="bihar_logo"
          className="w-full h-full object-fill "
          src={procurementLogo}
        />
      </div>
      <hr className="h-px bg-gray-400 border-0"></hr>
      <div className="w-full max-h-[60%] rounded-md pb-5 overflow-y-auto ">
        {gadChatbotInput.length === 0 && (
          <div className=" rounded-lg py-5 mt-[100px] mx-[120px] px-5 text-center flex flex-col items-center justify-center">
            <h1 className="text-[24px] text-gray-500 font-medium ">
              Start Your Search Today
            </h1>
            <p className="mt-3 text-gray-400 ">
              Procurement AI BOT searches content from General Financial Rules
              (2017) , The Bihar Finance Rules (2005) , and Manual for
              Procurement of Works (2022).
            </p>
          </div>
        )}
        {gadChatbotInput.map((item, index) => {
          return (
            <>
              <div className="flex justify-end mx-5 my-5 " ref={paragraphRef}>
                <div className="border shadow-md border-black bg-[#ecd3c5] text-black rounded-lg px-5 py-1 max-w-[90%] ">
                  {/* {item} */}
                  <div className="flex gap-3 my-2 text-gray-600 text-sm flex-1">
                    <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
                      <div className="rounded-full bg-gray-100 border p-1">
                        <svg
                          stroke="none"
                          fill="black"
                          stroke-width="0"
                          viewBox="0 0 16 16"
                          height="20"
                          width="20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"></path>
                        </svg>
                      </div>
                    </span>
                    <p className="leading-relaxed">
                      <span className="block font-bold text-gray-700">
                        You{" "}
                      </span>
                      {item}
                      <div className="mt-3 flex gap-x-1 ">
                        <CopyToClipboard
                          text={item}
                          onCopy={() => handleCopy(item)}
                        >
                          <svg
                            className="h-5 w-5 text-white-500 cursor-pointer "
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            stroke-width="2"
                            stroke="currentColor"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            onClick={() => handleCopy(item)}
                          >
                            {" "}
                            <path stroke="none" d="M0 0h24v24H0z" />{" "}
                            <rect x="8" y="8" width="12" height="12" rx="2" />{" "}
                            <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2" />
                          </svg>
                        </CopyToClipboard>
                        <svg
                          className="h-5 w-5 text-white-500 cursor-pointer "
                          viewBox="0 0 24 24"
                          stroke-width="2"
                          stroke="currentColor"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          onClick={() => handleEdit(item)}
                        >
                          {" "}
                          <path stroke="none" d="M0 0h24v24H0z" />{" "}
                          <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />{" "}
                          <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />{" "}
                          <line x1="16" y1="5" x2="19" y2="8" />
                        </svg>
                      </div>
                    </p>
                  </div>
                </div>
              </div>
              {gadChatbotOutput.length > 0 && gadChatbotOutput[index] && (
                <div className="text-left mx-5 my-5 max-w-[80%] ">
                  <div className="mt-[50px] border resize-none border-black h-full bg-gray-200 rounded-lg flex flex-col justify-center items-center ">
                    <div className="flex gap-3 px-5 my-4 w-[100%] text-gray-600 text-sm flex-1">
                      <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
                        <div className="rounded-full bg-gray-100 border p-1">
                          <svg
                            stroke="none"
                            fill="black"
                            stroke-width="1.5"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            height="20"
                            width="20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                            ></path>
                          </svg>
                        </div>
                      </span>
                      <p className="leading-relaxed w-[90%]">
                        <span className="block font-bold text-gray-700">
                          AI{" "}
                        </span>
                        {/* {gadChatbotOutput[index]} */}
                        <div className="mt-5 flex gap-x-[10px] ">
                          <div className="w-[33%] px-[10px] py-[20px] text-center border rounded-lg bg-gray-50 shadow-md ">
                            <a href={gfrPdf} target="_blank" rel="noreferrer">
                              <button className="bg-[#EEF6FF] cursor-pointer text-[12px] font-medium border border-[#3874D3] rounded-md px-2 py-1 ">
                                General Financial Rules, 2017
                              </button>
                            </a>

                            <p className="mt-5 break-words text-center ">
                              {gadChatbotOutput[index].gfr ||
                                gadChatbotOutput[index]}
                            </p>
                          </div>
                          <div className="w-[33%] px-[10px] py-[20px] text-center border rounded-lg bg-gray-50 shadow-md ">
                            <a href={bfrPdf} target="_blank" rel="noreferrer">
                              <button className="bg-[#EEF6FF] cursor-pointer text-[12px] font-medium border border-[#3874D3] rounded-md px-2 py-1 ">
                                The Bihar Finance Rules, 2005
                              </button>
                            </a>

                            {/* <h2 className="text-[20px] ">BFR</h2> */}
                            <p className="mt-5 break-words text-center ">
                              {gadChatbotOutput[index].bfr ||
                                gadChatbotOutput[index]}
                            </p>
                          </div>
                          <div className="w-[33%] p-[10px] py-[20px] text-center border rounded-lg bg-gray-50 shadow-md ">
                            <a href={cvcPdf} target="_blank" rel="noreferrer">
                              <button className="bg-[#EEF6FF] cursor-pointer text-[12px] font-medium border border-[#3874D3] rounded-md px-2 py-1 ">
                                Manual for Procurement of Works, 2022
                              </button>
                            </a>

                            {/* <h2 className="text-[20px] ">CVC</h2> */}
                            <p className="mt-5 break-words text-center ">
                              {gadChatbotOutput[index].cvc ||
                                gadChatbotOutput[index]}
                            </p>
                          </div>
                        </div>
                        <div className="mt-3 flex gap-x-1 ">
                          <CopyToClipboard
                            text={gadChatbotOutput[index]?.gfr}
                            onCopy={() =>
                              handleCopy(() =>
                                handleCopy(gadChatbotOutput[index]?.gfr)
                              )
                            }
                          >
                            <svg
                              className="h-5 w-5 text-white-500 cursor-pointer"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              stroke-width="2"
                              stroke="currentColor"
                              fill="none"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              onClick={() =>
                                handleCopy(gadChatbotOutput[index]?.gfr)
                              }
                            >
                              {" "}
                              <path stroke="none" d="M0 0h24v24H0z" />{" "}
                              <rect x="8" y="8" width="12" height="12" rx="2" />{" "}
                              <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2" />
                            </svg>
                          </CopyToClipboard>

                          {index === gadChatbotInput.length - 1 && (
                            <svg
                              className="h-5 w-5 text-white-500 cursor-pointer"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              onClick={handleRegenerate}
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                              />
                            </svg>
                          )}
                        </div>
                      </p>
                    </div>
                  </div>
                </div>
              )}
              {!gadChatbotOutput[index] && loading && (
                <div className="text-left mx-5 my-5 max-w-[70%] ">
                  <ThreeDotsLoader />
                </div>
              )}
            </>
          );
        })}
      </div>
      <div className="flex absolute bottom-0 rounded-lg w-full px-5 my-5 box-border ">
        <input
          ref={inputRef}
          type="text"
          name="q"
          id="query"
          placeholder="Ask me anything ..."
          value={searchText}
          className="w-[85%] box-border p-3 rounded-md border-2 border-r-white rounded-r-none border-gray-300 placeholder-gray-500 dark:placeholder-gray-300 dark:bg-gray-500dark:text-gray-300 dark:border-none "
          onKeyDown={handleKeyDown}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button
          className={`w-[15%] ${
            loading || !searchText ? "bg-violet-400" : "bg-violet-700"
          } text-white text-lg font-semibold rounded-r-md`}
          onClick={handleSearch}
          disabled={loading || !searchText}
        >
          <SendIcon />
        </button>
      </div>
    </div>
  );
};

export default ProcurementChatbot;
