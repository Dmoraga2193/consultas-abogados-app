import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const preguntasRelacionadas = {
  "pension alimenticia": [
    {
      id: 1,
      texto: "¿Cuántos hijos están involucrados?",
      opciones: ["1", "2", "3 o más"],
    },
    {
      id: 2,
      texto: "¿Cuál es el nivel de ingresos del pagador?",
      opciones: ["Bajo", "Medio", "Alto"],
    },
    {
      id: 3,
      texto: "¿Hay acuerdo mutuo sobre la pensión?",
      opciones: ["Sí", "No"],
    },
  ],
  divorcio: [
    {
      id: 1,
      texto: "¿Tienen hijos en común?",
      opciones: ["Sí", "No"],
    },
    {
      id: 2,
      texto: "¿El divorcio es de mutuo acuerdo?",
      opciones: ["Sí", "No"],
    },
    {
      id: 3,
      texto: "¿Existen bienes en común?",
      opciones: ["Sí", "No"],
    },
  ],
  herencia: [
    {
      id: 1,
      texto: "¿Hay testamento?",
      opciones: ["Sí", "No"],
    },
    {
      id: 2,
      texto: "¿Cuántos herederos están involucrados?",
      opciones: ["1", "2", "3 o más"],
    },
    {
      id: 3,
      texto: "¿Existen bienes inmuebles?",
      opciones: ["Sí", "No"],
    },
  ],
  "contrato de arrendamiento": [
    {
      id: 1,
      texto: "¿El contrato es para vivienda o negocio?",
      opciones: ["Vivienda", "Negocio"],
    },
    {
      id: 2,
      texto: "¿Cuál es la duración del contrato?",
      opciones: ["Menos de 1 año", "1 a 3 años", "Más de 3 años"],
    },
    {
      id: 3,
      texto: "¿Existen cláusulas adicionales?",
      opciones: ["Sí", "No"],
    },
  ],
  "despido laboral": [
    {
      id: 1,
      texto: "¿Cuál fue la causa del despido?",
      opciones: ["Justificada", "Injustificada"],
    },
    {
      id: 2,
      texto: "¿Se cumplió con el preaviso?",
      opciones: ["Sí", "No"],
    },
    {
      id: 3,
      texto: "¿Recibiste indemnización?",
      opciones: ["Sí", "No"],
    },
  ],
  "acoso laboral": [
    {
      id: 1,
      texto: "¿Cuál es la naturaleza del acoso?",
      opciones: ["Físico", "Psicológico", "Ambos"],
    },
    {
      id: 2,
      texto: "¿Existen pruebas documentales?",
      opciones: ["Sí", "No"],
    },
    {
      id: 3,
      texto: "¿El empleador está al tanto?",
      opciones: ["Sí", "No"],
    },
  ],
};

// Función para normalizar texto y eliminar tildes
const normalizarTexto = (texto) => {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
};

export default function ConsultaLegal() {
  const [tema, setTema] = useState("");
  const [paso, setPaso] = useState(0);
  const [respuestas, setRespuestas] = useState([]);
  const [precio, setPrecio] = useState(0);

  const handleSubmit = () => {
    const temaNormalizado = normalizarTexto(tema.trim());
    if (temaNormalizado in preguntasRelacionadas) {
      setPaso(1);
    } else {
      Alert.alert(
        "Lo siento",
        "No tenemos información sobre ese tema específico."
      );
    }
  };

  const handleRespuesta = (respuesta) => {
    setRespuestas([...respuestas, respuesta]);
    if (paso < preguntasRelacionadas[normalizarTexto(tema.trim())].length) {
      setPaso(paso + 1);
    } else {
      const precioBase = 100;
      const precioFinal =
        precioBase +
        respuestas.reduce((acc, resp) => {
          if (resp === "3 o más" || resp === "Alto" || resp === "No") {
            return acc + 50;
          }
          return acc + 25;
        }, 0);
      setPrecio(precioFinal);
      setPaso(paso + 1);
    }
  };

  const reiniciarConsulta = () => {
    setTema("");
    setPaso(0);
    setRespuestas([]);
    setPrecio(0);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Consulta Legal</Text>
        <Text style={styles.description}>
          Calcula el precio de tu consulta legal
        </Text>

        {paso === 0 && (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Tema de consulta</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej. Pensión alimenticia"
              value={tema}
              onChangeText={(text) => setTema(text)}
            />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Iniciar Consulta</Text>
            </TouchableOpacity>
          </View>
        )}

        {paso > 0 &&
          paso <=
            preguntasRelacionadas[normalizarTexto(tema.trim())]?.length && (
            <View>
              <Text style={styles.question}>
                {
                  preguntasRelacionadas[normalizarTexto(tema.trim())][paso - 1]
                    .texto
                }
              </Text>
              {preguntasRelacionadas[normalizarTexto(tema.trim())][
                paso - 1
              ].opciones.map((opcion, index) => (
                <View key={index} style={styles.option}>
                  <Button
                    title={opcion}
                    onPress={() => handleRespuesta(opcion)}
                  />
                </View>
              ))}
            </View>
          )}

        {paso >
          (preguntasRelacionadas[normalizarTexto(tema.trim())]?.length ||
            0) && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultTitle}>
              Precio estimado de la consulta:
            </Text>
            <Text style={styles.resultPrice}>${precio}</Text>
            <TouchableOpacity style={styles.button} onPress={reiniciarConsulta}>
              <Text style={styles.buttonText}>Nueva Consulta</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: 350,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    marginBottom: 20,
    color: "#6c757d",
    textAlign: "center",
  },
  inputContainer: {
    width: "100%",
    alignItems: "center",
  },
  label: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#000",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  question: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  option: {
    marginBottom: 10,
  },
  resultContainer: {
    alignItems: "center",
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  resultPrice: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
