import React, { useState } from 'react';
import axios from 'axios';
import { IoMdSend } from "react-icons/io";
import { MdOutlineChat } from "react-icons/md";

export default function Ask() {
  const [input, setInput] = useState('');
  const [stack, setStack] = useState([]);

  const excludedFields = ['greeting', 'question'];  // Add more field names to exclude here

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };


  const handleSendClick = async () => {
    // Add the user's input to the stack before sending the request
    const newPrompt = {
      field: 'prompt',
      response: input,
      role: 'user',
    };
    setStack((prevStack) => [...prevStack, newPrompt]);

    try {
      const response = await axios.post('http://127.0.0.1:5000/getQA', {
        prompt: input,
      });

      // Extract the values from the response object
      const responseData = response.data;
      const extractedResponses = [];

      const parseResponse = (obj) => {
        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            const value = obj[key];
            if (excludedFields.includes(key)) {
              // Directly add the value for excluded fields
              extractedResponses.push(value);
            } else if (typeof value === 'object' && !Array.isArray(value)) {
              parseResponse(value); // Recursive call for nested objects
            } else {
              extractedResponses.push(value);
            }
          }
        }
      };

      parseResponse(responseData);

      // Add each extracted response to the stack
      extractedResponses.forEach((res) => {
        const newResponse = {
          field: 'response',
          response: Array.isArray(res) ? res.join(', ') : res,
          originalResponse: JSON.stringify(responseData, null, 2),  // JSON encode the original response
          role: 'model'
        };
        setStack((prevStack) => [...prevStack, newResponse]);
      });

      setInput('');  // Clear the input field after sending
    } catch (error) {
      console.error(error);
    }
  };

  

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'end', padding: '.5rem 1rem 1rem 1rem', gap: '.7rem', backgroundColor:'rgb(19,19,19)' }}>


    {
      !stack.length && (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
          <div style={{backgroundColor: 'white', boxShadow: '0rem 0rem .4rem rgba(0, 0, 0, 0.237)', padding: '1.7rem', borderRadius: '2rem', display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '2rem'}}>
            <MdOutlineChat />
            <p style={{fontFamily: 'Kanit, sans-serif', fontWeight: '800', fontStyle: 'italic'}}> AXON</p>
          </div>
        </div>
      )
    }

      <div className='message_stack' style={{overflowY: 'scroll', padding: '1rem 0rem', display: 'flex', flexDirection: 'column', gap: '1rem'}}>
        {stack.map((entry, index) => (
          <div key={index} style={{ textAlign: entry.role === 'user' ? 'right' : 'left' }}>
            <div style={{ display: 'inline-block', padding: '10px', borderRadius: '10px', margin: '5px', backgroundColor: entry.role === 'user' ? 'rgb(25, 25, 25)' : 'rgb(25, 25, 25)', color: 'white', maxWidth: '80%', boxShadow: entry.role === 'user' ? '0rem 0rem .9rem rgba(0, 174, 255, 0.400)' : '0rem 0rem .9rem rgba(212, 0, 255, 0.400)', textAlign: 'left', wordBreak: 'break-all'}}>
              {entry.response}
            </div>
          </div>
        ))}
      </div>

      <div style={{ backgroundColor: 'white', padding: '.6rem 1.2rem', borderRadius: '1rem', display: 'flex', gap: '1rem', justifyContent: 'center', boxShadow: '0rem 0rem 2rem rgba(0, 0, 0, 0.237)' }}>
        <div style={{ display: 'flex', gap: '1rem', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
          <input style={{ backgroundColor: 'transparent', borderStyle: 'none', width: '100%', outline: 'none' }} type="text" value={input} onChange={handleInputChange} placeholder='Hi, Ask Quiestions to your Documents.'/>
          <button style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center', border: 'none', padding: '0rem', fontSize: '1.3rem', transition: '200ms' }} onClick={handleSendClick}><IoMdSend className='send_button' /></button>
        </div>
      </div>
    </div>
  );
}
