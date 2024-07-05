// import logo from './logo.svg';
// import './App.css';
import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import ProcurementChatbot from "./components/procurementChatbot";
import GadChatbot from "./components/gadChatbot";

// main component of app
// default ui component for home page
function App() {
  const [activeTab, setActiveTab] = useState("tab1");

  return (
    <div className="px-[30px] py-[30px] ">
      <div className="mt-5 flex justify-center">
        <nav className="w-[30%] flex items-center p-1 space-x-1 rtl:space-x-reverse text-sm text-gray-600 bg-gray-500/5 rounded-xl dark:bg-gray-500/20">
          <button
            role="tab"
            type="button"
            className={`w-[50%] justify-center flex whitespace-nowrap items-center h-8 px-5 font-medium rounded-lg outline-none ${
              activeTab === "tab1" && "border-2 border-yellow-600"
            } shadow bg-white dark:text-white dark:bg-yellow-600`}
            onClick={() => setActiveTab("tab1")}
          >
            procurement bot
          </button>

          <button
            role="tab"
            type="button"
            className={`w-[50%] justify-center flex whitespace-nowrap items-center h-8 px-5 font-medium rounded-lg outline-none ${
              activeTab === "tab2" && "border-2 border-yellow-600"
            }  hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300 dark:focus:text-gray-400`}
            onClick={() => setActiveTab("tab2")}
          >
            gad bot
          </button>
        </nav>
      </div>
      {activeTab === "tab1" && <ProcurementChatbot />}
      {activeTab === "tab2" && <GadChatbot />}
    </div>
    // <div className="h-[100vh] flex bg-[#002D62] gap-x-3 p-5 ">
    //   <div className="w-[20%] px-5 flex flex-col ">
    //     <h1 className="text-white text-center ">Chatbot</h1>
    //     <hr class="h-px my-5 bg-gray-400 border-0"></hr>
    //     <button className="text-white text-left ">Procurement Bot</button>
    //     <button className="text-white text-left ">Gad Bot</button>
    //   </div>
    //   <div className="w-[80%] relative h-full rounded-lg bg-white ">
    //     <h1 className="text-black font-bold mx-5 my-5">
    //       General Administrative Department Bot
    //     </h1>
    //     <p className="text-black mx-5 my-3 ">
    //       Search content from documents of General Administrative Department of
    //       Bihar.
    //     </p>
    //     <hr class="h-px my-5 bg-gray-400 border-0"></hr>
    //     <div className="w-full max-h-[60%] rounded-md pb-5 overflow-y-auto ">
    //       <div className="flex justify-end mx-5 my-5">
    //         <div className="border border-black bg-gray-400 text-black rounded-lg px-5 py-1 max-w-[90%] ">
    //           tell me about desing thinking
    //         </div>
    //       </div>
    //       <div className="text-left mx-5 my-5 max-w-[70%] ">
    //         <div className=" border resize-none border-black h-full bg-gray-100 rounded-lg px-5 py-1 ">
    //           Lorem Ipsum is simply dummy text of the printing and typesetting
    //           industry. Lorem Ipsum has been the industry's standard dummy text
    //           ever since the 1500s, when an unknown printer took a galley of
    //           type and scrambled it to make a type specimen book.
    //         </div>
    //       </div>
    //     </div>
    //     <div className="flex absolute bottom-0 rounded-lg w-full px-5 my-5 box-border ">
    //       <input
    //         type="text"
    //         name="q"
    //         id="query"
    //         placeholder="Ask me anything ..."
    //         value=""
    //         className="w-[85%] box-border p-3 rounded-md border-2 border-r-white rounded-r-none border-gray-300 placeholder-gray-500 dark:placeholder-gray-300 dark:bg-gray-500dark:text-gray-300 dark:border-none "
    //       />

    //       <button
    //         className={`w-[15%] bg-violet-700
    //            text-white text-lg font-semibold rounded-r-md`}
    //       >
    //         <SendIcon />
    //       </button>
    //     </div>
    //   </div>
    // </div>
  );
}

export default App;
