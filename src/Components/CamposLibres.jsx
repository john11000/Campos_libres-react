import { useEffect, useState } from "react";

const CamposLibres = () => {
  const [elementos, setElementos] = useState([]);
  const [elementoEditar, setElementoEditar] = useState();
  const [textBox, setTextBox] = useState(10);
  const [breakLine, setbreakLine] = useState(10);
  const [drp, setDrp] = useState(10);
  const [date, setDate] = useState(10);
  const [space, setSpace] = useState(10);
  useEffect(() => {
    setTextBox(5);
    const boxForm = document.getElementById("boxs");
    const rows = document.querySelectorAll(".row");
    for (let i = 0; i < rows.length; i++) {
      Sortable.create(rows[i], {
        group: "nested",
        swapThreshold: 1,
        animation: 150
      });
    }
    const a = Sortable.create(boxForm, {
      group: "nested",
      setData: function (dataTransfer, dragEl) {
        dataTransfer.setData("Text", "");
      },
      swapThreshold: 1,
      animation: 150
    });
  }, []);

  const validar = (type) => {
    switch (type) {
      case "TextBox":
        {
          if (textBox != 0) {
            elementos.push({ type: "TextBox" });
            setTextBox(textBox - 1);
          }
        }
        break;
      case "BreakLine":
        {
          if (breakLine != 0) {
            elementos.push({ type: "BreakLine" });
            setbreakLine(breakLine - 1);
          }
        }
        break;
      case "SpaceLine":
        {
          if (space != 0) {
            elementos.push({ type: "SpaceLine" });
            setSpace(space - 1);
          }
        }
        break;
      case "date":
        {
          if (date != 0) {
            elementos.push({ type: "date" });
            setDate(date - 1);
          }
        }
        break;
      case "drp":
        {
          if (drp != 0) {
            elementos.push({ type: "drp" });
            setDrp(drp - 1);
          }
        }
        break;
    }
  };

  const options = (id) => {
    return (
      <div className="options" id={"op" + id}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-eye-fill"
          viewBox="0 0 16 16"
          onClick={() => showNode(id)}
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
          onClick={() => editNode(id)}
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
          onClick={() => deleteNode(id)}
        >
          <path d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15h9.286zM5.5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1zM.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8H.8z" />
        </svg>
      </div>
    );
  };

  const editNode = (id) => {
    document.getElementById("modalOptionsButton").click();
    const elemento = document.getElementById("el-" + id)
    setElementoEditar(elemento.getAttribute("type-elemento"))
    console.log(elemento)

  };
  const deleteNode = (id) => {
    try {
      document
        .getElementById("boxs")
        .removeChild(document.getElementById("el-" + id));
    } catch (ex) {
      console.log("Ha ocurrido un error al eliminar el nodo. el-" + id);
    }
  };

  const showNode = (id) => {
    if (document.getElementById("input-" + id).style.visibility == "hidden") {
      document.getElementById("input-" + id).style.visibility = "visible";
    } else {
      document.getElementById("input-" + id).style.visibility = "hidden";
    }
  };

  const renderItems = elementos.map((element, idx) => {
    switch (element.type) {
      case "TextBox": {
        return (
          <div className="col-3 my-1 element" id={"el-" + idx} type-element={element.type} key={idx}>
            <div id={"input-" + idx}>
              <input
                type="text"
                className="titleNone "
                placeholder={"Elemento" + (idx + 1)}
              ></input>
              <input type="text" className="form-control" ></input>
            </div>
            {options(idx)}
          </div>
        );
      }
      case "BreakLine": {
        return (
          <div
            className="col-12 my-1 element  text-white bg-dark"
            id={"el-" + idx}
            type-element={element.type} 
            key={idx}
          ></div>
        );
      }
      case "SpaceLine": {
        return (
          <div
            className="col-3 my-1 element space text-white"
            id={"el-" + idx}
            type-element={element.type} 
            key={idx}
          >
            Espacio en blanco
          </div>
        );
      }
      case "date": {
        return (
          <div className="col-3 my-1 element " id={"el-" + idx} type-element={element.type}  key={idx}>
            <input
              type="text"
              className="titleNone"
              value={"Fecha " + (idx + 1)}
            ></input>
            <input type="date" className="form-control" />
            {options(idx)}
          </div>
        );
      }
      case "drp": {
        return (
          <div className="col-3 my-1 element  " id={"el-" + idx} type-element={element.type}  key={idx}>
            <input
              type="text"
              className="titleNone"
              value={"drop down " + (idx + 1)}
            ></input>
            <select className="form-select" placeholder="opciones">
              <option></option>
            </select>
            {options(idx)}
          </div>
        );
      }
    }
  });

  return (
    <div>
      <button
        className="btn btn-primary"
        id="modalOptionsButton"
        type="button"
        style={{ display: "none" }}
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasRight"
        aria-controls="offcanvasRight"
      ></button>

      <div
        className="offcanvas offcanvas-end "
        tabIndex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header ">
          <h5 id="offcanvasRightLabel" className="c-primary text-uppercase text-center text-muted">Editor de propiedades</h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body b-primary"></div>
      </div>
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
          onClick={() => validar("date")}
          title="Añadir un caja de tipo fecha"
        >
          <p className="tooltipCan">{date}</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M24 2v22h-24v-22h3v1c0 1.103.897 2 2 2s2-.897 2-2v-1h10v1c0 1.103.897 2 2 2s2-.897 2-2v-1h3zm-2 6h-20v14h20v-14zm-2-7c0-.552-.447-1-1-1s-1 .448-1 1v2c0 .552.447 1 1 1s1-.448 1-1v-2zm-14 2c0 .552-.447 1-1 1s-1-.448-1-1v-2c0-.552.447-1 1-1s1 .448 1 1v2zm6.687 13.482c0-.802-.418-1.429-1.109-1.695.528-.264.836-.807.836-1.503 0-1.346-1.312-2.149-2.581-2.149-1.477 0-2.591.925-2.659 2.763h1.645c-.014-.761.271-1.315 1.025-1.315.449 0 .933.272.933.869 0 .754-.816.862-1.567.797v1.28c1.067 0 1.704.067 1.704.985 0 .724-.548 1.048-1.091 1.048-.822 0-1.159-.614-1.188-1.452h-1.634c-.032 1.892 1.114 2.89 2.842 2.89 1.543 0 2.844-.943 2.844-2.518zm4.313 2.518v-7.718h-1.392c-.173 1.154-.995 1.491-2.171 1.459v1.346h1.852v4.913h1.711z" />
          </svg>
        </div>
        <div
          className="elementTools"
          onClick={() => validar("BreakLine")}
          title="Añadir un salto de linea"
        >
          <p className="tooltipCan">{breakLine}</p>
          <svg
            clipRule="evenodd"
            fillRule="evenodd"
            strokeLinejoin="round"
            strokeMiterlimit="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m21 11.75c0-.414-.336-.75-.75-.75h-16.5c-.414 0-.75.336-.75.75s.336.75.75.75h16.5c.414 0 .75-.336.75-.75z"
              fillRule="nonzero"
            />
          </svg>
        </div>
        <div
          className="elementTools"
          onClick={() => validar("SpaceLine")}
          title="Añadir un espacio en blanco"
        >
          <p className="tooltipCan">{space}</p>
          <svg
            clipRule="evenodd"
            fillRule="evenodd"
            strokeLinejoin="round"
            strokeMiterlimit="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m21 4c0-.478-.379-1-1-1h-16c-.62 0-1 .519-1 1v16c0 .621.52 1 1 1h16c.478 0 1-.379 1-1zm-16.5.5h15v15h-15z"
              fillRule="nonzero"
            />
          </svg>
        </div>

        <div
          className="elementTools"
          onClick={() => validar("drp")}
          title="Añadir un drop-down"
        >
          <p className="tooltipCan">{drp}</p>

          <svg
            clipRule="evenodd"
            fillRule="evenodd"
            strokeLinejoin="round"
            strokeMiterlimit="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m13 16.75c0-.414-.336-.75-.75-.75h-9.5c-.414 0-.75.336-.75.75s.336.75.75.75h9.5c.414 0 .75-.336.75-.75zm2.195-5.992 2.746 2.999c.142.154.342.243.552.243s.41-.088.553-.242l2.757-2.999c.132-.144.197-.326.197-.507 0-.684-.841-1.008-1.303-.508l-2.202 2.397-2.194-2.396c-.46-.503-1.303-.175-1.303.507 0 .18.065.362.197.506zm-2.195.992c0-.414-.336-.75-.75-.75h-9.5c-.414 0-.75.336-.75.75s.336.75.75.75h9.5c.414 0 .75-.336.75-.75zm0-5c0-.414-.336-.75-.75-.75h-9.5c-.414 0-.75.336-.75.75s.336.75.75.75h9.5c.414 0 .75-.336.75-.75z"
              fillRule="nonzero"
            />
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
      <div className="boxsParents ">
        <div id="boxs" className="row">
          {renderItems}
        </div>
      </div>
    </div>
  );
};

export default CamposLibres;
