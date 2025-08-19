import React, { useEffect, useState } from "react";
import mqtt from "mqtt";

export default function Bedroom({ darkMode }) {
  const [client, setClient] = useState(null);
  const [lightState, setLightState] = useState(false);
  const [socketState, setSocketState] = useState(false);
  const [curtainState, setCurtainState] = useState("Fechada");

  useEffect(() => {
    // Conexão MQTT via WebSocket
    const mqttClient = mqtt.connect("wss://broker.hivemq.com:8884/mqtt");

    mqttClient.on("connect", () => {
      console.log("Conectado ao broker MQTT!");
      // Assinar tópicos do quarto
      mqttClient.subscribe("quarto/luz");
      mqttClient.subscribe("quarto/tomada");
      mqttClient.subscribe("quarto/cortina");
    });

    mqttClient.on("message", (topic, message) => {
      const msg = message.toString();
      console.log("Mensagem recebida:", topic, msg);

      if (topic === "quarto/luz") setLightState(msg === "ON");
      if (topic === "quarto/tomada") setSocketState(msg === "ON");
      if (topic === "quarto/cortina") setCurtainState(msg);
    });

    setClient(mqttClient);

    return () => mqttClient.end();
  }, []);

  // Funções de controle
  const toggleLight = () => client && client.publish("quarto/luz", lightState ? "OFF" : "ON");
  const toggleSocket = () => client && client.publish("quarto/tomada", socketState ? "OFF" : "ON");
  const controlCurtain = (action) => client && client.publish("quarto/cortina", action);

  return (


        <div className="col-md">
          <h1 className="text-center mb-4">🛏️Quarto</h1>
          <div className={`card text-center shadow-lg p-3 mb-5 rounded ${darkMode ? "bg-dark text-light" : "bg-light text-dark"}`}>
            <div className="card-body">
              <h5 className="card-title">Controles</h5>
              <button
                className={`btn ${lightState ? "btn-success" : "btn-secondary"} m-2`}
                onClick={toggleLight}
              >
                Luz Quarto {lightState ? "Ligada" : "Desligada"}
              </button>
              <button
                className={`btn ${socketState ? "btn-success" : "btn-secondary"} m-2`}
                onClick={toggleSocket}
              >
                Tomada {socketState ? "Ligada" : "Desligada"}
              </button>
              <div className="mt-3">
                <button
                  className="btn btn-primary m-2"
                  onClick={() => controlCurtain("ABRIR")}
                >
                  Abrir Cortina
                </button>
                <button
                  className="btn btn-warning m-2"
                  onClick={() => controlCurtain("FECHAR")}
                >
                  Fechar Cortina
                </button>
                <button
                  className="btn btn-secondary m-2"
                  onClick={() => controlCurtain("PARAR")}
                >
                  Parar Cortina
                </button>
              </div>
              <hr />
              <p>Cortina: {curtainState}</p>
            </div>
          </div>
        </div>
  );
}