import json from "../test/test.json";

const baseUrl = "./frmCamposLibresTercerosV2.aspx/";

const obtenerCamposLibres = async () => {
  try {
    const rawResponse = await fetch(baseUrl + "ObtenerCamposLibres", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
    const content = await rawResponse.json();
    return content.d;
  } catch (ex) {
    return json;
  }
};

const guardarCamposLibres = async (template = "") => {
  try {
    const rawResponse = await fetch(
      baseUrl + "./frmCamposLibresTercerosV2.aspx/guardarCamposLibres",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ template})
      }
    );
    const content = await rawResponse.json();
    return content.d;
  } catch (ex) {
    return null;
  }
};
export { obtenerCamposLibres , guardarCamposLibres };
