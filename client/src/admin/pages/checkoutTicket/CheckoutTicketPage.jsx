import React, { useState } from "react";

import TicketStatus from "../../css/checkoutTicket/TicketStatus";
import KeyValueSet from "../../../general/components/validatePage/KeyValueSet";
import TicketCheckoutForm from "../../components/checkoutTicket/TicketCheckoutForm";

import axios from "../../../api/axios";
import useAxios from "../../../hooks/useAxios";
import useWaiter from "../../../hooks/useWaiter";

import "../../css/checkoutTicket/checkoutTicket.css";

const CheckoutTicketPage = () => {
    const [ticketNumber, setTicketNumber] = useState("");
    const [ticketStatus, setTicketStatus] = useState("");
    const [ticketData, setTicketData] = useState(null);
    const [times, setTimes] = useState({
      start: "",
      end: ""
    })
    const { addWaiter, removeWaiter } = useWaiter();
    const axiosWithToken = useAxios();

    const arrivalTime = (trainData, station) => {
      const id = trainData.destinations.findIndex((stationData, index, array) => {
        return (station === stationData.station)
      })
      return trainData.destinations[id].time
    }

    const updateTicketData = async () => {
      addWaiter("Validating ticket...");
        axios
        .post("ticket/", { token: ticketNumber })
        .then((response) => {
          const train = response.data.train;
          const ticket = response.data.ticket;
  
          console.log(train, ticket);
  
          if (!train || !ticket) {
            setTicketData(null);
            // alert("Invalid Ticket Number or expired ticket");
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
            setTicketStatus("expired");
          } else {
            setTicketStatus("active");
          }
        })
        .catch((error) => {
          alert("Invalid Ticket Number or expired ticket");
          console.error(error);
        })
        .finally(() => {
          removeWaiter("Validating ticket...");
        });
    }
  
    const handleValidate = async () => {
        updateTicketData();
      };

      const handleCheckout = async () => {
        if(ticketData === null || ticketData.token!==ticketNumber){
          updateTicketData();
        }
        if(ticketStatus==="active"){
          addWaiter("Checking out the ticket...");
          axiosWithToken
          .post("/ticket/validate", { token: ticketNumber })
          .then((response) => {
            setTicketStatus("checkedout");
          })
          .catch((error) => {
            alert("Invalid Ticket Number or expired ticket");
            console.error(error);
          })
          .finally(() => {
            removeWaiter("Checking out the ticket...");
          });
        }else if(ticketData.token===ticketNumber){
          alert("Invalid or expired ticket");
        }
   
       };
  
    return (
      <>
        <div className="checkout-page-container two-cell">
            {/* Left Column: Ticket Validation Form */}
            <div className="ticket-form-col">
              <div className="ticket-form-content">
                <h1 className="validate-title mb-4 text-center">
                  VALIDATE, CHECKOUT TICKET
                </h1>
                <TicketCheckoutForm
                  ticketNumber={ticketNumber}
                  setTicketNumber={setTicketNumber}
                  handleValidate={handleValidate}
                  handleCheckout={handleCheckout}
                />
                {ticketStatus !== "" && (
                  <div className="mt-5 w-50" style={{ margin: "auto" }}>
                    <TicketStatus ticketStatus={ticketStatus} />
                  </div>
                )}
              </div>
            </div>
  
            {/* Right Column: Ticket Details */}
            {(
              <div
                className="ticket-details-col"
              >
                <div className="mt-5 border rounded p-4">
                  <h4>Ticket Details</h4>
                  <KeyValueSet keyData="Token" valueData={ticketData ? ticketData.token : ""} />
                  <KeyValueSet keyData="Name" valueData={ticketData ? ticketData.name : ""} />
                  <KeyValueSet keyData="NIC" valueData={ticketData ? ticketData.nic : ""} />
                  <KeyValueSet keyData="Date" valueData={ticketData ? ticketData.date : ""} />
                  <KeyValueSet
                    keyData="Departure"
                    valueData={ticketData ? ticketData.departureStation+" @ "+times.start : ""}
                  />
                  <KeyValueSet
                    keyData="Arrival"
                    valueData={ticketData ? ticketData.arrivalStation+" @ "+times.end : ""}
                  />
                  <h5 className="mt-4 text-center">Reserved Seats</h5>
                  <KeyValueSet
                    keyData="First Class"
                    valueData={ticketData ? ticketData.seatsQuantity.firstClass : ""}
                  />
                  <KeyValueSet
                    keyData="Second Class"
                    valueData={ticketData ? ticketData.seatsQuantity.secondClass : ""}
                  />
                  <KeyValueSet
                    keyData="Third Class"
                    valueData={ticketData ? ticketData.seatsQuantity.thirdClass : ""}
                  />
                </div>
              </div>
            )}
          </div>
      </>
    );
  };

  export default CheckoutTicketPage;