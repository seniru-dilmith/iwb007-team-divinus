import React from 'react';
import { Form, Button, Card } from 'react-bootstrap';

const ContactForm = () => {
  return (
    <Card className="p-4 shadow-sm">
      <Card.Body>
        <h5>Send Us a Message</h5>
        <Form>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter your name" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter your email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formSubject">
            <Form.Label>Subject</Form.Label>
            <Form.Control type="text" placeholder="Enter subject" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formMessage">
            <Form.Label>Message</Form.Label>
            <Form.Control as="textarea" rows={4} placeholder="Write your message here" />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Submit
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default ContactForm;
