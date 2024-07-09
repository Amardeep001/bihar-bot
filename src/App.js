// import logo from './logo.svg';
// import './App.css';
import React, { useState } from "react";
import ProcurementChatbot from "./components/procurementChatbot";
import GadChatbot from "./components/gadChatbot";
import biharLogo from "../src/assets/images/bihar-logo-red.png";
import biharMainLogo from "../src/assets/images/bihar-main-logo.png";

// main component of app
// default ui component for home page
function App() {
  const [activeTab, setActiveTab] = useState("tab1");

  return (
    // bg-[#002D62]
    // bg-[#816165]
    <div className="h-[100vh] flex bg-gradient-to-r from-[#249EE3] to-[#3874D3] gap-x-3 p-5 ">
      <div className="w-[20%] px-5 py-7 flex flex-col ">
        <div className="flex items-center justify-center gap-x-3">
          <img
            alt="bihar_logo"
            src={biharMainLogo}
            className="w-8 h-8 rounded-[100%] "
          />
          <h1 className="text-white font-medium text-[24px] ">
            BIHAR ज्ञान मित्र
          </h1>
        </div>

        <hr className="h-px my-5 bg-gray-400 border-0"></hr>
        <button
          className={` text-left font-medium ${
            activeTab === "tab1" ? "bg-white text-black" : "text-white"
          } rounded-md py-2 px-3 flex items-center gap-x-2 `}
          onClick={() => setActiveTab("tab1")}
        >
          <img alt="bihar_logo" src={biharLogo} className="w-5 h-5" />
          Procurement BOT
        </button>
        <button
          className={` text-left font-medium ${
            activeTab === "tab2" ? "bg-white text-black " : "text-white"
          } rounded-md py-2 px-3 flex items-center gap-x-2 `}
          onClick={() => setActiveTab("tab2")}
        >
          <img alt="bihar_logo" src={biharLogo} className="w-5 h-5" />
          GAD BOT
        </button>
      </div>
      {activeTab === "tab1" && <ProcurementChatbot />}
      {activeTab === "tab2" && <GadChatbot />}
    </div>
  );
}

export default App;
