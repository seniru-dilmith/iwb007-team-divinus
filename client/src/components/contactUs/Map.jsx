import React from 'react';
import { Card } from 'react-bootstrap';

const Map = () => {
  return (
    <Card className="p-3 shadow-sm mt-5">
      <h5 className="mb-3">Find Us on the Map</h5>
      <iframe
        title="Sri Lanka Railway Station"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63300.87844147346!2d79.82760447103048!3d6.93399348569054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25953d243f4df%3A0x0d8c4b3c7a7840b7!2sColombo%20Fort%20Railway%20Station!5e0!3m2!1sen!2slk!4v1631890392385!5m2!1sen!2slk"
        width="100%"
        height="400"
        allowFullScreen=""
        loading="lazy"
      ></iframe>
    </Card>
  );
};

export default Map;
