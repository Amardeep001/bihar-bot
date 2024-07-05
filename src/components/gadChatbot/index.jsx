import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ThreeDotsLoader } from "../commonComponent/loader";
import { API_URL } from "../../utils/constants";

// common template ui for both tabs
const GadChatbot = () => {
  const paragraphRef = useRef(null);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const gadInput = JSON.parse(localStorage.getItem("gadInput"));
  const gadOutput = JSON.parse(localStorage.getItem("gadOutput"));
  const [gadChatbotInput, setGadChatbotInput] = useState(gadInput || []);
  const [gadChatbotOutput, setGadChatbotOutput] = useState(gadOutput || []);

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = async () => {
    let arr = gadChatbotInput;
    arr.push(searchText);
    setGadChatbotInput(arr);
    localStorage.setItem("gadInput", JSON.stringify(arr));
    setSearchText("");
    setLoading(true);
    try {
      let res = await axios.post(`${API_URL}v1/gad`, {
        input: {
          language: "en",
          text: searchText,
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
        localStorage.setItem("gadOutput", JSON.stringify(outputArr));
        setLoading(false);
      }
    } catch (error) {
      console.log("there is some error", error);
      setLoading(false);
      let outputArr = gadChatbotOutput;
      outputArr.push("something went wrong");
      setGadChatbotOutput(outputArr);
      localStorage.setItem("gadOutput", JSON.stringify(outputArr));
    }
  };

  useEffect(() => {
    if (gadChatbotInput.length) {
      paragraphRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [gadChatbotInput.length]);

  return (
    <>
      <div className="mt-5 flex flex-col justify-center items-center ">
        <h1 className="text-[32px] font-semibold ">GAD Bot</h1>
        <p className="mt-5 ">
          Search content from documents of General Administrative Department of
          Bihar.
        </p>
        <div className="mt-5 flex flex-col  w-full justify-center items-center dark:bg-gray-800">
          <div className="w-full max-w-xl py-2 bg-blue-400 text-center border-[1.5px] border-blue-950 rounded-md ">
            Chat with GAD Bot
          </div>
          <div className="w-full max-w-xl h-[240px] rounded-md border-2 border-gray-300 overflow-y-auto ">
            {gadChatbotInput.map((item, index) => {
              return (
                <>
                  <div
                    className="flex justify-end mx-5 my-5"
                    ref={paragraphRef}
                  >
                    <div className="border border-black bg-gray-400 rounded-lg px-5 py-1 max-w-[90%] ">
                      {item}
                    </div>
                  </div>
                  {gadChatbotOutput.length > 0 && gadChatbotOutput[index] && (
                    <div className="text-left mx-5 my-5 max-w-[70%] ">
                      <div className=" border resize-none border-black h-full bg-gray-100 rounded-lg px-5 py-1 ">
                        {gadChatbotOutput[index]}
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
          <div className="flex relative rounded-md w-full max-w-xl">
            <input
              type="text"
              name="q"
              id="query"
              placeholder="Enter text"
              value={searchText}
              className="w-full p-3 rounded-md border-2 border-r-white rounded-r-none border-gray-300 placeholder-gray-500 dark:placeholder-gray-300 dark:bg-gray-500dark:text-gray-300 dark:border-none "
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            <button
              className={`inline-flex items-center gap-2 ${
                loading || !searchText ? "bg-violet-400" : "bg-violet-700"
              } text-white text-lg font-semibold py-3 px-6 rounded-r-md`}
              onClick={handleSearch}
              disabled={loading || !searchText}
            >
              <span>search</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default GadChatbot;
