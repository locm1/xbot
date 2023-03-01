export const calculateAge = (birthday) => {
  const jpTime = new Date(new Date().toLocaleString({ timeZone: 'Asia/Tokyo' })).getTime();
  var ageDifMs = jpTime - birthday.getTime();
  var ageDate = new Date(ageDifMs); // UTC milliseconds to Date object

  return Math.abs(ageDate.getUTCFullYear() - 1970);
}