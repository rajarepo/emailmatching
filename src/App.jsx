import React, { useEffect, useState } from 'react';
import './App.css'
import jsonNameData from './email_names.json'
import jsonNumberData from './email_numbers.json'


function App() {

  const [nameData, setNameData] = useState(null);

  useEffect(() => {
    setNameData(jsonNameData)
  }, [])

  const emailListNames = nameData;
  const findDuplicateEmailNames = () => {
    const emailCount = {};
    const duplicates = [];

    emailListNames?.forEach(item => {
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
      return emailListNames?.filter(item => !duplicates.includes(item.email));
    };
    const filteredEmailListNames = removeEmailObjects();
    return filteredEmailListNames;
  };

  const DuplicateEmailNames = findDuplicateEmailNames();

  const [numberData, setNumberData] = useState(null);

  useEffect(() => {
    setNumberData(jsonNumberData)
  }, [])

  const emailListNumbers = numberData;

  const findDuplicateEmailNumbers = () => {
    const emailCount = {};
    const duplicates = [];

    emailListNumbers?.forEach(item => {
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
      return emailListNumbers?.filter(item => !duplicates.includes(item.email));
    };
    const filteredEmailListNumbers = removeEmailObjects();
    return filteredEmailListNumbers;
  };

  const DuplicateEmailNumbers = findDuplicateEmailNumbers();

  const findMatchingEmailNumbers = () => {
    return DuplicateEmailNumbers?.filter(item1 =>
      DuplicateEmailNames?.some(item2 => item1.email === item2.email)
    );
  };
  const findMatchingEmailNames = () => {
    return DuplicateEmailNames?.filter(item1 =>
      DuplicateEmailNumbers.some(item2 => item1.email === item2.email)
    );
  };

  const matchingEmailNumbers = findMatchingEmailNumbers();
  const matchingEmailNames = findMatchingEmailNames();

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
export default App;
