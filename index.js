const fs = require("fs");

async function CalendarCrawler(year = "1403") {
  const holidays = [];
  for (let month = 1; month <= 12; month++) {
    const monthHolydays = { month, days: [] };
    for (let day = 1; day <= 31; day++) {
      try {
        const res = await fetch(
          `https://holidayapi.ir/jalali/${year}/${month}/${day}`
        ).then((res) => res.json());
        if (res.is_holiday) {
          monthHolydays.days.push({ day, ...res });
        }
      } catch (e) {
        console.log(year, month, day);
        console.log(e);
        //* not valid day
      }
    }
    console.log("month", month, "finished");
    holidays.push(monthHolydays);
  }
  return holidays;
}

CalendarCrawler().then((holidays) => {
  fs.writeFileSync("./holidays.json", JSON.stringify(holidays));
});
