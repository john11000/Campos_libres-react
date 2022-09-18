import { useEffect, useState } from "react";

const CamposLibres = () => {
  const [elementos, setElementos] = useState([{type:"TextBox"}, {type:"BreakLine"}]);
  const [textBox, setTextBox] = useState(10);
  const [breakLine, setbreakLine] = useState(10);
  useEffect(() => {
    setTextBox(5);
    const boxForm = document.getElementById("boxs");
    const a = Sortable.create(boxForm, {
      group: {
        name: "boxes",
        pull: false,
        put: true
      },
      setData: function (dataTransfer, dragEl) {
        dataTransfer.setData("Text", "");
      }
    });
  }, []);

  const validar = (type) => {
    switch (type) {
      case "TextBox": 
        {
          if (textBox != 0) {
            elementos.push({type:"TextBox"});
            setTextBox(textBox - 1);
          }
        }
        break;
        case "BreakLine": 
        {
          if (breakLine != 0) {
            elementos.push({type:"BreakLine"});
            setbreakLine(breakLine - 1);
          }
        }
        break;
        case "SpaceLine": 
        {
          if (breakLine != 0) {
            elementos.push({type:"SpaceLine"});
            setbreakLine(breakLine - 1);
          }
        }
        break;
    }
  };

  const renderItems = elementos.map((element,idx) => {

    switch(element.type){
        case "TextBox":{
          return (
      
            <div className="col-3 my-1 element" key={idx}>
              <input
                type="text"
                className="titleNone"
                value={"Elemento" + (idx + 1)}
              ></input>
              <input type="text" value="" />
              <div className="options">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-eye-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                  <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-pencil-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-gear-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-archive-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15h9.286zM5.5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1zM.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8H.8z" />
                </svg>
              </div>
            </div>
          );
        };
        case "BreakLine":{
          return (
      
            <div className="col-12 my-1 element  text-white bg-dark" key={idx}>
              
            </div>
          );
        };
        case "SpaceLine":{
          return (
      
            <div className="col-3 my-1 element space text-white" key={idx}>
              Espacio en blanco
            </div>
          );
        };
    }
  
  });

  return (
    <div>
      <div className="toolsBox" id="toolsBox">
        <div
          className="elementTools"
          onClick={() => validar("TextBox")}
          title="Añadir un caja de texto"
        >
          <p className="tooltipCan">{textBox}</p>
         
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
          >
            <path d="M22 0h-20v6h1.999c0-1.174.397-3 2.001-3h4v16.874c0 1.174-.825 2.126-2 2.126h-1v2h9.999v-2h-.999c-1.174 0-2-.952-2-2.126v-16.874h4c1.649 0 2.02 1.826 2.02 3h1.98v-6z" />
          </svg>
        </div>
        
        <div
          className="elementTools"
          onClick={() => validar("BreakLine")}
          title="Añadir un salto de linea"
        >
          <p className="tooltipCan">{breakLine}</p>
         
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
          >
            <path d="M22 0h-20v6h1.999c0-1.174.397-3 2.001-3h4v16.874c0 1.174-.825 2.126-2 2.126h-1v2h9.999v-2h-.999c-1.174 0-2-.952-2-2.126v-16.874h4c1.649 0 2.02 1.826 2.02 3h1.98v-6z" />
          </svg>
        </div>
        <div
          className="elementTools"
          onClick={() => validar("SpaceLine")}
          title="Añadir un salto de linea"
        >
          <p className="tooltipCan">{textBox}</p>
         
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
          >
            <path d="M22 0h-20v6h1.999c0-1.174.397-3 2.001-3h4v16.874c0 1.174-.825 2.126-2 2.126h-1v2h9.999v-2h-.999c-1.174 0-2-.952-2-2.126v-16.874h4c1.649 0 2.02 1.826 2.02 3h1.98v-6z" />
          </svg>
        </div>
        <div
          className="elementTools"
          onClick={() => validar("TextBox")}
          title="Añadir un caja de texto"
        >
          <p className="tooltipCan">{textBox}</p>
         
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
          >
            <path d="M22 0h-20v6h1.999c0-1.174.397-3 2.001-3h4v16.874c0 1.174-.825 2.126-2 2.126h-1v2h9.999v-2h-.999c-1.174 0-2-.952-2-2.126v-16.874h4c1.649 0 2.02 1.826 2.02 3h1.98v-6z" />
          </svg>
        </div>
        <div
          className="elementTools"
          onClick={() => validar("TextBox")}
          title="Añadir un caja de texto"
        >
          <p className="tooltipCan">{textBox}</p>
         
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
          >
            <path d="M22 0h-20v6h1.999c0-1.174.397-3 2.001-3h4v16.874c0 1.174-.825 2.126-2 2.126h-1v2h9.999v-2h-.999c-1.174 0-2-.952-2-2.126v-16.874h4c1.649 0 2.02 1.826 2.02 3h1.98v-6z" />
          </svg>
        </div>
      </div>
      <span className="title">
        Modelar Formulario{" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-info-circle"
          viewBox="0 0 16 16"
        >
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
          <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
        </svg>
      </span>
      <div className="boxsParents">
        <div id="boxs" className="row">
          {renderItems}
          <div className="row"></div>
          <div className="row"></div>
          <div className="row"></div>
          <div className="row"></div>
          <div className="row"></div>
          <div className="row"></div>
          <div className="row"></div>
          <div className="row"></div>
          <div className="row"></div>
          <div className="row"></div>
          <div className="row"></div>
          <div className="row"></div>
        </div>
      </div>
    </div>
  );
};

export default CamposLibres;
