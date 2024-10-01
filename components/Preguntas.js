import React from "react";
import { View, Text, Pressable } from "react-native";
import preguntasRelacionadas from "../data/preguntasRelacionadas";
import styles from "../styles/styles";

export default function Preguntas({
  tema,
  paso,
  setPaso,
  respuestas,
  setRespuestas,
  setPrecio,
}) {
  const handleRespuesta = (respuesta) => {
    const nuevasRespuestas = [...respuestas, respuesta]; // Agrega la nueva respuesta
    if (paso < preguntasRelacionadas[tema].length) {
      setPaso(paso + 1);
      setRespuestas(nuevasRespuestas);
    } else {
      // Calcula el precio basado en las respuestas seleccionadas
      const precioBase = 100000;
      const precioAdicional = nuevasRespuestas.reduce((acc, resp) => {
        if (resp === "3 o más" || resp === "Alto" || resp === "No") {
          return acc + 50000;
        }
        return acc + 25000;
      }, 0);

      const precioFinal = precioBase + precioAdicional;
      setPrecio(
        new Intl.NumberFormat("es-CL", {
          style: "currency",
          currency: "CLP",
          minimumFractionDigits: 0,
        }).format(precioFinal) + " + IVA"
      );

      setPaso(paso + 1);
    }
  };

  return (
    <View>
      <Text style={styles.question}>
        {preguntasRelacionadas[tema][paso - 1]?.texto}
      </Text>
      {preguntasRelacionadas[tema][paso - 1]?.opciones.map((opcion, index) => (
        <Pressable
          key={index}
          style={styles.button}
          onPress={() => handleRespuesta(opcion)}
        >
          <Text style={styles.buttonText}>{opcion}</Text>
        </Pressable>
      ))}
    </View>
  );
}
