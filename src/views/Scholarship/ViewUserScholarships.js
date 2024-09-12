import React, { useState } from 'react';
import { Container, Row, Col, Form, FormControl } from 'react-bootstrap';
import StaticCard from './StaticCard'; // Adjust the import path based on your folder structure
import allScholarshipData from './data/allScholarshipData'; // Assuming scholarship data is in a separate file

const ViewUserScholarships = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Function to handle changes in the search input
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter scholarships based on the search term
  const filteredScholarships = allScholarshipData.filter((scholarship) =>
    scholarship.scholarshipName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      {/* Scholarships Section */}
      <Row xs={1} md={2} className="g-4"> {/* Adjusted spacing class */}
        {filteredScholarships.map((scholarship) => (
          <Col xs={12} md={6} key={scholarship._id}> {/* Ensure 2 cards in a row */}
            <StaticCard
              title={scholarship.scholarshipName}
              description={scholarship.description}
              deadline={scholarship.deadline}
              scholarshipURL={scholarship.scholarshipURL}
              buttonText="View Details"
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ViewUserScholarships;