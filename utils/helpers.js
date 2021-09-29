module.exports = {
  format_date: (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDay();
    return `${month}/${day}/${year}`
  }
}