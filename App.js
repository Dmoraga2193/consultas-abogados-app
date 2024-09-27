import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
  Linking,
} from "react-native";
import Swal from "sweetalert2";

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
  "accidente de tránsito": [
    {
      id: 1,
      texto: "¿Hubo lesionados?",
      opciones: ["Sí", "No"],
    },
    {
      id: 2,
      texto: "¿Quién tuvo la culpa?",
      opciones: ["Yo", "El otro conductor", "No está claro"],
    },
    {
      id: 3,
      texto: "¿El seguro cubre los daños?",
      opciones: ["Sí", "No"],
    },
  ],
  adopcion: [
    {
      id: 1,
      texto: "¿Es una adopción nacional o internacional?",
      opciones: ["Nacional", "Internacional"],
    },
    {
      id: 2,
      texto: "¿La pareja es casada o soltera?",
      opciones: ["Casada", "Soltera"],
    },
    {
      id: 3,
      texto: "¿El menor tiene más de 12 años?",
      opciones: ["Sí", "No"],
    },
  ],
  "violencia doméstica": [
    {
      id: 1,
      texto: "¿Has denunciado antes?",
      opciones: ["Sí", "No"],
    },
    {
      id: 2,
      texto: "¿Necesitas una orden de restricción?",
      opciones: ["Sí", "No"],
    },
    {
      id: 3,
      texto: "¿Hay hijos involucrados?",
      opciones: ["Sí", "No"],
    },
  ],
  impuestos: [
    {
      id: 1,
      texto: "¿Es para declaración personal o empresarial?",
      opciones: ["Personal", "Empresarial"],
    },
    {
      id: 2,
      texto: "¿Tienes impuestos atrasados?",
      opciones: ["Sí", "No"],
    },
    {
      id: 3,
      texto: "¿Has recibido alguna notificación de auditoría?",
      opciones: ["Sí", "No"],
    },
  ],
  "propiedad intelectual": [
    {
      id: 1,
      texto: "¿Es una patente, derecho de autor o marca registrada?",
      opciones: ["Patente", "Derecho de autor", "Marca registrada"],
    },
    {
      id: 2,
      texto: "¿Has registrado la propiedad?",
      opciones: ["Sí", "No"],
    },
    {
      id: 3,
      texto: "¿Necesitas asistencia en caso de infracción?",
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
      if (Platform.OS === "web") {
        // Usar SweetAlert en web con heightAuto: false para evitar el desplazamiento
        Swal.fire({
          title: "Lo siento",
          text: "No tenemos información sobre ese tema específico.",
          icon: "error",
          confirmButtonText: "OK",
          heightAuto: false, // Evita que SweetAlert ajuste el tamaño automáticamente
        });
      } else {
        // Usar Alert.alert en móvil
        Alert.alert(
          "Lo siento",
          "No tenemos información sobre ese tema específico."
        );
      }
    }
  };

  const handleRespuesta = (respuesta) => {
    setRespuestas([...respuestas, respuesta]);
    if (paso < preguntasRelacionadas[normalizarTexto(tema.trim())].length) {
      setPaso(paso + 1);
    } else {
      const precioBase = 100000; // Precio base en pesos chilenos (100 mil)

      // Calcular el precio final basado en las respuestas
      const precioFinal =
        precioBase +
        respuestas.reduce((acc, resp) => {
          if (resp === "3 o más" || resp === "Alto" || resp === "No") {
            return acc + 50000; // Incremento de 50 mil
          }
          return acc + 25000; // Incremento de 25 mil
        }, 0);

      // Formatear el precio en miles con moneda CLP
      const precioFormateado = new Intl.NumberFormat("es-CL", {
        style: "currency",
        currency: "CLP",
        minimumFractionDigits: 0,
      }).format(precioFinal);

      // Mostrar el precio formateado con el texto "+ IVA"
      setPrecio(`${precioFormateado} + IVA`);
      setPaso(paso + 1);
    }
  };

  const reiniciarConsulta = () => {
    setTema("");
    setPaso(0);
    setRespuestas([]);
    setPrecio(0);
  };

  const contactarPorWhatsApp = () => {
    const url = `whatsapp://send?phone=+56938706522&text=Hola%20Juan,%20me%20gustaría%20obtener%20más%20información%20sobre%20los%20servicios%20legales.`;
    Linking.openURL(url).catch(() => {
      Alert.alert("Error", "No se pudo abrir WhatsApp");
    });
  };

  const llamarDirectamente = () => {
    const phoneNumber = "+56938706522";
    Linking.openURL(`tel:${phoneNumber}`).catch(() => {
      Alert.alert("Error", "No se pudo realizar la llamada");
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image source={require("./static/logo/logo.png")} style={styles.logo} />
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
                <TouchableOpacity
                  key={index}
                  style={styles.button}
                  onPress={() => handleRespuesta(opcion)}
                >
                  <Text style={styles.buttonText}>{opcion}</Text>
                </TouchableOpacity>
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
            <Text style={styles.resultPrice}>{precio}</Text>

            {/* Información de contacto del ejecutivo */}
            <View style={styles.contactCard}>
              <Text style={styles.contactTitle}>Ejecutivo de Contacto</Text>
              <Text style={styles.contactText}>Nombre: Juan Pérez</Text>
              <Text style={styles.contactText}>Teléfono: +56 9 3870 6522</Text>
              <Text style={styles.contactText}>Email: jperez@abogados.com</Text>
            </View>

            {/* Botones de contacto */}
            <View style={styles.contactButtonsContainer}>
              <TouchableOpacity
                style={styles.contactButtonWhatsApp}
                onPress={contactarPorWhatsApp}
              >
                <Text style={styles.contactButtonText}>
                  Hablar por WhatsApp
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.contactButtonLlamar}
                onPress={llamarDirectamente}
              >
                <Text style={styles.contactButtonText}>Llamar</Text>
              </TouchableOpacity>
            </View>

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
    height: "100vh", // Asegura que ocupe toda la altura de la ventana
    width: "100%", // Asegura que ocupe todo el ancho
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
  logo: {
    width: 40,
    height: 40,
    marginBottom: 15,
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
    marginBottom: 10,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  question: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
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
  // Estilo para el card de contacto
  contactCard: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 15,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  contactText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 3,
  },
  contactButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    marginBottom: 20,
    width: "100%",
  },
  contactButtonWhatsApp: {
    backgroundColor: "#25D366", // Verde de WhatsApp
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  contactButtonLlamar: {
    backgroundColor: "#34B7F1", // Color de llamadas
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
});
