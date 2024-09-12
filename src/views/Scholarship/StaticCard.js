import React from 'react';
import { Card, Button } from 'react-bootstrap';

const StaticCard = ({ title, description, deadline, buttonText, scholarshipURL }) => {
  const handleButtonClick = () => {
    window.location.href = scholarshipURL;  // Redirects to the URL in the same tab when the button is clicked
  };

  return (
    <Card style={{ width: '55rem', margin: '20px', border: '3px solid #e0e0e0', padding: '20px', borderRadius: '15px'}} className="custom-card">
  <Card.Body>
    <Card.Title style={{ marginBottom: '20px', fontWeight: 'bold', fontSize: '1.5rem' }}>{title}</Card.Title>
    <Card.Text style={{ marginBottom: '20px' }}>{description}</Card.Text>
    <Card.Text style={{ marginBottom: '20px' }}><strong>Deadline to Apply:</strong> {deadline}</Card.Text>
    <Button variant="primary" onClick={handleButtonClick}>{buttonText}</Button>
  </Card.Body>
</Card>

  );
};

export default StaticCard;