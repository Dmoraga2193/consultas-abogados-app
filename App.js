import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  Platform,
  Image,
  Linking,
  Animated,
  ImageBackground,
} from "react-native";
import Swal from "sweetalert2"; // SweetAlert para alertas en la web
import { MaterialCommunityIcons } from "@expo/vector-icons"; // Iconos
import fondo from "./static/logo/fondo.jpg"; // Fondo de imagen
import DropDownPicker from "react-native-dropdown-picker"; // Importar DropDownPicker
import preguntasRelacionadas from "./preguntasRelacionadas"; // Importar preguntas desde otro archivo
import styles from "./styles"; // Importar estilos desde otro archivo

// Normaliza el texto ingresado para evitar errores ortográficos y de formato
const normalizarTexto = (texto) => {
  return (
    texto
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Elimina tildes
      .toLowerCase()
      .replace(/\bpencion\b/, "pension") // Correcciones ortográficas comunes
      // ...otros reemplazos
      .replace(/s$/, "")
  ); // Elimina la "s" al final si es un plural
};

export default function ConsultaLegal() {
  const [tema, setTema] = useState(""); // Tema seleccionado
  const [open, setOpen] = useState(false); // Estado para el control del Dropdown
  const [items, setItems] = useState(
    Object.keys(preguntasRelacionadas)
      .sort() // Ordena los temas alfabéticamente
      .map((tema) => ({
        label: tema.charAt(0).toUpperCase() + tema.slice(1), // Capitaliza la primera letra del tema
        value: tema, // El valor debe coincidir exactamente con las claves en preguntasRelacionadas
      }))
  ); // Lista de temas para el Dropdown
  const [paso, setPaso] = useState(0); // Paso actual en el flujo de preguntas
  const [respuestas, setRespuestas] = useState([]); // Respuestas seleccionadas
  const [precio, setPrecio] = useState(0); // Precio calculado
  const [fadeAnim] = useState(new Animated.Value(0)); // Animación de fade in

  // Maneja el envío del tema seleccionado
  const handleSubmit = () => {
    const temaNormalizado = normalizarTexto(tema.trim());

    if (temaNormalizado in preguntasRelacionadas) {
      setPaso(1);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Platform.OS === "web"
        ? Swal.fire({
            title: "Lo siento",
            text: "No tenemos información sobre ese tema específico.",
            icon: "error",
            confirmButtonText: "OK",
            heightAuto: false,
          })
        : Alert.alert(
            "Lo siento",
            "No tenemos información sobre ese tema específico."
          );
    }
  };

  // Maneja la selección de respuestas
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
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  };

  // Reinicia la consulta
  const reiniciarConsulta = () => {
    setTema("");
    setPaso(0);
    setRespuestas([]);
    setPrecio(0);
  };

  // Enviar mensaje por WhatsApp
  const contactarPorWhatsApp = () => {
    const url = `whatsapp://send?phone=+56938706522&text=Hola%20Juan,%20me%20gustaría%20obtener%20más%20información%20sobre%20los%20servicios%20legales.`;
    Linking.openURL(url).catch(() => {
      Alert.alert("Error", "No se pudo abrir WhatsApp");
    });
  };

  // Llamada directa
  const llamarDirectamente = () => {
    const phoneNumber = "+56938706522";
    Linking.openURL(`tel:${phoneNumber}`).catch(() => {
      Alert.alert("Error", "No se pudo realizar la llamada");
    });
  };

  // Cálculo del progreso de las preguntas
  const progreso =
    paso / (preguntasRelacionadas[normalizarTexto(tema.trim())]?.length || 1);

  return (
    <ImageBackground source={fondo} style={styles.background}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.card}>
            {/* Logo y título */}
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

            {/* Selección del tema inicial */}
            {paso === 0 && (
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Tema de consulta</Text>
                {/* Dropdown para seleccionar el tema */}
                <DropDownPicker
                  open={open}
                  value={tema}
                  items={items}
                  setOpen={setOpen}
                  setValue={setTema}
                  setItems={setItems}
                  placeholder="Selecciona un tema"
                  style={styles.dropdown} // Estilo del dropdown cerrado
                  dropDownContainerStyle={styles.dropdownContainer} // Estilo del contenedor de opciones
                  textStyle={styles.dropdownText} // Estilo del texto en el dropdown
                  arrowIconStyle={styles.dropdownArrow} // Estilo del ícono de la flecha
                />

                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                  <Text style={styles.buttonText}>Iniciar Consulta</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Preguntas relacionadas */}
            {paso > 0 &&
              paso <=
                preguntasRelacionadas[normalizarTexto(tema.trim())]?.length && (
                <Animated.View style={{ opacity: fadeAnim }}>
                  <View>
                    {/* Barra de progreso */}
                    <View style={styles.progressBarBackground}>
                      <View
                        style={[
                          styles.progressBarFill,
                          { width: `${progreso * 100}%` },
                        ]}
                      />
                    </View>

                    {/* Pregunta actual */}
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

            {/* Resultado del cálculo del precio */}
            {paso >
              preguntasRelacionadas[normalizarTexto(tema.trim())]?.length && (
              <Animated.View
                style={[styles.resultContainer, { opacity: fadeAnim }]}
              >
                <Text style={styles.resultTitle}>
                  Precio estimado de la consulta:
                </Text>
                <Text style={styles.resultPrice}>{precio}</Text>

                {/* Información de contacto */}
                <View style={styles.contactCard}>
                  <Text style={styles.contactTitle}>Ejecutivo de Contacto</Text>
                  <View style={styles.contactInfo}>
                    <MaterialCommunityIcons
                      name="account-outline"
                      size={24}
                      color="#4CAF50"
                    />
                    <Text style={styles.contactText}>Juan Pérez</Text>
                  </View>
                  <View style={styles.contactInfo}>
                    <MaterialCommunityIcons
                      name="phone-outline"
                      size={24}
                      color="#2196F3"
                    />
                    <Text style={styles.contactText}>+56 9 3870 6522</Text>
                  </View>
                  <View style={styles.contactInfo}>
                    <MaterialCommunityIcons
                      name="email-outline"
                      size={24}
                      color="#F44336"
                    />
                    <Text style={styles.contactText}>jperez@abogados.com</Text>
                  </View>
                </View>

                {/* Botones de contacto */}
                <View style={styles.contactButtonsContainer}>
                  <TouchableOpacity
                    style={styles.contactButtonWhatsApp}
                    onPress={contactarPorWhatsApp}
                  >
                    <MaterialCommunityIcons
                      name="whatsapp"
                      size={24}
                      color="#FFFFFF"
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
                    />
                    <Text style={styles.contactButtonText}>Llamar</Text>
                  </TouchableOpacity>
                </View>

                {/* Botón para reiniciar la consulta */}
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
