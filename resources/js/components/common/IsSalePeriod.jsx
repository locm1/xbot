export const isSalePeriod = (start_date, end_date) => {
  const startDate = new Date(start_date)
  const endDate = new Date(end_date)
  const now = new Date()
  if (start_date && !end_date) {
    return now >= startDate;
  } else if (!start_date && end_date) {
    return now <= endDate;
  } else {
    return now >= startDate && now <= endDate;
  }
}