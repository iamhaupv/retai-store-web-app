import { Link } from "react-router-dom";
import React, { useState } from "react";
import moment from "moment";

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState(moment());

  const handleDateChange = (event) => {
    setSelectedDate(moment(event.target.value));
  };

  const handlePrev = () => {
    setSelectedDate(selectedDate.clone().subtract(1, "week"));
  };

  const handleNext = () => {
    setSelectedDate(selectedDate.clone().add(1, "week"));
  };

  const daysOfWeek = Array.from({ length: 7 }, (_, i) =>
    selectedDate.clone().startOf("isoWeek").add(i, "days")
  );
  const dayNames = [
    "Thứ hai",
    "Thứ ba",
    "Thứ tư",
    "Thứ năm",
    "Thứ sáu",
    "Thứ bảy",
    "Chủ nhật",
  ];
  return (
    <>
      <div className="min-h-screen bg-gray-100 w-full ">
        <div className="w-full flex mt-2 grid-flow-row justify-self-center">
          <Link to="/">
            <button className=" btn btn-circle bg-gray-200   ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6 "
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </Link>
          <h2 className=" h-9 pl-24 text-xl font-semibold ">
            Lịch làm việc
          </h2>
        </div>

        <div class="w-auto ">
          <header class=" w-full flex items-center justify-start border-b border-gray-200  py-4 flex-none">
            <div class="w-full flex items-center justify-start">
              <button
                type="button"
                className="btn w-28 justify-items-center border-y border-gray-300 px-3.5 text-sm font-semibold text-gray-900 hover:bg-white "
                onClick={handlePrev}
              >
                <svg
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                    clip-rule="evenodd"
                  />
                </svg>
                Trước 
              </button>
              <button
                type="button"
                className="btn w-28 ml-1 justify-items-center  border-y border-gray-300 px-3.5 text-sm font-semibold text-gray-900 hover:bg-white "
                onClick={handleNext}
              >
              Sau
                <svg
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                    clip-rule="evenodd"
                  />
                </svg>
                
              </button>
              <input
                    type="date"
                    className="input w-40 ml-2 border-2  rounded-md"
                    onChange={handleDateChange}
                  />
            </div>
          </header>


          <div class="w-auto shadow ring-1 ring-black ring-opacity-5 overflow-x-auto">
            <div class="grid grid-cols-7 w-full h-24  gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700 ">
              {daysOfWeek.map((day, index) => (
                <div class="justify-center bg-white py-2">
                  <div class="sr-only not-sr-only whitespace-nowrap">{dayNames[index]}</div>
                  <h1 class="sr-only not-sr-only whitespace-nowrap">
                    {day.format("DD/MM/YYYY")}
                  </h1>
                </div>
              ))}
            </div>
            <div class="flex bg-gray-200 text-xs leading-6 text-gray-700 ">

              <div class=" w-full grid grid-cols-7 grid-rows-6 gap-px">
                {/*
                    Always include: "relative py-2 px-3"
                    Is current month, include: "bg-white"
                    Is not current month, include: "bg-white text-gray-500"
                    */}
                {daysOfWeek.map((day, index) => (
                  <div
                    key={index}
                    class="relative bg-white px-3 py-2 text-gray-500 "
                  >
                    {/*
                        Is today, include: "flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white"
                    */}
                    <time dateTime={day.format("YYYY-MM-DD")} className="whitespace-nowrap">
                      7:30 - 12:30{" "}
                    </time>
                  </div>
                ))}
                {daysOfWeek.map((day, index) => (
                  <div key={index} class="relative bg-white px-3 py-2">
                    <time dateTime={day.format("YYYY-MM-DD")} className="whitespace-nowrap">
                      12:30 - 17:30
                    </time>
                    <ol class="mt-2">
                      <li>
                        <a href="" class="group flex">
                          <p class="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600 whitespace-nowrap">
                            Nguyễn Thanh Khoa
                          </p>
                        </a>
                      </li>
                    </ol>
                  </div>
                ))}
                {daysOfWeek.map((day, index) => (
                  <div key={index} class="relative bg-white px-3 py-2 whitespace-nowrap">
                    <time dateTime={day.format("YYYY-MM-DD")}>
                      17:30 - 22:30
                    </time>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
