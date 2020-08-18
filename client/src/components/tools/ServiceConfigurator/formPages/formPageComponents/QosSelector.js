import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const QosSelector = ({ deviceType, qosType, classOfService }) => {
  const [options, setOptions] = useState([]);
  useEffect(() => {
    const getQosOptions = async (deviceType, classOfService) => {
      try {
        const res = await axios.get(
          `/api/configGenerator/${qosType}/${deviceType}/${classOfService}`
        );
        let optionArray = [];
        optionArray.push(
          <option key='0' value=''>
            Select
          </option>
        );
        res.data.map((obj) => {
          optionArray.push(
            <option key={obj._id} value={obj.policyName}>
              {obj.policyName}
            </option>
          );
        });

        setOptions(optionArray);
      } catch (err) {
        console.log('Error loading ' + qosType + ' Options');
        setOptions([<option> No Options Available</option>]);
      }
    };
    getQosOptions(deviceType, classOfService);
  }, [deviceType, qosType, classOfService]);

  return options;
};

export default QosSelector;
