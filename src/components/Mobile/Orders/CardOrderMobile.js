import React, { useEffect, useState } from "react";
import ModalDetailOrderAdmin from "../../orders/ModalDetailOrderAdmin";
import { BsChevronDown } from "react-icons/bs";
import useOrderMobileContext from "../../../hooks/useOrderMobileContext";
import { formatPhone } from "../../../helpers/formatPhone";
import Select, { components } from "react-select";
import { editStatus } from "../../../services/orders";
import { updateOrderFireBase } from "../../../services/FireBase";

function CardOrderMobile({ order, isPaid }) {
  const [isPaidValue, setIsPaidValue] = useState(isPaid.isPaid);
  const personalAccessToken =
    "eyJraWQiOiIxY2UxZTEzNjE3ZGNmNzY2YjNjZWJjY2Y4ZGM1YmFmYThhNjVlNjg0MDIzZjdjMzJiZTgzNDliMjM4MDEzNWI0IiwidHlwIjoiUEFUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNjkwMjIxNTA5LCJqdGkiOiI0YTNlNmNkMC04YTYwLTRhZjctYmM2Yi1iMDQ3ZTc0NzBjODciLCJ1c2VyX3V1aWQiOiIyNzY2MDJmYS1mZDBhLTQ5YTgtYWRlOS0zNGQ5MDA3MDM3MGQifQ.aBj3lv0O_ZIFjxpEFr-I3_OXewRWNwbGPTEEtyhCH0fl0ICwk4Co1Y8_KrEbiTNZIRl8NAKmyl_ZE0MPtbeosA";
  useEffect(() => {
    loadCalendly();
  }, []);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [inviteeData, setInviteeData] = useState();
  const [eventData, setEventData] = useState();
  const optionsSelect = [
    {
      value: "Solicitado",
      label: "Solicitado",
      color: "#304FFE",
      hoverColor: "#536DFE",
    },
    {
      value: "Contratado",
      label: "Contratado",
      color: "#00C853",
      hoverColor: "#69F0AE",
    },
    {
      value: "Negado",
      label: "Negado",
      color: "#DD2C00",
      hoverColor: "#FF6E40",
    },
    {
      value: "Cancelado",
      label: "Cancelado",
      color: "#D50000",
      hoverColor: "#FF5252",
    },
    {
      value: "Em andamento",
      label: "Em andamento",
      color: "#FFD600",
      hoverColor: "#FFFF00",
    },
    {
      value: "Exigências",
      label: "Exigências",
      color: "#6200EA",
      hoverColor: "#7C4DFF",
    },
    {
      value: "Checkout",
      label: "Checkout",
      color: "#00BFA5",
      hoverColor: "#64FFDA",
    },
    {
      value: "Concluído",
      label: "Concluído",
      color: "#64DD17",
      hoverColor: "#B2FF59",
    },
  ];
  const [selectedValue, setSelectedValue] = useState(
    optionsSelect.find(
      (option) =>
        option.value ===
        (order.status === "solicitado" ? "Solicitado" : order.status)
    )
  );

  function handleSelectStatus(status) {
    setSelectedValue(status);
    editStatus(status.value, order.id);
  }

  const { idOrder, setIdOrder } = useOrderMobileContext(0);
  function fecharModal() {
    setIsOpen(false);
  }
  function abrirModal() {
    setIsOpen(true);
  }

  function handleIsPaid(e) {
    setIsPaidValue(e.target.checked);
    updateOrderFireBase(isPaid.id, e.target.checked);
  }

  function loadCalendly() {
    fetch(order.inviteeUri, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${personalAccessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setInviteeData(data));
    fetch(order.eventUri, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${personalAccessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setEventData(data));
  }
  const IndicatorSeparator = () => null;
  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        {props.children}
      </components.DropdownIndicator>
    );
  };
  const SingleValue = ({ children, ...props }) => (
    <components.SingleValue {...props}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            height: 10,
            width: 10,
            backgroundColor: props.data.color,
            borderRadius: 10,
            marginRight: 5,
          }}
        />
        {children}
      </div>
    </components.SingleValue>
  );

  return (
    <div
      className={`${
        order.id === idOrder && "bg-themecolor-800"
      }  py-3 w-full transition-[background] duration-75  text-themecolor-100 border-b border-b-themecolor-800`}
    >
      <ModalDetailOrderAdmin
        order={order}
        modalIsOpen={modalIsOpen}
        fecharModal={fecharModal}
        inviteeData={inviteeData}
        eventData={eventData}
      />
      <div className="w-full flex justify-between items-center">
        <div className="mx-2  w-[calc(24%-0.5rem)] ">
          <span className=" cursor-text">{order.schedulingDate}</span>
        </div>
        <div className="mx-2 w-[calc(31%-0.5rem)] line-clamp-2">
          <span className=" cursor-text">{order.Product.name}</span>
        </div>

        <div className=" mx-2 w-[calc(18%-0.5rem)]">
          <span className=" cursor-text">R$ {order.price}</span>
        </div>

        <div className=" mx-2 w-[calc(20%-0.5rem)]">
          <Select
            options={optionsSelect}
            onChange={handleSelectStatus}
            defaultValue={selectedValue}
            placeholder="Selecione..."
            components={{
              IndicatorSeparator,
              DropdownIndicator: selectedValue ? () => null : DropdownIndicator,
              SingleValue,
            }}
            styles={{
              valueContainer: (provided) => ({
                ...provided,
                padding: "0",
              }),

              indicatorsContainer: (provided) => ({
                ...provided,
                padding: "0",
              }),
              dropdownIndicator: (provided) => ({
                ...provided,
                padding: "0",
              }),
              control: (baseStyles, state) => ({
                ...baseStyles,

                backgroundColor: selectedValue ? "transparent" : "#121212",
                padding: "0",
                border: state.isFocused
                  ? "1px solid #03A9F4"
                  : "1px solid transparent",
                fontSize: "11px",

                boxShadow: state.isFocused && "",
                "&:hover": {
                  boxShadow: state.isFocused ? "0 0 0 1px #03A9F4" : "",
                  border: state.isFocused
                    ? "1px solid #03A9F4"
                    : "1px solid #4f5357",
                },
                outline: state.isFocused ? "none" : "",
              }),
              option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isSelected
                  ? state.data.color
                  : state.isFocused
                  ? state.data.hoverColor
                  : "#121212",
                color: state.isSelected
                  ? "#e6edf3"
                  : state.isFocused
                  ? "black"
                  : state.data.color,
                boxShadow: "none",
              }),
              menu: (provided) => ({
                ...provided,
                border: "1px solid #30363D",
                boxShadow: "none",
                backgroundColor: "#121212",
                width: "max-content",
                minWidth: "100%",
              }),
              singleValue: (provided, state) => ({
                ...provided,
                color: "#e6edf3",
                textOverflow: "clip",
                overflow: "visible",
                display: "flex",
              }),
              placeholder: (provided) => ({
                ...provided,
                color: "#9ea1a3",
              }),
            }}
          />
        </div>

        <div className="mx-2 w-[calc(8%-0.5rem)] flex justify-center">
          <BsChevronDown
            onClick={() => {
              if (order.id === idOrder) {
                setIdOrder("");
              } else {
                setIdOrder(order.id);
              }
            }}
            className={`transition-all duration-500 
            
          ${order.id === idOrder && "rotate-180 transform "}
          `}
          />
        </div>
      </div>
      <div
        className={`mx-[0.8333%] pt-4 pl-[0.250rem] text-[0.813rem] transition-all duration-500 ${
          order.id === idOrder ? " block opacity-100" : "hidden opacity-0"
        }`}
      >
        <div className="flex">
          <span className=" inline-block mr-1 font-medium">Contador: </span>
          <span className="text-themecolor-300">{order.User.name}</span>
        </div>
        <div className="flex truncate">
          <span className=" inline-block mr-1 font-medium ">
            Empresa Cliente:{" "}
          </span>
          <span className="text-themecolor-300 truncate">
            {order.Customer.name}
          </span>
        </div>
        <div className="flex">
          <span className=" inline-block mr-1 font-medium">Fornecedor: </span>
          <span className="text-themecolor-300">ICP certificadora</span>
        </div>
        <div className="flex">
          <span className=" inline-block mr-1 font-medium">
            Previsibilidade:{" "}
          </span>
          <span className="text-themecolor-300">Previsibilidade</span>
        </div>
        <div className="flex">
          <span className=" inline-block mr-1 font-medium">Pagamento: </span>

          <input
            onClick={(e) => e.stopPropagation()}
            type="checkbox"
            checked={isPaidValue}
            onChange={handleIsPaid}
            className=" lg:h-4 lg:w-4 xl:h-5 xl:w-5 accent-secondColor-300"
            name="payment"
          />
        </div>
      </div>
    </div>
  );
}

export default CardOrderMobile;
