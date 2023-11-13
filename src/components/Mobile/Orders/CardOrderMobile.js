import React, { useEffect, useState } from "react";
import ModalDetailOrderAdmin from "../../orders/ModalDetailOrderAdmin";
import { BsChevronDown } from "react-icons/bs";
import useOrderMobileContext from "../../../hooks/useOrderMobileContext";
import { formatPhone } from "../../../helpers/formatPhone";

function CardOrderMobile({ order }) {
  const personalAccessToken =
    "eyJraWQiOiIxY2UxZTEzNjE3ZGNmNzY2YjNjZWJjY2Y4ZGM1YmFmYThhNjVlNjg0MDIzZjdjMzJiZTgzNDliMjM4MDEzNWI0IiwidHlwIjoiUEFUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNjkwMjIxNTA5LCJqdGkiOiI0YTNlNmNkMC04YTYwLTRhZjctYmM2Yi1iMDQ3ZTc0NzBjODciLCJ1c2VyX3V1aWQiOiIyNzY2MDJmYS1mZDBhLTQ5YTgtYWRlOS0zNGQ5MDA3MDM3MGQifQ.aBj3lv0O_ZIFjxpEFr-I3_OXewRWNwbGPTEEtyhCH0fl0ICwk4Co1Y8_KrEbiTNZIRl8NAKmyl_ZE0MPtbeosA";
  useEffect(() => {
    loadCalendly();
  }, []);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [inviteeData, setInviteeData] = useState();
  const [eventData, setEventData] = useState();
  const { idOrder, setIdOrder } = useOrderMobileContext(0);
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
          <div className="bg-[#00C853] cursor-default text-[#1B5E20] flex text-center justify-center items-center rounded-sm">
            <span className=" cursor-text">Ativo</span>
          </div>
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
            {order.Customer.company}
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
            className=" lg:h-4 lg:w-4 xl:h-5 xl:w-5 accent-secondColor-300"
            name="payment"
          />
        </div>
      </div>
    </div>
  );
}

export default CardOrderMobile;
