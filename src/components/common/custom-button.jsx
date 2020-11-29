import React from 'react';
import Button from 'react-bootstrap/Button';

const CustomButton = ({isLoading=false, text, type}) => 
  <Button variant="primary" className="custom-button" type={type}>
  {isLoading 
    ? <div className="spinner-border text-white" role="status" />
    :  text
   }
  </Button>


export default CustomButton;