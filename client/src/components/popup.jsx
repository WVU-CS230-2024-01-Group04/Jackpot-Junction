import React, {useState} from 'react';
import '../components/popup.css'

const Popup = ({ isOpen, onClose, onSubmit }) =>
{
    const [cardNumber, setCardNumber] = useState('');
    const [cvv, setCvv] = useState('');
    const [expiration, setExpiration] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
  
    const handleSubmit = () => 
    {
        //checking that all fields are full
        if (
            cardNumber.length === 16 &&
            cvv.length === 3 &&
            expiration.length === 5 && 
            firstName.length > 0 &&
            lastName.length > 0
          )
          {
            //clearing input fields after submission and closing the popup
            setCardNumber('');
            setCvv('');
            setExpiration('');
            setFirstName('');
            setLastName('');
            onSubmit();
          }
          else
          {
            alert("Please fill in all fields with correct values.");
            return;
          }
    };


    return(
        <div>
                {/* This html stuff here is for determining whether the popup is supposed to be open, and then displaying input boxes for credit card info. */}
        {isOpen && (
          <div className="popup-overlay">
            <div className="popup">
              <h4>Enter your credit card information here to get more tokens!</h4>
              <div className="input-group">
              <label>Card Number:</label>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                maxLength="16"
                placeholder="Enter 16-digit card number"
              />
            </div>
            <div className="input-group">
              <label>CVV:</label>
              <input
                type="text"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                maxLength="3" 
                placeholder="Enter 3-digit CVV"
              />
            </div>
            <div className="input-group">
              <label>Expiration (MM/YY):</label>
              <input
                type="text"
                value={expiration}
                onChange={(e) => setExpiration(e.target.value)}
                maxLength="5" 
                placeholder="Enter MM/YY"
              />
            </div>
            <div className="input-group">
              <label>First Name:</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                maxLength="50"
                placeholder="Enter first name"
              />
            </div>
            <div className="input-group">
              <label>Last Name:</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                maxLength="50" 
                placeholder="Enter last name"
              />
            </div>
              <button className="close-btn" onClick={onClose}>Close</button>
              <button className="close-btn" onClick={handleSubmit}>Submit</button>
            </div>
          </div>
        )}
      </div>
    )
}

export default Popup;