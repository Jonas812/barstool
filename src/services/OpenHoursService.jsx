import { DateTime } from "luxon";

class OpenHoursService {
  static summarizeOpenHours(openhours) {
    const days = ["mon", "tue", "wen", "thu", "fri", "sat", "sun"];
    const dayNames = [
      "Montag",
      "Dienstag",
      "Mittwoch",
      "Donnerstag",
      "Freitag",
      "Samstag",
      "Sonntag",
    ];

    let summary = [];
    let currentRange = { start: null, end: null, hours: null };

    days.forEach((day, index) => {
      const hours = openhours[day];
      const dayName = dayNames[index];
      if (!currentRange.hours) {
        currentRange = { start: dayName, end: dayName, hours };
      } else if (currentRange.hours === hours) {
        currentRange.end = dayName;
      } else {
        if (currentRange.start === currentRange.end) {
          summary.push([currentRange.start, currentRange.hours]);
        } else {
          summary.push([
            `${currentRange.start} - ${currentRange.end}`,
            currentRange.hours,
          ]);
        }
        currentRange = { start: dayName, end: dayName, hours };
      }
    });

    if (currentRange.start === currentRange.end) {
      summary.push([currentRange.start, currentRange.hours]);
    } else {
      summary.push([
        `${currentRange.start} - ${currentRange.end}`,
        currentRange.hours,
      ]);
    }

    return summary;
  }

  static parseOpenHours(openHours) {
    const days = ["sun", "mon", "tue", "wen", "thu", "fri", "sat"];
    const parsedHours = {};

    days.forEach((day) => {
      if (openHours[day]) {
        const hours = openHours[day];
        if (hours) {
          const [start, end] = hours.split(" - ");
          parsedHours[day] = {
            start: this.convertToMinutes(start),
            end: this.convertToMinutes(end),
          };
        } else {
          parsedHours[day] = { start: null, end: null }; // Closed all day
        }
      } else {
        parsedHours[day] = { start: null, end: null }; // Closed all day
      }
    });

    return parsedHours;
  }

  static convertToMinutes(time) {
    if (!time) return null;
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  }

  static getCurrentTimeInMinutes(timezone) {
    const now = DateTime.now().setZone(timezone);
    return now.hour * 60 + now.minute;
  }

  static isLocationOpen(openHours, timezone) {
    const now = DateTime.now().setZone(timezone);
    const currentDayIndex = (now.weekday + 5) % 7; // Monday=0, Sunday=6
    const currentDay = ["mon", "tue", "wen", "thu", "fri", "sat", "sun"][
      currentDayIndex
    ];
    const currentTimeInMinutes = this.getCurrentTimeInMinutes(timezone);

    const hours = openHours[currentDay];

    // Check if the day is closed
    if (hours.start === null || hours.end === null) {
      return false;
    }

    const { start, end } = hours;

    // Check if current time is within the open hours range
    if (start <= end) {
      // Normal hours (e.g., 9:00 - 17:00)
      return currentTimeInMinutes >= start && currentTimeInMinutes <= end;
    } else {
      // Overnight hours (e.g., 22:00 - 2:00)
      return currentTimeInMinutes >= start || currentTimeInMinutes <= end;
    }
  }
}

export default OpenHoursService;
