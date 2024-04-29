import React from "react";
import { FaRegPenToSquare } from "react-icons/fa6";
import { TbUserSquareRounded } from "react-icons/tb";
import { LuArrowUpCircle, LuArrowDownCircle } from "react-icons/lu";
function ContributionDetails() {
  return (
    <div className="w-[100%] flex justify-center pt-10 max-md:px-4">
      <div className="flex flex-col md:w-[90%] pb-5">
        <div className="bg-[#f0e399] p-5 flex justify-between">
          <span className="font-semibold">Your Contribution</span>
          <span className="font-semibold">Total Answers: 20</span>
        </div>

        <div className="shadow-lg rounded-md w-[100%] p-5 md:p-10 mt-2">
          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              <TbUserSquareRounded size={44} className="text-[#808080]" />
              <div className="flex flex-col ">
                <span className="text-[15px] font-semibold">Anonymous</span>
                <span className="text-[10px] text-[#808080]">
                  <span className="text-black  font-semibold">
                    Answered on:
                  </span>{" "}
                  12/04/2024{" "}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <LuArrowDownCircle size={24} className="text-red-500" />
              <p className="text-[12px] font-semibold">12</p>
              <LuArrowUpCircle size={24} className="text-green-500" />
            </div>
          </div>
          <hr />
          
          <div>
            <p className="text-[14px]">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cupiditate neque hic vel, nesciunt quibusdam at? Culpa, in, perferendis, natus cum doloribus minus ullam aut rerum assumenda saepe esse sequi eaque. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cupiditate neque hic vel, nesciunt quibusdam at? Culpa, in, perferendis, natus cum doloribus minus ullam aut rerum assumenda saepe esse sequi eaque.
            </p>
          </div>
          <div className="flex justify-end items-center">
            <button className=" text-black  hover:bg-[#FFD700] border-[1px] border-black rounded-md py-1 px-4 text-[14px]">
              Attachment.pdf
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContributionDetails;
