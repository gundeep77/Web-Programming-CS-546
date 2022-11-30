//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.

module.exports = {
  isValidDate: (dateString) => {
    if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) {
      return false;
    }
    let parts = dateString.split("/");
    let month = parseInt(parts[0]);
    let day = parseInt(parts[1]);
    let year = parseInt(parts[2]);
    let currentDate = new Date();

    if (
      year < 1900 ||
      year > currentDate.getFullYear() + 2 ||
      month == 0 ||
      month > 12
    )
      return false;

    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    return day > 0 && day <= daysInMonth[month - 1];
  },

  isValidRuntimeFormat: (string) => {
    return !/^[0-9]{0,1}[0-9]h [0-5]{0,1}[0-9]min$/.test(string) ? false : true;
  },

  isAlphanumeric: (string) => {
    return !/^[a-zA-Z0-9 ]+$/i.test(string) ? false : true;
  },

  isOnlyAlphabets: (string) => {
    return !/^[a-zA-Z ]+$/i.test(string) ? false : true;
  },
};
