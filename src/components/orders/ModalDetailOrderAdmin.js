import Modal from "react-modal";
import { formatedUTCDate, formatedUTCTime } from "../../helpers/formatedUTC";
import { formatPhone } from "../../helpers/formatPhone";
import { formatCpfCnpj } from "../../helpers/formatCpfCnpj";

function ModalDetailOrderAdmin({
  order,
  modalIsOpen,
  fecharModal,

  inviteeData,
  eventData,
}) {
  Modal.setAppElement("#root");

  return (
    <div onClick={(e) => e.stopPropagation()} className=" hidden">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={fecharModal}
        contentLabel="Order modal"
        closeTimeoutMS={200}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0 ,0, 0.8)",
            zIndex: "100",
          },
          content: {
            border: "#424242",
            backgroundColor: "#212121",
            borderRadius: "15px",
            padding: "15px",
            paddingLeft: "0",
            width: "70%",
            height: "90%",
            margin: "auto",
          },
        }}
      >
        <div className="w-[100%] h-full flex">
          <div className="w-[30%]  border-r border-r-[#424242]  h-full">
            <div className="flex justify-center">
              <div className="max-w-[70%]">
                <div className="text-center border-b border-b-[#424242] pb-2">
                  <h1 className=" text-themecolor-50 lg:text-xl xl:text-2xl font-bold ">
                    {order.Customer.company}
                  </h1>
                </div>
              </div>
            </div>
            <div className=" pl-[15px] pt-7 flex flex-col">
              <p className=" lg:text-xs xl:text-sm text-themecolor-100">
                Data da criação do agendamento
              </p>
              <span className="pl-1 lg:text-xs xl:text-sm text-themecolor-400">
                Dia: {formatedUTCDate(inviteeData?.resource.created_at)}
              </span>
              <span className="pl-1 lg:text-xs xl:text-sm text-themecolor-400">
                Hora: {formatedUTCTime(inviteeData?.resource.created_at)}
              </span>
              <p className=" pt-2 lg:text-xs xl:text-sm text-themecolor-100">
                Status do agendamento no Calendly
              </p>
              <span className="pl-1 lg:text-xs xl:text-sm text-themecolor-400">
                {inviteeData?.resource.status}
              </span>
            </div>
          </div>

          <div className=" w-[70%]  ">
            <div className="w-full flex  justify-end">
              <button
                className=" text-secondColor-400 lg:text-lg xl:text-[20px] mr-2 flex justify-start "
                onClick={fecharModal}
              >
                Fechar
              </button>
            </div>
            <div className="flex w-full lg:text-[0.813rem] xl:text-base gap-2">
              <div className="w-[50%] border-r border-r-themecolor-800">
                <div className="pl-2">
                  <p className="lg:text-base xl:text-lg text-secondColor-100">
                    Informações do agendamento
                  </p>
                  <div className="flex flex-col pl-4 pt-2">
                    <p className=" lg:text-sm xl:text-base text-themecolor-100">
                      Dia do agendamento
                    </p>
                    <span className="pl-1 lg:text-sm xl:text-base  text-themecolor-400">
                      {order.schedulingDate}
                    </span>
                    <p className=" text-themecolor-100">
                      Horario do agendamento
                    </p>
                    <span className="pl-1  text-themecolor-400">
                      {order.schedulingTime}
                    </span>
                  </div>
                </div>
                <div className="pl-2 pt-6">
                  <p className="lg:text-base xl:text-lg text-secondColor-100">
                    Informações do Produto
                  </p>
                  <div className="flex flex-col pl-4 pt-2">
                    <p className=" text-themecolor-100">Nome do produto</p>
                    <span className="pl-1  text-themecolor-400">
                      {order.Product.name}
                    </span>
                    <p className=" text-themecolor-100">
                      Preço final do produto
                    </p>
                    <span className="pl-1  text-themecolor-400">
                      R$ {order.price}
                    </span>
                    <p className=" text-themecolor-100">
                      Preço minimo do produto
                    </p>
                    <span className="pl-1  text-themecolor-400">
                      R$ {order.Product.min_price}
                    </span>
                    <p className=" text-themecolor-100">
                      Preço maximo do produto
                    </p>
                    <span className="pl-1  text-themecolor-400">
                      R$ {order.Product.max_price}
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-1/2">
                <div className="pl-2 ">
                  <p className="lg:text-base xl:text-lg text-secondColor-100">
                    Informações do Cliente
                  </p>
                  <div className="flex flex-col pl-4 pt-2">
                    <p className=" text-themecolor-100">Nome do Cliente</p>
                    <span className="pl-1  text-themecolor-400">
                      {order.Customer.name}
                    </span>
                    <p className=" text-themecolor-100">Nome da Empresa</p>
                    <span className="pl-1  text-themecolor-400">
                      {order.Customer.company}
                    </span>
                    <p className=" text-themecolor-100">Email do cliente</p>
                    <span className="pl-1  text-themecolor-400">
                      {order.Customer.email}
                    </span>
                    <p className=" text-themecolor-100">Telefone do cliente</p>
                    <span className="pl-1  text-themecolor-400">
                      {formatPhone(order.Customer.phone)}
                    </span>
                    <p className=" text-themecolor-100">
                      {order.Customer.cpf ? "Cpf do cliene" : "Cnpj do cliente"}
                    </p>
                    <span className="pl-1  text-themecolor-400">
                      {formatCpfCnpj(order.Customer.cpf) ||
                        formatCpfCnpj(order.Customer.cnpj)}
                    </span>
                  </div>
                </div>
                <div className="pl-2 pt-5">
                  <p className="lg:text-base xl:text-lg text-secondColor-100">
                    Informações do Contador
                  </p>
                  <div className="flex flex-col pl-4 pt-2">
                    <p className=" text-themecolor-100">Nome do contador</p>
                    <span className="pl-1  text-themecolor-400">
                      {order.User.name}
                    </span>
                    <p className=" text-themecolor-100">Telefone do contador</p>
                    <span className="pl-1  text-themecolor-400">
                      {formatPhone(order.User.phone)}
                    </span>
                    <p className=" text-themecolor-100">Email do contador</p>
                    <span className="pl-1  text-themecolor-400">
                      {order.User.email}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ModalDetailOrderAdmin;
