import Sortable from "sortablejs";
import { useEffect, useState } from "react";
import swal from "sweetalert";
import { guardarCamposLibres, obtenerCamposLibres } from "../Services/index.js";

let estadoInicial = [
  { textBox: [] },
  { memo: [] },
  { documento: [] },
  { numero: [] },
  { drp: [] },
  { check: [] },
  { date: [] }
];

const CamposLibres = ({ props = estadoInicial }) => {
  const [elementos, setElementos] = useState([]);
  const [elementoEditar, setElementoEditar] = useState();
  const [elementoInicial, setElementoInicial] = useState([]);
  const [elementosDisponibles, setElementosDisponibles] =
    useState(estadoInicial);
  const [textBox, setTextBox] = useState(0);
  const [breakLine, setbreakLine] = useState(2);
  const [drp, setDrp] = useState(0);
  const [date, setDate] = useState(0);
  const [space, setSpace] = useState(20);
  const [check, setCheck] = useState(0);
  const [memo, setMemo] = useState(0);
  const [documento, setDocumento] = useState(0);
  const [numero, setnumero] = useState(0);
  const [sortable, setSortable] = useState();
  const [template, setTemplate] = useState(
    localStorage.getItem("plantilla") ? localStorage.getItem("plantilla") : ""
  );
  const [indices, setIndices] = useState([]);

  useEffect(() => {
    traerData();
    startApp();
  }, [0]);

  const traerData = async () => {
    const res = await obtenerCamposLibres();
    res.map((el) => {
      switch (el.TIPODECAMPO_CAMPOSLIBRES) {
        case "Caja de Texto":
          {
            el.TIPODECAMPO_CAMPOSLIBRES = "textBox";
            estadoInicial[0].textBox.push(el);
          }
          break;
        case "Memo":
          {
            el.TIPODECAMPO_CAMPOSLIBRES = "memo";
            estadoInicial[1].memo.push(el);
          }
          break;
        case "Documento":
          {
            el.TIPODECAMPO_CAMPOSLIBRES = "textBox";

            estadoInicial[2].documento.push(el);
          }
          break;
        case "Numero":
          {
            el.TIPODECAMPO_CAMPOSLIBRES = "numero";

            estadoInicial[3].numero.push(el);
          }
          break;
        case "Lista Desplegable":
          {
            el.TIPODECAMPO_CAMPOSLIBRES = "drp";

            estadoInicial[4].drp.push(el);
          }
          break;
        case "Si/No":
          {
            el.TIPODECAMPO_CAMPOSLIBRES = "check";

            estadoInicial[5].check.push(el);
          }
          break;
        case "Fecha":
          {
            el.TIPODECAMPO_CAMPOSLIBRES = "date";

            estadoInicial[6].date.push(el);
          }
          break;
      }
    });

    document.getElementById("boxs").innerHTML = template;
    document
      .querySelectorAll("#boxs svg")
      .forEach((svg) => svg.addEventListener("click", (s) => addEvent(svg)));
    let TextBoxCountAcum = 0;
    let SpaceLineCountAcum = 0;
    let breakLineCountAcum = 0;
    let dateCountAcum = 0;
    let dropDownCountAcum = 0;
    let checkCountAcum = 0;
    let memoCountAcum = 0;
    let documentCountAcum = 0;
    let numeroCountAcum = 0;

    for (
      let i = 0;
      i < document.getElementById("boxs").childElementCount;
      i++
    ) {
      const type = document
        .getElementById("boxs")
        .children[i].getAttribute("type-element");
      switch (type) {
        case "TextBox".toLocaleLowerCase():
          TextBoxCountAcum++;
          break;
        case "BreakLine".toLocaleLowerCase():
          breakLineCountAcum++;
          break;
        case "SpaceLine".toLocaleLowerCase():
          SpaceLineCountAcum++;
          break;
        case "date".toLocaleLowerCase():
          dateCountAcum++;
          break;
        case "drp".toLocaleLowerCase():
          dropDownCountAcum++;
          break;
        case "check".toLocaleLowerCase():
          checkCountAcum++;
          break;
        case "memo".toLocaleLowerCase():
          memoCountAcum++;
          break;
        case "documento".toLocaleLowerCase():
          documentCountAcum++;
          break;
      }
      //  elementos.push({});
      indices.push(
        document
          .getElementById("boxs")
          .children[i].getAttribute("id")
          .split("-")[1]
      );
    }
    setElementosDisponibles(estadoInicial);
    setTextBox(elementosDisponibles[0].textBox.length - TextBoxCountAcum);
    setMemo(elementosDisponibles[1].memo.length - memoCountAcum);
    setDocumento(elementosDisponibles[2].documento.length - documentCountAcum);
    setnumero(elementosDisponibles[3].numero.length - numeroCountAcum);
    setDrp(elementosDisponibles[4].drp.length - dropDownCountAcum);
    setCheck(elementosDisponibles[5].check.length - checkCountAcum);
    setDate(elementosDisponibles[6].date.length - dateCountAcum);
  };

  const valueSaveState = () => {
    document.querySelectorAll(".titleNone").forEach((input) => {
      input.setAttribute("value", input.value);
    });
  };
  const sortableConfig = () => {
    const boxForm = document.getElementById("boxs");
    const a = Sortable.create(boxForm, {
      group: "nested",
      swap: true,
      swapClass: "highlight",
      animation: 75,
      swapThreshold: 120,
      filter: ".filtered",
      easing: "cubic-bezier(1, 0, 0, 1)",
      dataIdAttr: "id",
      delay: 0
    });
    window.a = a;
    setSortable(a);
  };

  const startApp = () => {
    sortableConfig();
  };

  const addEvent = (svg) => {
    try {
      const id = svg.getAttribute("id").split("-")[1];
      const type = svg.getAttribute("id").split("-")[0];
      switch (type) {
        case "show":
          {
            showNode(id);
          }
          break;
        case "edit":
          {
            editNode(id);
          }
          break;
        case "delete":
          {
            deleteNode(id);
          }
          break;
        case "lock":
          {
            blockElement(id);
          }
          break;
      }
    } catch (ex) {
      //console.log("Error : ",ex)
    }
  };

  const validar = (type) => {
    switch (type) {
      case "TextBox":
        {
          if (!textBox <= 0) {
            elementos.push(elementosDisponibles[0].textBox[textBox - 1]);
            setTextBox(textBox - 1);
          }
        }
        break;
      case "BreakLine":
        {
          if (!breakLine <= 0) {
            elementos.push({ type: "BreakLine" });
            setbreakLine(breakLine - 1);
          }
        }
        break;
      case "SpaceLine":
        {
          if (!space <= 0) {
            elementos.push({ type: "SpaceLine" });
            setSpace(space - 1);
          }
        }
        break;
      case "date":
        {
          if (!date <= 0) {
            elementos.push(elementosDisponibles[6].date[date - 1]);
            setDate(date - 1);
          }
        }
        break;
      case "drp":
        {
          if (!drp <= 0) {
            elementos.push(elementosDisponibles[4].drp[drp - 1]);
            setDrp(drp - 1);
          }
        }
        break;
      case "check":
        {
          if (!check <= 0) {
            elementos.push(elementosDisponibles[5].check[check - 1]);
            setCheck(check - 1);
          }
        }
        break;
      case "memo":
        {
          if (!memo <= 0) {
            elementos.push(elementosDisponibles[1].memo[memo - 1]);
            setMemo(memo - 1);
          }
        }
        break;
      case "documento":
        {
          if (!documento <= 0) {
            elementos.push(elementosDisponibles[2].documento[documento - 1]);
            setDocumento(documento - 1);
          }
        }
        break;
       case "numero":
      {
        if (!numero <= 0) {
          elementos.push(elementosDisponibles[3].numero[numero - 1]);
          setDocumento(numero - 1);
        }
      }
      break;
      }
     
      
  };

  const options = (id, op = "all") => {
    if (op == "all") {
      return (
        <div className="options" id={"op" + id}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-eye-fill control-show"
            id={"show-" + id}
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
            className="bi bi-gear-fill"
            viewBox="0 0 16 16"
            id={"edit-" + id}
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
            id={"delete-" + id}
            onClick={() => deleteNode(id)}
          >
            <path d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15h9.286zM5.5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1zM.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8H.8z" />
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrows-move handle"
            viewBox="0 0 16 16"
          >
            <path
              filerule="evenodd"
              d="M7.646.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 1.707V5.5a.5.5 0 0 1-1 0V1.707L6.354 2.854a.5.5 0 1 1-.708-.708l2-2zM8 10a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 14.293V10.5A.5.5 0 0 1 8 10zM.146 8.354a.5.5 0 0 1 0-.708l2-2a.5.5 0 1 1 .708.708L1.707 7.5H5.5a.5.5 0 0 1 0 1H1.707l1.147 1.146a.5.5 0 0 1-.708.708l-2-2zM10 8a.5.5 0 0 1 .5-.5h3.793l-1.147-1.146a.5.5 0 0 1 .708-.708l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L14.293 8.5H10.5A.5.5 0 0 1 10 8z"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => blockElement(id)}
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-lock-fill"
            id={"lock-" + id}
            viewBox="0 0 16 16"
          >
            <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
          </svg>
        </div>
      );
    } else {
      return (
        <div className="options" id={"op" + id}>
          {op[0] == true ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-eye-fill"
              viewBox="0 0 16 16"
              id={"show-" + id}
              onClick={() => showNode(id)}
            >
              <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
              <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
            </svg>
          ) : null}

          {op[1] == true ? (
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
          ) : null}

          {op[2] == true ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-gear-fill"
              viewBox="0 0 16 16"
              id={"edit-" + id}
              onClick={() => editNode(id)}
            >
              <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
            </svg>
          ) : null}

          {op[3] == true ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-archive-fill"
              viewBox="0 0 16 16"
              id={"delete-" + id}
              onClick={() => deleteNode(id)}
            >
              <path d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15h9.286zM5.5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1zM.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8H.8z" />
            </svg>
          ) : null}

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrows-move handle"
            viewBox="0 0 16 16"
          >
            <path
              fileRule="evenodd"
              d="M7.646.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 1.707V5.5a.5.5 0 0 1-1 0V1.707L6.354 2.854a.5.5 0 1 1-.708-.708l2-2zM8 10a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 14.293V10.5A.5.5 0 0 1 8 10zM.146 8.354a.5.5 0 0 1 0-.708l2-2a.5.5 0 1 1 .708.708L1.707 7.5H5.5a.5.5 0 0 1 0 1H1.707l1.147 1.146a.5.5 0 0 1-.708.708l-2-2zM10 8a.5.5 0 0 1 .5-.5h3.793l-1.147-1.146a.5.5 0 0 1 .708-.708l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L14.293 8.5H10.5A.5.5 0 0 1 10 8z"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => blockElement(id)}
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-lock-fill"
            id={"lock-" + id}
            viewBox="0 0 16 16"
          >
            <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
          </svg>
        </div>
      );
    }
  };

  const saveEditElement = (id) => {
    console.log(id);
  };

  const saveTemplate = async () => {
    valueSaveState();
    localStorage.setItem(
      "plantilla",
      document.getElementById("boxs").innerHTML
    );
    localStorage.setItem("plantillaIdx", JSON.stringify(sortable.toArray()));
    swal(
      "Guardado exitoso.",
      "La plantilla ha sido guardada exitosamente!",
      "success"
    );
    await guardarCamposLibres(document.getElementById("boxs").innerHTML);
  };

  window.addElementDrp = (el) => {
    const id = el.path[1].children[1].getAttribute("id").split("-")[1];
    const elemento = document.getElementById("el-" + id);
    const value = el.path[1].children[1].value;
    elemento.querySelector("select").innerHTML +=
      "<option>" + value + "</option>";
    el.path[1].children[1].value = "";
    document.getElementById("btnCloseEditProperties").click();
  };

  window.deleteElementDrp = (el) => {
    const id = el.path[1].children[0].getAttribute("id").split("-")[1];
    const elemento = document.getElementById("el-" + id);
    elemento
      .querySelector("select")
      .removeChild(
        elemento.querySelector("select").children[
          el.target.getAttribute("id").split("-")[2]
        ]
      );
    document.getElementById("btnCloseEditProperties").click();
  };

  window.obligatorio = (el) => {
    const elemento = document.getElementById(
      "el-" + el.target.getAttribute("identity")
    );
    elemento.querySelector(".value").classList.toggle("obligatorio");
  };

  window.longitud = (el) => {
    const elemento = document.getElementById(
      "el-" + el.target.getAttribute("identity")
    );
    elemento.querySelector(".value").setAttribute("maxlength", el.target.value);
  };

  window.padding = (el) => {
    const elemento = document.getElementById(
      "el-" + el.target.getAttribute("identity")
    );
    elemento.querySelector(".value").style.padding = el.target.value + "px";
  };

  window.margin = (el) => {
    const elemento = document.getElementById(
      "el-" + el.target.getAttribute("identity")
    );
    elemento.querySelector(".value").style.margin = el.target.value + "px";
  };

  window.fondo = (el) => {
    const elemento = document.getElementById(
      "el-" + el.target.getAttribute("identity")
    );
    elemento.style.background = el.target.value;
  };

  window.controlBorder = (el) => {
    const elemento = document.getElementById(
      "el-" + el.target.getAttribute("identity")
    );
    elemento.querySelector(".value").style.border =
      "1px solid " + el.target.value;
  };

  window.controlFondo = (el) => {
    const elemento = document.getElementById(
      "el-" + el.target.getAttribute("identity")
    );
    elemento.querySelector(".value").style.background = el.target.value;
  };

  window.letrafondo = (el) => {
    const elemento = document.getElementById(
      "el-" + el.target.getAttribute("identity")
    );
    elemento.querySelector(".value").style.background = el.target.value;
  };

  window.letraPosicion = (el) => {
    const elemento = document.getElementById(
      "el-" + el.target.getAttribute("identity")
    );
    switch (el.target.selectedIndex) {
      case 0:
        elemento.querySelector(".value").style.textAlign = "left";
        break;
      case 1:
        elemento.querySelector(".value").style.textAlign = "center";
        break;
      case 2:
        elemento.querySelector(".value").style.textAlign = "rigth";
        break;
    }
  };

  window.letraTamanio = (el) => {
    const elemento = document.getElementById(
      "el-" + el.target.getAttribute("identity")
    );
    elemento.querySelector(".value").style.fontSize = el.target.value + "px";
  };
  window.letraColor = (el) => {
    const elemento = document.getElementById(
      "el-" + el.target.getAttribute("identity")
    );
    elemento.querySelector(".value").style.color = el.target.value;
  };

  window.guardar =()=>{
    saveTemplate()
    document.getElementById("modalOptionsButton").click();
  }

  const editNode = (id) => {
    document.getElementById("modalOptionsButton").click();
    const elemento = document.getElementById("el-" + id);
    setElementoEditar(elemento.getAttribute("type-element"));
    let filtro = "";
    if (elemento.getAttribute("type-element") == "drp") {
      const drpSelectOptions = `
      <div class="d-grid gap-2">
      <span class="text-muted">Añadir opciones</span>
        <input type="text" id="optionName-${id}" placeholder="Opcion..." />
        <button class="btn b-primary text-white text-uppercase" onclick="window.addElementDrp(event)" type="button">Añadir</button>
      </div>
      `;
      const optionsDrp = elemento.querySelectorAll("option");
      let editDrp = "<div class='row'>";
      optionsDrp.forEach((option, idx) => {
        option.value == ""
          ? null
          : (editDrp += `<span id="optionNameD-${id}-${idx}" class="col-8">${option.value}</span><input type="button" id="optionBtn-${id}-${idx}" onclick="window.deleteElementDrp(event)" class="btn btn-danger text-white text-uppercase col-2"value="X" />`);
      });

      editDrp += "</div>";

      filtro += `${editDrp}${drpSelectOptions}`;
    } else {
    }

    document.getElementById(
      "bodyEditorPropiedaes"
    ).innerHTML = `<div class="accordion" id="accordionExample">
    <div class="accordion-item">
      <h2 class="accordion-header" id="headingOne">
        <button class="accordion-button c-primary text-uppercase text-muted text-bolder" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
          Propiedades
        </button>
      </h2>
      <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
        <div class="accordion-body">
          <div>
            <p><span class="text-muted mx-3">Longitud   </span><input type="number" identity="${id}" class="w-50" min="0" value="${
      elemento.querySelector(".value").getAttribute("maxlength")
        ? elemento.querySelector(".value").getAttribute("maxlength")
        : ""
    }" onchange="window.longitud(event)" /></p>
            ${filtro}
            <hr/>
            <div class="form-check form-switch">
              <span class="text-muted">Obligatorio</span>
              <input class="form-check-input" identity="${id}" type="checkbox" id="flexSwitchCheckChecked" onchange="window.obligatorio(event)" ${
      elemento.querySelector(".value").classList.contains("obligatorio")
        ? "checked"
        : ""
    } >
            </div>
          </p>
          </div>
        </div>
      </div>
    </div>
    <div class="accordion-item">
      <h2 class="accordion-header" id="headingTwo">
        <button class="accordion-button collapsed c-primary text-uppercase text-muted text-bolder" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
          Estilos
        </button>
      </h2>
      <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
        <div class="accordion-body">
        <p class="mx-3 text-center b-primary text-white">Contendor</p>
        <hr />
        <p><span class="text-muted mx-3">Padding</span><input identity="${id}" type="number" onchange="window.padding(event)" class="w-50" min="0" /></p>
        <p><span class="text-muted mx-3">Margen</span><input identity="${id}" type="number" onchange="window.margin(event)" class="w-50" min="0" /></p>
        <p><span class="text-muted mx-3">Fondo</span><input identity="${id}" type="color" onchange="window.fondo(event)" class="form-control form-control-color m-auto " id="exampleColorInput" value="#563d7c" title="Choose your color"></p>
    <hr />
    <p class="mx-3 text-center b-primary text-white">Control</p>

       <p><span class="text-muted mx-3">border</span><input identity="${id}" type="color" class="w-50" min="0" onchange="window.controlBorder(event)" /></p>
        <p><span class="text-muted mx-3">Fondo</span><input identity="${id}" type="color" class="form-control form-control-color m-auto " onchange="window.controlFondo(event)"  id="exampleColorInput" value="#563d7c" title="Choose your color"></p>
      
        <p class="mx-3 text-center b-primary text-white">letra</p>
        <hr />
        <p><span class="text-muted mx-3">Posicion</span><select identity="${id}" class="form-control"   onchange="window.letraPosicion(event)"><option>Izquierda</option><option>Centrado</option><option>Derecha</option></select></p>
        <p><span class="text-muted mx-3">Tamaño</span><input identity="${id}" type="number" onchange="window.letraTamanio(event)" class="w-50" min="0" /></p>
        <p><span class="text-muted mx-3">Color</span><input identity="${id}" type="color" onchange="window.letraColor(event)" class="form-control form-control-color m-auto " id="exampleColorInput" value="#563d7c" title="Choose your color"></p>

        </div>
      </div>
    </div>
    
  </div>
  
  <p class="text-center my-3"><button class="btn bg-white text-uppercase c-primary text-bolder" onclick="window.guardar()">Guardar
  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="blue" class="bi bi-check-lg" viewBox="0 0 16 16">
    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
  </svg>
  </button></p>
  
  `;
    console.log(elemento);
  };
  const deleteNode = (id) => {
    try {
      switch (
        document.getElementById("el-" + id).getAttribute("type-element")
      ) {
        case "TextBox":
          {
            setTextBox(textBox + 1);
          }
          break;
        case "BreakLine":
          {
            setbreakLine(breakLine + 1);
          }
          break;
        case "SpaceLine":
          {
            setSpace(space + 1);
          }
          break;
        case "date":
          {
            setDate(date + 1);
          }
          break;
        case "drp":
          {
            setDrp(drp + 1);
          }
          break;
        case "check":
          {
            setCheck(check + 1);
          }
          break;
        case "memo":
          {
            setMemo(memo + 1);
          }
          break;
      }

      document
        .getElementById("boxs")
        .removeChild(document.getElementById("el-" + id));
    } catch (ex) {
      console.log("Ha ocurrido un error al eliminar el nodo. el-" + id);
    }
  };

  const showNode = (id) => {
    try {
      if (document.getElementById("input-" + id)) {
        if (
          document.getElementById("input-" + id).style.visibility == "hidden"
        ) {
          document.getElementById("input-" + id).style.visibility = "visible";
        } else {
          document.getElementById("input-" + id).style.visibility = "hidden";
        }
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  const blockElement = (id) => {
    console.log(document.getElementById("el-" + id));
    document.getElementById("el-" + id).classList.toggle("filtered");
  };

  const renderItems = elementos.map((element, idx) => {
    if (element.CAMPOSLIBRESID_CAMPOSLIBRES) {
      idx = element.CAMPOSLIBRESID_CAMPOSLIBRES;
    }
    const elemento = element.TIPODECAMPO_CAMPOSLIBRES
      ? element.TIPODECAMPO_CAMPOSLIBRES.toLowerCase()
      : element.type.toLowerCase();

    let NOCAMPO_CAMPOSLIBRES = element.NOCAMPO_CAMPOSLIBRES;
    switch (elemento) {
      case "TextBox".toLowerCase(): {
        return (
          <div
            className="col-3 my-1 element"
            id={"el-" + idx}
            type-element={elemento}
            key={idx}
          >
            <div id={"input-" + idx} className="overflow-hidden">
              <input
                type="text"
                className="titleNone w-100"
                placeholder={"Caja texto " + idx}
              ></input>
              <input
                type="text"
                id={"v-" + idx}
                name={`TEXT${NOCAMPO_CAMPOSLIBRES}_CAMPLIBTERCE`}
                className="form-control value"
              ></input>
            </div>
            {options(idx)}
          </div>
        );
      }
      case "numero".toLowerCase(): {
        return (
          <div
            className="col-3 my-1 element"
            id={"el-" + idx}
            type-element={elemento}
            key={idx}
          >
            <div id={"input-" + idx} className="overflow-hidden">
              <input
                type="text"
                className="titleNone w-100"
                placeholder={"Numeros " + idx}
              ></input>
              <input
                type="number"
                id={"v-" + idx}
                name={`TEXT${NOCAMPO_CAMPOSLIBRES}_CAMPLIBTERCE`}
                className="form-control value"
              ></input>
            </div>
            {options(idx)}
          </div>
        );
      }
      case "BreakLine".toLowerCase(): {
        return (
          <div
            className="col-12 my-1 element  text-white b-primary shadow"
            id={"el-" + idx}
            type-element={element.type}
            key={idx}
          >
            <input
              type="text"
              className="titleNone form-control b-primary text-white"
              id={"v-" + idx}
              style={{ border: "none", height: "22px" }}
              placeholder="!Escribe un titulo aqui!"
            ></input>
            <div style={{ width: "250px", position: "absolute" }}>
              {options(idx, [false, false, true, true])}
            </div>
          </div>
        );
      }
      case "SpaceLine".toLowerCase(): {
        return (
          <div
            className="col-3 my-1 element space text-white"
            id={"el-" + idx}
            type-element={element.type}
            key={idx}
          >
            Espacio en blanco
            {options(idx, [false, false, false, true])}
          </div>
        );
      }
      case "date".toLowerCase(): {
        return (
          <div
            className="col-3 my-1 element "
            id={"el-" + idx}
            type-element={elemento}
            key={idx}
          >
            <div id={"input-" + idx}>
              <input
                type="text"
                className="titleNone"
                placeholder={"fecha " + idx}
              ></input>
              <input
                type="date"
                className="form-control value"
                id={"v-" + idx}
                name={`FECHA${NOCAMPO_CAMPOSLIBRES}_CAMPLIBTERCE`}
              />
            </div>
            {options(idx)}
          </div>
        );
      }
      case "drp".toLowerCase(): {
        return (
          <div
            className="col-3 my-1 element  "
            id={"el-" + idx}
            type-element={elemento}
            key={idx}
          >
            <div id={"input-" + idx}>
              <input
                type="text"
                className="titleNone"
                placeholder={"drop down " + idx}
              ></input>
              <select
                className="form-select value"
                id={"v-" + idx}
                placeholder="opciones"
                name={`NOMLISDES${NOCAMPO_CAMPOSLIBRES}_CAMPLIBTERCE`}
              >
                <option></option>
              </select>
            </div>
            {options(idx)}
          </div>
        );
      }
      case "check".toLowerCase(): {
        return (
          <div
            className="col-3 my-1 element  "
            id={"el-" + idx}
            type-element={elemento}
            key={idx}
          >
            <div id={"input-" + idx} className="overflow-hidden">
              <input
                type="text"
                className="titleNone w-100"
                placeholder={"switch" + idx}
              ></input>
              <div className="form-check form-switch">
                <input
                  className="form-check-input value"
                  type="checkbox"
                  id={"check-" + idx}
                  name={`CHK${NOCAMPO_CAMPOSLIBRES}_CAMPLIBTERCE`}
                  defaultChecked
                />
              </div>
            </div>
            {options(idx)}
          </div>
        );
      }
      case "memo".toLowerCase(): {
        return (
          <div
            className="col-12 my-1 element  "
            id={"el-" + idx}
            type-element={elemento}
            key={idx}
          >
            <div id={"input-" + idx} className="overflow-hidden">
              <input
                type="text"
                className="titleNone w-100"
                placeholder={"memo" + idx}
              ></input>
              <textarea
                className="w-100 value"
                id={"memo-" + idx}
                resizable="true"
                name={`MEMO${NOCAMPO_CAMPOSLIBRES}_CAMPLIBTERCE`}
              />
            </div>
            {options(idx)}
          </div>
        );
      }
      case "documento".toLowerCase(): {
        return (
          <div
            className="col-3 my-1 element  "
            id={"el-" + idx}
            type-element={elemento}
            key={idx}
          >
            <div id={"input-" + idx} className="overflow-hidden">
              <input
                type="text"
                className="titleNone w-100"
                placeholder={"documento" + idx}
              ></input>
              <div className="d-flex" id={"input-" + (idx + 1)}>
                <input
                  type="text"
                  className="form-control value"
                  id={"v-" + idx}
                  name={`VALUEDOC${NOCAMPO_CAMPOSLIBRES}_CAMPLIBTERCE`}
                  disabled
                ></input>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50"
                  height="50"
                  fill="currentColor"
                  className="bi bi-search svgBuscar"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
              </div>
            </div>
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
        style={{ visibility: "hidden" }}
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasRight"
        aria-controls="offcanvasRight"
      ></button>

      <div
        className="offcanvas offcanvas-end "
        tabIndex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
        style={{visibility:"visible"}}
      >
        <div className="offcanvas-header ">
          <h5
            id="offcanvasRightLabel"
            className="c-primary text-uppercase text-center text-muted"
          >
            Editor de propiedades
          </h5>
          <button
            id="btnCloseEditProperties"
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div
          className="offcanvas-body b-primary"
          id="bodyEditorPropiedaes"
        ></div>
      </div>

      <div className="toolsBox" id="toolsBox">
        <div
          className="elementTools"
          onClick={() => validar("documento")}
          title="Añadir un documento"
        >
          <p className="tooltipCan">{documento}</p>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-file-earmark-plus-fill"
            viewBox="0 0 16 16"
          >
            <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM8.5 7v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 1 0z" />
          </svg>
        </div>

        <div
          className="elementTools"
          onClick={() => validar("memo")}
          title="Añadir una caja de observaciones"
        >
          <p className="tooltipCan">{memo}</p>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-card-text"
            viewBox="0 0 16 16"
          >
            <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z" />
            <path d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8zm0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z" />
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
          onClick={() => validar("numero")}
          title="Añadir un caja de tipo numero"
        >
          <p className="tooltipCan">{numero}</p>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-123"
            viewBox="0 0 16 16"
          >
            <path d="M2.873 11.297V4.142H1.699L0 5.379v1.137l1.64-1.18h.06v5.961h1.174Zm3.213-5.09v-.063c0-.618.44-1.169 1.196-1.169.676 0 1.174.44 1.174 1.106 0 .624-.42 1.101-.807 1.526L4.99 10.553v.744h4.78v-.99H6.643v-.069L8.41 8.252c.65-.724 1.237-1.332 1.237-2.27C9.646 4.849 8.723 4 7.308 4c-1.573 0-2.36 1.064-2.36 2.15v.057h1.138Zm6.559 1.883h.786c.823 0 1.374.481 1.379 1.179.01.707-.55 1.216-1.421 1.21-.77-.005-1.326-.419-1.379-.953h-1.095c.042 1.053.938 1.918 2.464 1.918 1.478 0 2.642-.839 2.62-2.144-.02-1.143-.922-1.651-1.551-1.714v-.063c.535-.09 1.347-.66 1.326-1.678-.026-1.053-.933-1.855-2.359-1.845-1.5.005-2.317.88-2.348 1.898h1.116c.032-.498.498-.944 1.206-.944.703 0 1.206.435 1.206 1.07.005.64-.504 1.106-1.2 1.106h-.75v.96Z" />
          </svg>
        </div>

        <div
          className="elementTools"
          onClick={() => validar("check")}
          title="Añadir un caja de tipo check"
        >
          <p className="tooltipCan">{check}</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-check-square"
            viewBox="0 0 16 16"
          >
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.235.235 0 0 1 .02-.022z" />
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
        <p className="text-center">
          <button
            className="btn b-primary text-white bolder my-3"
            onClick={() => saveTemplate()}
          >
            Guardar
          </button>
          <button
            className="btn b-primary text-white bolder my-3 mx-3"
            onClick={() => {
              localStorage.removeItem("plantilla");
              localStorage.removeItem("plantillaIdx");
              document.getElementById("boxs").innerHTML = "";
              setTemplate("");
              traerData();
            }}
          >
            Limpiar
          </button>
        </p>
      </div>
    </div>
  );
};

export default CamposLibres;
