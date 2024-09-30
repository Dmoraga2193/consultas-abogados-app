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
  Animated,
  ImageBackground,
} from "react-native";
import Swal from "sweetalert2";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import fondo from "./static/logo/fondo.jpg";

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

const normalizarTexto = (texto) => {
  return (
    texto
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Eliminar tildes
      .toLowerCase()
      // Correcciones ortográficas comunes
      .replace(/\bpencion\b/, "pension") // Corregir "pencion" a "pension"
      .replace(/\balimentisia\b/, "alimenticia") // Corregir "alimentisia" a "alimenticia"
      .replace(/\balimentisias\b/, "alimenticia") // Corregir plural con error
      .replace(/\bdivorcios\b/, "divorcio") // Corregir "divorcios" a "divorcio"
      .replace(/\bdivorsio\b/, "divorcio") // Corregir "divorsio" a "divorcio"
      .replace(/\berensia\b/, "herencia") // Corregir "erensia" a "herencia"
      .replace(/\berencias\b/, "herencia") // Corregir "erencias" a "herencia"
      .replace(/\bsucesion\b/, "herencia") // Corregir "sucesion" a "herencia"
      .replace(/\bsucesiones\b/, "herencia") // Corregir plural con error
      .replace(/\bcontrato de arrendaminto\b/, "contrato de arrendamiento") // Corregir "arrendaminto"
      .replace(/\barrendaminto\b/, "arrendamiento") // Error ortográfico común en arrendamiento
      .replace(/\bdespidos laborales\b/, "despido laboral") // Corregir plural con error
      .replace(/\bdesspido\b/, "despido") // Error común en "despido"
      .replace(/\bacoso laboral\b/, "acoso laboral") // Variante correcta de "acoso laboral"
      .replace(/\bacosos laborales\b/, "acoso laboral") // Corregir plural con error
      .replace(/\bacidente de transito\b/, "accidente de transito") // Corregir "acidente" a "accidente"
      .replace(/\btransito\b/, "tránsito") // Añadir tilde en "tránsito"
      .replace(/\bacidentes de transito\b/, "accidente de tránsito") // Corregir plural
      .replace(/\badopsion\b/, "adopcion") // Corregir "adopsion" a "adopcion"
      .replace(/\badopciones\b/, "adopcion") // Corregir plural con error
      .replace(/\bviolencia domestica\b/, "violencia domestica") // Corregir falta de tilde en "doméstica"
      .replace(/\bviolencias domesticas\b/, "violencia domestica") // Corregir plural con error
      .replace(/\bpropiedad intelectual\b/, "propiedad intelectual") // Variante correcta de "propiedad intelectual"
      .replace(/\bpropiedades intelectuales\b/, "propiedad intelectual") // Corregir plural con error
      // Correcciones adicionales en plurales
      .replace(/\blaborales\b/, "laboral")
      .replace(/\bacosos\b/, "acoso")
      .replace(/\bpropiedades\b/, "propiedad")
      .replace(/\bintelectuales\b/, "intelectual")
      .replace(/\bpensiones\b/, "pension")
      .replace(/\badopciones\b/, "adopcion")
      .replace(/\baccidentes\b/, "accidente")
      .replace(/s$/, "") // Eliminar la "s" al final de la palabra, si existe
  );
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
      // Iniciar la animación de fade in cuando se haga clic en "Iniciar Consulta"
      Animated.timing(fadeAnim, {
        toValue: 1, // La vista se hace completamente visible
        duration: 500, // Duración de la animación en milisegundos
        useNativeDriver: true, // Mejora el rendimiento
      }).start();
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

  // Añade este nuevo estado para la animación
  const [fadeAnim] = useState(new Animated.Value(0));

  const handleRespuesta = (respuesta) => {
    setRespuestas([...respuestas, respuesta]);
    if (paso < preguntasRelacionadas[normalizarTexto(tema.trim())].length) {
      setPaso(paso + 1);
    } else {
      const precioBase = 100000;
      const precioFinal =
        precioBase +
        respuestas.reduce((acc, resp) => {
          if (resp === "3 o más" || resp === "Alto" || resp === "No") {
            return acc + 50000;
          }
          return acc + 25000;
        }, 0);

      const precioFormateado = new Intl.NumberFormat("es-CL", {
        style: "currency",
        currency: "CLP",
        minimumFractionDigits: 0,
      }).format(precioFinal);

      setPrecio(`${precioFormateado} + IVA`);
      setPaso(paso + 1);

      // Inicia la animación de fade in
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
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

  // Cálculo del progreso basado en el paso actual y el número total de preguntas
  const progreso =
    paso / (preguntasRelacionadas[normalizarTexto(tema.trim())]?.length || 1);

  return (
    <ImageBackground source={fondo} style={styles.background}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.card}>
            <View style={styles.iconContainer}>
              <Image
                source={require("./static/logo/logo_2.png")}
                style={styles.logo}
              />
            </View>
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
                <Animated.View style={{ opacity: fadeAnim }}>
                  <View>
                    {/* Mostrar barra de progreso */}
                    <View style={styles.progressBarBackground}>
                      <View
                        style={[
                          styles.progressBarFill,
                          { width: `${progreso * 100}%` },
                        ]}
                      />
                    </View>

                    <Text style={styles.question}>
                      {
                        preguntasRelacionadas[normalizarTexto(tema.trim())][
                          paso - 1
                        ]?.texto
                      }
                    </Text>
                    {preguntasRelacionadas[normalizarTexto(tema.trim())][
                      paso - 1
                    ]?.opciones.map((opcion, index) => (
                      <TouchableOpacity
                        key={index}
                        style={styles.button}
                        onPress={() => handleRespuesta(opcion)}
                      >
                        <Text style={styles.buttonText}>{opcion}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </Animated.View>
              )}

            {paso >
              (preguntasRelacionadas[normalizarTexto(tema.trim())]?.length ||
                0) && (
              <Animated.View
                style={[styles.resultContainer, { opacity: fadeAnim }]}
              >
                <Text style={styles.resultTitle}>
                  Precio estimado de la consulta:
                </Text>
                <Text style={styles.resultPrice}>{precio}</Text>

                <View style={styles.contactCard}>
                  <Text style={styles.contactTitle}>Ejecutivo de Contacto</Text>
                  <View style={styles.contactInfo}>
                    <MaterialCommunityIcons
                      name="account-outline"
                      size={24}
                      color="#4CAF50"
                      style={styles.buttonIcon}
                    />
                    <Text style={styles.contactText}>Juan Pérez</Text>
                  </View>
                  <View style={styles.contactInfo}>
                    <MaterialCommunityIcons
                      name="phone-outline"
                      size={24}
                      color="#2196F3"
                      style={styles.buttonIcon}
                    />
                    <Text style={styles.contactText}>+56 9 3870 6522</Text>
                  </View>
                  <View style={styles.contactInfo}>
                    <MaterialCommunityIcons
                      name="email-outline"
                      size={24}
                      color="#F44336"
                      style={styles.buttonIcon}
                    />
                    <Text style={styles.contactText}>jperez@abogados.com</Text>
                  </View>
                </View>

                <View style={styles.contactButtonsContainer}>
                  <TouchableOpacity
                    style={styles.contactButtonWhatsApp}
                    onPress={contactarPorWhatsApp}
                  >
                    <MaterialCommunityIcons
                      name="whatsapp"
                      size={24}
                      color="#FFFFFF"
                      style={styles.buttonIcon}
                    />
                    <Text style={styles.contactButtonText}>WhatsApp</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.contactButtonLlamar}
                    onPress={llamarDirectamente}
                  >
                    <MaterialCommunityIcons
                      name="phone-outline"
                      size={24}
                      color="#FFFFFF"
                      style={styles.buttonIcon}
                    />
                    <Text style={styles.contactButtonText}>Llamar</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  style={styles.button}
                  onPress={reiniciarConsulta}
                >
                  <Text style={styles.buttonText}>Nueva Consulta</Text>
                </TouchableOpacity>
              </Animated.View>
            )}
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover", // Opción para que la imagen se ajuste al tamaño
    justifyContent: "center",
  },
  overlay: {
    position: "absolute", // Asegura que el componente se posicione sobre toda la pantalla
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Fondo blanco semitransparente
    padding: 20,
    justifyContent: "center", // Centra el contenido verticalmente
    alignItems: "center", // Centra el contenido horizontalmente
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

    // Asegura que ocupe toda la altura de la ventana
    // Asegura que ocupe todo el ancho
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
    width: 80,
    height: 80,
  },
  iconContainer: {
    position: "absolute",
    top: -85, // Aumenta este valor para que el icono se fusione más con el contenido
    alignSelf: "center",
    backgroundColor: "#ffffff", // Mantén el color para hacer contraste con el fondo
    borderRadius: 50,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
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
    backgroundColor: "#0870b7", // Color de fondo de reserva en caso de que el degradado no funcione
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: "center",
    width: "100%",
  },
  contactButtonWhatsApp: {
    backgroundColor: "#25D366", // Color verde de WhatsApp
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginRight: 10,
  },
  contactButtonLlamar: {
    backgroundColor: "#34B7F1", // Color azul para Llamar
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginLeft: 10,
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
    padding: 20,
    borderRadius: 10,
    width: "100%",
    alignItems: "flex-start",
    marginTop: 20,
    marginBottom: 20,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  contactTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  contactInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  contactText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 10,
  },
  icon: {
    width: 24,
    height: 24,
  },
  contactButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
    marginBottom: 20,
  },
  contactButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 8,
  },
  progressBarBackground: {
    width: "100%",
    height: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
    marginBottom: 20,
    overflow: "hidden",
  },
  buttonIcon: {
    marginRight: 8,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#f5c50c",
    transition: "width 0.3s ease-in-out",
    borderRadius: 10, // Bordes redondeados
  },
  progressText: {
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
  },
});
