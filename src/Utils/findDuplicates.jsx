 const findDuplicates = (arr) => {
    const emailCount = {};
    const duplicates = [];

    arr?.forEach(item => {
      const email = item?.email;
      if (emailCount[email]) {
        emailCount[email] += 1;
      } else {
        emailCount[email] = 1;
      }
    });

    for (const email in emailCount) {
      if (emailCount[email] > 1) {
        duplicates.push(email);
      }
    }
    const removeEmailObjects = () => {
      return arr?.filter(item => !duplicates.includes(item.email));
    };
    const filteredEmails = removeEmailObjects();
    return filteredEmails;
  };
  
export default findDuplicates;