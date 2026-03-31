/** assumes input is ten digit un-hyphenated string */
export const formatPhoneNumber = (phoneNum: string) =>
  `(${phoneNum.substring(0, 3)}) ${phoneNum.substring(
    3,
    6
  )}-${phoneNum.substring(6)}`;
