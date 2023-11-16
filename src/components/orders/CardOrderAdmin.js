import { useEffect, useState } from "react";
import ModalDetailOrderAdmin from "./ModalDetailOrderAdmin";
import Select, { components } from "react-select";
import { editStatus } from "../../services/orders";
import TooltipComponent from "../TooltipComponent";
import { updateOrderFireBase } from "../../services/FireBase";
function CardOrderAdmin({ order, isPaid }) {
  const [isPaidValue, setIsPaidValue] = useState(isPaid.isPaid);

  const personalAccessToken =
    "eyJraWQiOiIxY2UxZTEzNjE3ZGNmNzY2YjNjZWJjY2Y4ZGM1YmFmYThhNjVlNjg0MDIzZjdjMzJiZTgzNDliMjM4MDEzNWI0IiwidHlwIjoiUEFUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNjkwMjIxNTA5LCJqdGkiOiI0YTNlNmNkMC04YTYwLTRhZjctYmM2Yi1iMDQ3ZTc0NzBjODciLCJ1c2VyX3V1aWQiOiIyNzY2MDJmYS1mZDBhLTQ5YTgtYWRlOS0zNGQ5MDA3MDM3MGQifQ.aBj3lv0O_ZIFjxpEFr-I3_OXewRWNwbGPTEEtyhCH0fl0ICwk4Co1Y8_KrEbiTNZIRl8NAKmyl_ZE0MPtbeosA";
  useEffect(() => {
    loadCalendly();
  }, []);
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
      value: "Checkout de pagamento",
      label: "Checkout de pagamento",
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
  const [modalIsOpen, setIsOpen] = useState(false);
  const [inviteeData, setInviteeData] = useState();
  const [eventData, setEventData] = useState();
  const [selectedValue, setSelectedValue] = useState(
    optionsSelect.find(
      (option) =>
        option.value ===
        (order.status === "solicitado" ? "Solicitado" : order.status)
    )
  );
  function fecharModal() {
    setIsOpen(false);
  }
  function abrirModal() {
    setIsOpen(true);
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

  function handleSelectStatus(status) {
    setSelectedValue(status);
    editStatus(status.value, order.id);
  }

  function handleIsPaid(e) {
    setIsPaidValue(e.target.checked);
    updateOrderFireBase(isPaid.id, e.target.checked);
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
      onClick={abrirModal}
      className="py-3 w-full cursor-pointer hover:bg-themecolor-800 transition-[background] duration-75 flex justify-between items-center text-themecolor-100 border-b border-b-themecolor-800"
    >
      <ModalDetailOrderAdmin
        order={order}
        modalIsOpen={modalIsOpen}
        fecharModal={fecharModal}
        inviteeData={inviteeData}
        eventData={eventData}
      />
      <div className="mx-2  w-[calc(10%-0.5rem)] ">
        <span className=" cursor-text" onClick={(e) => e.stopPropagation()}>
          {order.schedulingDate}
        </span>
      </div>

      <div className="mx-2 w-[calc(14.5%-0.5rem)] line-clamp-2  ">
        <span className=" cursor-text" onClick={(e) => e.stopPropagation()}>
          {order.User.name}
        </span>
      </div>
      <div className=" mx-2 w-[calc(14.5%-0.5rem)]  line-clamp-2 ">
        <span className=" cursor-text" onClick={(e) => e.stopPropagation()}>
          {order.Customer.name}
        </span>
      </div>
      <div className="mx-2 w-[calc(11.5%-0.5rem)] line-clamp-2">
        <span className=" cursor-text" onClick={(e) => e.stopPropagation()}>
          {order.Product.name}
        </span>
      </div>
      <div className=" mx-2 w-[calc(12.5%-0.5rem)] line-clamp-2">
        <span className=" cursor-text" onClick={(e) => e.stopPropagation()}>
          ICP certificadora
        </span>
      </div>
      <div className=" mx-2 w-[calc(7%-0.5rem)]">
        <span className=" cursor-text" onClick={(e) => e.stopPropagation()}>
          R$ {order.price}
        </span>
      </div>
      <div className="mx-2 w-[calc(13%-0.5rem)] ">
        <span className=" cursor-text" onClick={(e) => e.stopPropagation()}>
          Previsibilidade
        </span>
      </div>
      <div
        className=" mx-2 w-[calc(9%-0.5rem)]"
        onClick={(e) => e.stopPropagation()}
      >
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
        {/* <div
          onClick={(e) => e.stopPropagation()}
          className="bg-[#00C853] cursor-default text-[#1B5E20] flex text-center justify-center items-center rounded-sm"
        >
          <span className=" cursor-text">Ativo</span>
        </div> */}
      </div>
      <div className=" mx-2 w-[calc(8%-0.5rem)] flex items-center">
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
  );
}

export default CardOrderAdmin;
