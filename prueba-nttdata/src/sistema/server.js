const SERVER = {
  host: "https://bp-pokemons.herokuapp.com", // HOST DEL SERVIDOR
  puerto: "", // PUERTO DEL SERVIDOR
  sufijo: "",
  url: function (endpoint) {
    // FUNCION QUE RETORNA LA URL CON EL ENDPOINT ENVIADA COMO PARAMETRO
    return `${this.host}:${this.puerto}${this.sufijo}${endpoint}`;
  },
  consulta: function (ruta, parametros = null, method = "POST") {
    const opciones = {};
    const endpoint = this.url(ruta);
    const headers = {
      Accept: "application/json, text/plain",
      "Content-Type": "application/json;charset=UTF-8",
    };
    opciones.method = method;
    opciones.headers = headers;
    opciones.body = parametros === null ? false : JSON.stringify(parametros);
    if (!opciones.body) delete opciones.body;
    return fetch(endpoint, opciones)
      .then((res) =>
        res.ok
          ? res.json()
          : Promise.reject({
              error: true,
              estado: res.status || "00",
              mensaje: res.statusText || "Ocurrió un error",
            })
      )
      .catch((err) => err);
  },
};

export default SERVER;
