import React, { useEffect, useState } from "react";
import mqtt from "mqtt";

export default function Dashboard() {
    const [client, setClient] = useState(null);
  
    useEffect(() => {
      // Conectar ao broker HiveMQ via WebSocket
      const mqttClient = mqtt.connect("wss://broker.hivemq.com:8884/mqtt");
  
      mqttClient.on("connect", () => {
        console.log("Conectado ao broker MQTT!");
      });
  
      mqttClient.on("message", (topic, message) => {
        console.log("Mensagem recebida:", topic, message.toString());
      });
  
      setClient(mqttClient);
  
      // Cleanup: desconectar quando o componente desmontar
      return () => mqttClient.end();
    }, []);
    const ligarLuzSala = () => client && client.publish("jml/sala/led", "ON");
    const desligarLuzSala = () => client && client.publish("jml/sala/led", "OFF");
  
    const abrirPortaoSocial = () => client && client.publish("Portao/garagem/social", "abrir");
    const fecharPortaoSocial = () => client && client.publish("Portao/garagem/social", "fechar");
  
    const ligarLuzQuarto = () => client && client.publish("quarto/luz", "ON");
    const desligarLuzQuarto = () => client && client.publish("quarto/luz", "OFF");
  
    return (
        <div>
          <h1>Teste de Sincronização MQTT</h1>
    
          <button onClick={ligarLuzSala}>Luz Sala ON</button>
          <button onClick={desligarLuzSala}>Luz Sala OFF</button>
    
          <button onClick={abrirPortaoSocial}>Abrir Portão Social</button>
          <button onClick={fecharPortaoSocial}>Fechar Portão Social</button>
    
          <button onClick={ligarLuzQuarto}>Luz Quarto ON</button>
          <button onClick={desligarLuzQuarto}>Luz Quarto OFF</button>
        </div>
      );
    }