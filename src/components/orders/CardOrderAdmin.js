import { useEffect, useState } from "react";
import ModalDetailOrderAdmin from "./ModalDetailOrderAdmin";

function CardOrderAdmin({ order }) {
  const personalAccessToken =
    "eyJraWQiOiIxY2UxZTEzNjE3ZGNmNzY2YjNjZWJjY2Y4ZGM1YmFmYThhNjVlNjg0MDIzZjdjMzJiZTgzNDliMjM4MDEzNWI0IiwidHlwIjoiUEFUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNjkwMjIxNTA5LCJqdGkiOiI0YTNlNmNkMC04YTYwLTRhZjctYmM2Yi1iMDQ3ZTc0NzBjODciLCJ1c2VyX3V1aWQiOiIyNzY2MDJmYS1mZDBhLTQ5YTgtYWRlOS0zNGQ5MDA3MDM3MGQifQ.aBj3lv0O_ZIFjxpEFr-I3_OXewRWNwbGPTEEtyhCH0fl0ICwk4Co1Y8_KrEbiTNZIRl8NAKmyl_ZE0MPtbeosA";
  useEffect(() => {
    loadCalendly();
  }, []);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [inviteeData, setInviteeData] = useState();
  const [eventData, setEventData] = useState();

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

      <div className="mx-2 w-[calc(14.5%-0.5rem)]  ">
        <span className=" cursor-text" onClick={(e) => e.stopPropagation()}>
          {order.User.name}
        </span>
      </div>
      <div className=" mx-2 w-[calc(14.5%-0.5rem)] ">
        <span className=" cursor-text" onClick={(e) => e.stopPropagation()}>
          {order.Customer.company}
        </span>
      </div>
      <div className="mx-2 w-[calc(11.5%-0.5rem)] ">
        <span className=" cursor-text" onClick={(e) => e.stopPropagation()}>
          {order.Product.name}
        </span>
      </div>
      <div className=" mx-2 w-[calc(12.5%-0.5rem)] ">
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
      <div className=" mx-2 w-[calc(9%-0.5rem)]">
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-[#00C853] cursor-default text-[#1B5E20] flex text-center justify-center items-center rounded-sm"
        >
          <span className=" cursor-text">Ativo</span>
        </div>
      </div>
      <div className=" mx-2 w-[calc(8%-0.5rem)] flex items-center">
        <input
          onClick={(e) => e.stopPropagation()}
          type="checkbox"
          className=" h-5 w-5 accent-secondColor-300"
          name="payment"
        />
      </div>
    </div>
  );
}

export default CardOrderAdmin;
