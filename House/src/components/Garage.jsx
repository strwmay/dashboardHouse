import React, { useEffect, useState } from "react";
import mqtt from "mqtt";

export default function Garage() {
  const [client, setClient] = useState(null);
  const [socialDoorState, setSocialDoorState] = useState("Fechada");
  const [basculanteDoorState, setBasculanteDoorState] = useState("Fechada");
  const [lightState, setLightState] = useState(false);

  useEffect(() => {
    const mqttClient = mqtt.connect("wss://broker.hivemq.com:8884/mqtt");

    mqttClient.on("connect", () => {
      console.log("Conectado ao broker MQTT!");
      mqttClient.subscribe("Portao/garagem/social");
      mqttClient.subscribe("Portao/garagem/basculante");
      mqttClient.subscribe("Portao/garagem/luz");
    });

    mqttClient.on("message", (topic, message) => {
      const msg = message.toString();
      console.log("Mensagem recebida:", topic, msg);

      if (topic === "Portao/garagem/social") setSocialDoorState(msg === "abrir" ? "Aberta" : "Fechada");
      if (topic === "Portao/garagem/basculante") setBasculanteDoorState(msg === "abrir" ? "Aberta" : "Fechada");
      if (topic === "Portao/garagem/luz") setLightState(msg === "on");
    });

    setClient(mqttClient);
    return () => mqttClient.end();
  }, []);

  const toggleSocialDoor = (action) => client && client.publish("Portao/garagem/social", action);
  const toggleBasculanteDoor = (action) => client && client.publish("Portao/garagem/basculante", action);
  const toggleLight = () => client && client.publish("Portao/garagem/luz", lightState ? "off" : "on");

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Garagem</h1>
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card text-center shadow-lg p-3 mb-5 bg-light rounded">
            <div className="card-body">
              <h5 className="card-title">Controles</h5>
              <div className="mb-3">
                <button
                  className="btn btn-primary m-2"
                  onClick={() => toggleSocialDoor("abrir")}
                >
                  Abrir Porta Social
                </button>
                <button
                  className="btn btn-warning m-2"
                  onClick={() => toggleSocialDoor("fechar")}
                >
                  Fechar Porta Social
                </button>
                <p>Porta Social: {socialDoorState}</p>
              </div>
              <div className="mb-3">
                <button
                  className="btn btn-primary m-2"
                  onClick={() => toggleBasculanteDoor("abrir")}
                >
                  Abrir Porta Basculante
                </button>
                <button
                  className="btn btn-warning m-2"
                  onClick={() => toggleBasculanteDoor("fechar")}
                >
                  Fechar Porta Basculante
                </button>
                <p>Porta Basculante: {basculanteDoorState}</p>
              </div>
              <div className="mb-3">
                <button
                  className={`btn ${
                    lightState ? "btn-success" : "btn-secondary"
                  } m-2`}
                  onClick={toggleLight}
                >
                  Luz da Garagem {lightState ? "Ligada" : "Desligada"}
                </button>
                <p>Luz da Garagem: {lightState ? "Ligada" : "Desligada"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
