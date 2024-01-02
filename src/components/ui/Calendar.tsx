import IconCalendar from "@/assets/icon-calendar";
import React from "react";

const Calendar = () => {
  return (
    <div className="flex items-center justify-between gap-4 bg-dark-100 px-3 h-[66px] ">
      <span className="text-white">Tarih</span>
      <IconCalendar />
    </div>
  );
};

export default Calendar;
