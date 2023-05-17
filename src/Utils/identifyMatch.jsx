const identifyMatch = (arr) => {
    return arr?.filter(item1 =>
      arr?.some(item2 => item1.email === item2.email)
    );
  };
export default identifyMatch;