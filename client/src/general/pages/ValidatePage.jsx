import "../css/validatePage/validate-page.css";
import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import TicketValidationForm from "../components/validatePage/TicketValidationForm";
import TicketValidationResult from "../components/validatePage/TicketValidationResult";
import KeyValueSet from "../components/validatePage/KeyValueSet";
import "../css/validatePage/validate-page.css";
import axios from "../../api/axios";
import useWaiter from "../../hooks/useWaiter";

const ValidatePage = () => {
  const [ticketNumber, setTicketNumber] = useState("");
  const [isValidTicket, setIsValidTicket] = useState(null);
  const [ticketData, setTicketData] = useState(null);
  const [times, setTimes] = useState({
    start: "",
    end: ""
  })
  const { addWaiter, removeWaiter } = useWaiter();

  const handleValidation = async (e) => {
    e.preventDefault();
    addWaiter("Validating ticket...");

    axios
      .post("ticket/", { token: ticketNumber })
      .then((response) => {
        setIsValidTicket(true);
        const train = response.data.train;
        const ticket = response.data.ticket;

        console.log(train, ticket);

        if (!train || !ticket) {
          alert("Invalid Ticket Number or expired ticket");
          return;
        }
        setTicketData({
          token: ticket.token,
          name: ticket.details.name,
          nic: ticket.details.nic,
          date: train.startDate,
          departureStation: ticket.details.startStation,
          arrivalStation: ticket.details.endStation,
          seatsQuantity: {
            firstClass: ticket.details.seatsQuantity.firstClass,
            secondClass: ticket.details.seatsQuantity.secondClass,
            thirdClass: ticket.details.seatsQuantity.thirdClass,
          },
        });

        setTimes({
          start: arrivalTime(train, ticket.details.startStation),
          end: arrivalTime(train, ticket.details.endStation),
        })

        if (ticket.status !== "active") {
          setIsValidTicket(false);
        } else {
          setIsValidTicket(true);
        }
      })
      .catch((error) => {
        alert("Invalid Ticket Number or expired ticket");
        console.error(error);
      })
      .finally(() => {
        removeWaiter("Validating ticket...");
      });

      const arrivalTime = (trainData, station) => {
        const id = trainData.destinations.findIndex((stationData, index, array) => {
          return (station === stationData.station)
        })
        return trainData.destinations[id].time
      }
  };

  return (
    <>
      <div className={`validate-page-container ${(isValidTicket && ticketData) ? 'two-cell' : 'one-cell'}`}>
          {/* Left Column: Ticket Validation Form */}
          <div className="ticket-form-col">
            <div className="ticket-form-content">
              <h1 className="validate-title mb-4 text-center">
                VALIDATE YOUR TICKET
              </h1>
              <TicketValidationForm
                ticketNumber={ticketNumber}
                setTicketNumber={setTicketNumber}
                handleValidation={handleValidation}
              />
              {isValidTicket !== null && (
                <div className="mt-5 w-50" style={{ margin: "auto" }}>
                  <TicketValidationResult isValidTicket={isValidTicket} />
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Ticket Details */}
          {isValidTicket && ticketData && (
            <div
              className="ticket-details-col"
            >
              <div className="mt-5 border rounded p-4">
                <h4>Ticket Details</h4>
                <KeyValueSet keyData="Token" valueData={ticketData.token} />
                <KeyValueSet keyData="Name" valueData={ticketData.name} />
                <KeyValueSet keyData="NIC" valueData={ticketData.nic} />
                <KeyValueSet keyData="Date" valueData={ticketData.date} />
                <KeyValueSet
                  keyData="Departure"
                  valueData={ticketData.departureStation+" @ "+times.start}
                />
                <KeyValueSet
                  keyData="Arrival"
                  valueData={ticketData.arrivalStation+" @ "+times.end}
                />
                <h5 className="mt-4 text-center">Reserved Seats</h5>
                <KeyValueSet
                  keyData="First Class"
                  valueData={ticketData.seatsQuantity.firstClass}
                />
                <KeyValueSet
                  keyData="Second Class"
                  valueData={ticketData.seatsQuantity.secondClass}
                />
                <KeyValueSet
                  keyData="Third Class"
                  valueData={ticketData.seatsQuantity.thirdClass}
                />
              </div>
            </div>
          )}
        </div>
    </>
  );
};

export default ValidatePage;
