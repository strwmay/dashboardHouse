import React, { useState, useEffect } from "react";
import mqtt from "mqtt";

export default function LivingRoom() {
  const [client, setClient] = useState(null);
  const [ledState, setLedState] = useState(false);
  const [arState, setArState] = useState(false);
  const [umidState, setUmidState] = useState(false);
  const [temperatura, setTemperatura] = useState("-");
  const [umidade, setUmidade] = useState("-");

  useEffect(() => {
    const mqttClient = mqtt.connect("wss://broker.hivemq.com:8884/mqtt");

    mqttClient.on("connect", () => {
      console.log("Conectado ao broker MQTT!");
      mqttClient.subscribe("jml/sala/led");
      mqttClient.subscribe("jml/sala/ar");
      mqttClient.subscribe("jml/sala/umid");
      mqttClient.subscribe("jml/sala/dados");
    });

    mqttClient.on("message", (topic, message) => {
      const msg = message.toString();
      console.log("Mensagem recebida:", topic, msg);

      if (topic === "jml/sala/led") setLedState(msg === "ON");
      if (topic === "jml/sala/ar") setArState(msg === "ON");
      if (topic === "jml/sala/umid") setUmidState(msg === "ON");

      if (topic === "jml/sala/dados") {
        try {
          const { temp, hum } = JSON.parse(msg);
          setTemperatura(temp);
          setUmidade(hum);
        } catch (err) {
          console.error("Erro ao ler dados:", err);
        }
      }
    });

    setClient(mqttClient);
    return () => mqttClient.end();
  }, []);

  // Publicadores
  const toggleLed = () => client && client.publish("jml/sala/led", ledState ? "OFF" : "ON");
  const toggleAr = () => client && client.publish("jml/sala/ar", arState ? "OFF" : "ON");
  const toggleUmid = () => client && client.publish("jml/sala/umid", umidState ? "OFF" : "ON");

  return (
    <div className="container">
      <h2>Living Room</h2>

      <p>Temperatura: {temperatura}°C</p>
      <p>Umidade: {umidade}%</p>

      <button onClick={toggleLed}>
        {ledState ? "Desligar Luz" : "Ligar Luz"}
      </button>

      <button onClick={toggleAr}>
        {arState ? "Desligar Ar" : "Ligar Ar"}
      </button>

      <button onClick={toggleUmid}>
        {umidState ? "Desligar Umidificador" : "Ligar Umidificador"}
      </button>
    </div>
  );
}
