import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
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
import fondo from "./assets/fondo.jpg"; // Fondo de imagen
import DropDownPicker from "react-native-dropdown-picker"; // Importar DropDownPicker
import preguntasRelacionadas from "./preguntasRelacionadas"; // Importar preguntas desde otro archivo
import styles from "./styles"; // Importar estilos desde otro archivo
import * as SplashScreen from "expo-splash-screen"; // Importa expo-splash-screen
import { LinearGradient } from "expo-linear-gradient";

// Evita que la pantalla de splash se oculte automáticamente
SplashScreen.preventAutoHideAsync();

// Normaliza el texto ingresado para evitar errores ortográficos y de formato
const normalizarTexto = (texto) => {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Elimina tildes
    .toLowerCase()
    .replace(/\bpencion\b/, "pension"); // Correcciones ortográficas comunes
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
  const progressAnim = useRef(new Animated.Value(0)).current; // Controla la animación del progreso

  // Función para manejar el progreso
  const actualizarProgreso = () => {
    const totalPreguntas =
      preguntasRelacionadas[normalizarTexto(tema.trim())]?.length || 1;
    const nuevoProgreso = paso / totalPreguntas;

    // Animar la barra de progreso según el nuevo valor de progreso
    Animated.timing(progressAnim, {
      toValue: nuevoProgreso, // Progreso basado en las preguntas respondidas
      duration: 500, // Duración de la animación
      useNativeDriver: false, // No usamos native driver porque estamos animando el ancho (CSS)
    }).start();
  };

  // Llamar a actualizarProgreso cada vez que cambia el paso
  useEffect(() => {
    if (paso > 0) {
      actualizarProgreso();
    }
  }, [paso]);

  // Oculta la splash automáticamente después de 3 segundos
  useEffect(() => {
    // Simula un retardo de 3 segundos antes de ocultar la pantalla de splash
    const hideSplash = setTimeout(async () => {
      await SplashScreen.hideAsync(); // Oculta la pantalla de splash
    }, 2000); // Duración en milisegundos (2 segundos)

    return () => clearTimeout(hideSplash); // Limpia el timeout si el componente se desmonta
  }, []);

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

  // Enviar mensaje por WhatsApp con toda la información de la consulta
  const contactarPorWhatsApp = () => {
    const cotizacion = precio; // Usa el precio calculado
    const mensaje = `Hola, hice una consulta sobre "${tema}" con la cotización de "${cotizacion}" y me gustaría proseguir.`;

    const url = `whatsapp://send?phone=+56938706522&text=${encodeURIComponent(
      mensaje
    )}`;
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
                source={require("./assets/logo_2.png")}
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
                      <Animated.View
                        style={[
                          styles.animatedProgressBar,
                          {
                            width: progressAnim.interpolate({
                              inputRange: [0, 1],
                              outputRange: ["0%", "100%"], // Ancho de la barra en porcentaje
                            }),
                          },
                        ]}
                      >
                        <LinearGradient
                          colors={["#4CAF50", "#8BC34A", "#CDDC39"]} // Colores degradados
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 0 }}
                          style={styles.progressBarFill}
                        />
                      </Animated.View>
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
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © 2024 Consultas Legales APP Todos los derechos reservados.
          </Text>
        </View>
      </View>
      {/* Footer */}
    </ImageBackground>
  );
}
