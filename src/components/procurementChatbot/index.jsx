import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import ResultUI from "../resultUi";
import { API_URL } from "../../utils/constants";

// common template ui for both tabs
const ProcurementChatbot = () => {
  const [searchText, setSearchText] = useState("");
  const [resultData, setResultData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (searchText === "") {
      Swal.fire("Please enter some text!");
      return;
    }
    setLoading(true);
    try {
      let res = await axios.post(`${API_URL}v1/procurement`, {
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
        setResultData(res.data?.output);
        setLoading(false);
      }
    } catch (error) {
      console.log("there is some error", error);
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <div className="mt-7 flex flex-col justify-center items-center ">
        <h1 className="text-[32px] font-semibold ">Procurement Bot</h1>
        <p className="mt-5 text-center ">
          Search content from General Finance Rules, Bihar Finance Rules and
          Procurement of Goods Manual.
        </p>
        <div className="mt-10 flex w-full justify-center items-center dark:bg-gray-800">
          <div className="flex relative rounded-md w-full px-4 max-w-xl">
            <input
              type="text"
              name="q"
              id="query"
              placeholder="Enter text"
              value={searchText}
              className="w-full p-3 rounded-md border-2 border-r-white rounded-r-none border-gray-300 placeholder-gray-500 dark:placeholder-gray-300 dark:bg-gray-500dark:text-gray-300 dark:border-none "
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              className="inline-flex items-center gap-2 bg-violet-700 text-white text-lg font-semibold py-3 px-6 rounded-r-md"
              onClick={handleSearch}
            >
              <span>search</span>
            </button>
          </div>
        </div>
      </div>
      <ResultUI resultData={resultData} loading={loading} />
    </>
  );
};

export default ProcurementChatbot;
