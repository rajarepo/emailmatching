import React, { useEffect, useState } from "react";
import jsonNameData from '../email_names.json'
import jsonNumberData from '../email_numbers.json'
import findDuplicates from "../Utils/findDuplicates";
import identifyMatch from "../Utils/identifyMatch";

const EmailMatch = () => {

  const [nameData, setNameData] = useState(null);

  useEffect(() => {
    setNameData(jsonNameData)
  }, [])
  const [numberData, setNumberData] = useState(null);

  useEffect(() => {
    setNumberData(jsonNumberData)
  }, [])

  const emailListNames = findDuplicates(nameData);
  const emailListNumbers = findDuplicates(numberData);

  const matchingEmailNames = identifyMatch(emailListNames);
  const matchingEmailNumbers = identifyMatch(emailListNumbers);

  const findMatchingEmails = () => {
    const matchingEmails = [];
    matchingEmailNumbers?.forEach(item1 => {
      matchingEmailNames?.forEach(item2 => {
        if (item1?.email === item2?.email) {
          matchingEmails.push({ email: item1.email, cc_number: item1.cc_number, first_name: item2.first_name, last_name: item2.last_name });
        }
      });
    });
    return matchingEmails;
  };
  
  const matchingEmails = findMatchingEmails();

  return (
    <div className="centered-container"> {/* Apply CSS to center the table */}
      <div>
        <h2 className='text-align-center'>Matching Emails</h2>
        <table className="email-table"> {/* Add a class name to the table */}
          <thead>
            <tr>
              <th>Email</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>cc_Number</th>
            </tr>
          </thead>
          <tbody>
            {matchingEmails.map(item => (
              <tr key={item.email}>
                <td>{item.email}</td>
                <td>{item.first_name}</td>
                <td>{item.last_name}</td>
                <td>{item.cc_number}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default EmailMatch;