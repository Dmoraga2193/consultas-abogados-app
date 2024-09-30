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
import { Picker } from "@react-native-picker/picker"; // Importar Picker para crear un menú desplegable
import preguntasRelacionadas from "./preguntasRelacionadas"; // Importar preguntas desde otro archivo
import styles from "./styles"; // Importar estilos desde otro archivo

// Función para normalizar el texto y corregir errores ortográficos comunes
const normalizarTexto = (texto) => {
  return (
    texto
      .normalize("NFD") // Normalizar el texto para manejar caracteres especiales
      .replace(/[\u0300-\u036f]/g, "") // Eliminar tildes
      .toLowerCase() // Convertir todo el texto a minúsculas
      // Correcciones ortográficas comunes en las consultas
      .replace(/\bpencion\b/, "pension")
      .replace(/\balimentisia\b/, "alimenticia")
    // ... otras correcciones ortográficas
  );
};

// Función para capitalizar la primera letra de cada palabra en el menú
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1); // Capitaliza la primera letra
};

// Componente principal para gestionar las consultas legales
export default function ConsultaLegal() {
  // Estados para el tema, paso actual, respuestas seleccionadas y el precio
  const [tema, setTema] = useState(""); // Almacena el tema seleccionado
  const [paso, setPaso] = useState(0); // Almacena el paso actual en el proceso de preguntas
  const [respuestas, setRespuestas] = useState([]); // Almacena las respuestas seleccionadas
  const [precio, setPrecio] = useState(0); // Almacena el precio calculado para la consulta

  // Función para iniciar el proceso de consulta
  const handleSubmit = () => {
    const temaNormalizado = normalizarTexto(tema.trim()); // Normalizar el texto del tema

    if (temaNormalizado in preguntasRelacionadas) {
      setPaso(1); // Avanza al primer paso de la consulta
      // Iniciar la animación de fade in cuando se haga clic en "Iniciar Consulta"
      Animated.timing(fadeAnim, {
        toValue: 1, // La vista se hace completamente visible
        duration: 500, // Duración de la animación en milisegundos
        useNativeDriver: true, // Mejora el rendimiento
      }).start();
    } else {
      // Mostrar un mensaje de error si no se selecciona un tema válido
      if (Platform.OS === "web") {
        Swal.fire({
          title: "Lo siento",
          text: "Necesitas seleccionar una consulta válida para continuar.",
          icon: "error",
          confirmButtonText: "OK",
          heightAuto: false,
        });
      } else {
        Alert.alert(
          "Lo siento",
          "Necesitas seleccionar una consulta válida para continuar."
        );
      }
    }
  };

  // Estado para gestionar la animación de las vistas
  const [fadeAnim] = useState(new Animated.Value(0));

  // Función para manejar la selección de respuestas
  const handleRespuesta = (respuesta) => {
    const nuevasRespuestas = [...respuestas, respuesta]; // Incluir la respuesta actual

    const temaNormalizado = normalizarTexto(tema.trim());

    // Si aún hay preguntas por mostrar, avanzamos al siguiente paso
    if (paso < preguntasRelacionadas[temaNormalizado].length) {
      setPaso(paso + 1);
      setRespuestas(nuevasRespuestas); // Guardar las respuestas acumuladas
    } else {
      // Cuando se responden todas las preguntas, calcular el precio
      const precioBase = 100000;

      // Sumar valores adicionales en base a las respuestas
      const precioAdicional = nuevasRespuestas.reduce((acc, resp) => {
        if (resp === "3 o más" || resp === "Alto" || resp === "No") {
          return acc + 50000; // Suma 50,000 si la respuesta es "3 o más", "Alto" o "No"
        }
        return acc + 25000; // De lo contrario, suma 25,000
      }, 0);

      // Calcular el precio total
      const precioFinal = precioBase + precioAdicional;

      // Formatear y mostrar el precio en el formato adecuado
      setPrecio(
        new Intl.NumberFormat("es-CL", {
          style: "currency",
          currency: "CLP",
          minimumFractionDigits: 0,
        }).format(precioFinal) + " + IVA"
      );

      // Avanzar para mostrar el resultado y activar la animación
      setPaso(paso + 1);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  };

  // Función para reiniciar la consulta y volver al estado inicial
  const reiniciarConsulta = () => {
    setTema(""); // Reiniciar el tema seleccionado
    setPaso(0); // Reiniciar el contador de pasos
    setRespuestas([]); // Vaciar las respuestas
    setPrecio(0); // Reiniciar el precio
    fadeAnim.setValue(0); // Reiniciar la animación
  };

  // Función para contactar vía WhatsApp
  const contactarPorWhatsApp = () => {
    const url = `whatsapp://send?phone=+56938706522&text=Hola%20Juan,%20me%20gustaría%20obtener%20más%20información%20sobre%20los%20servicios%20legales.`;
    Linking.openURL(url).catch(() => {
      Alert.alert("Error", "No se pudo abrir WhatsApp");
    });
  };

  // Función para realizar una llamada telefónica directamente
  const llamarDirectamente = () => {
    const phoneNumber = "+56938706522";
    Linking.openURL(`tel:${phoneNumber}`).catch(() => {
      Alert.alert("Error", "No se pudo realizar la llamada");
    });
  };

  // Calcular el progreso basado en el número de preguntas respondidas y el total de preguntas
  const progreso =
    paso / (preguntasRelacionadas[normalizarTexto(tema.trim())]?.length || 1);

  return (
    <ImageBackground source={fondo} style={styles.background}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.card}>
            {/* Icono de la consulta */}
            <View style={styles.iconContainer}>
              <Image
                source={require("./static/logo/logo_2.png")}
                style={styles.logo}
              />
            </View>

            {/* Título y descripción */}
            <Text style={styles.title}>Consulta Legal</Text>
            <Text style={styles.description}>
              Calcula el precio de tu consulta legal
            </Text>

            {/* Selección de tema de consulta */}
            {paso === 0 && (
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Tema de consulta</Text>
                <Picker
                  selectedValue={tema}
                  style={styles.picker}
                  onValueChange={(itemValue) => setTema(itemValue)}
                >
                  <Picker.Item label="Selecciona un tema" value="" />
                  {Object.keys(preguntasRelacionadas)
                    .sort() // Ordenar los temas alfabéticamente
                    .map((tema, index) => (
                      <Picker.Item
                        key={index}
                        label={capitalizeFirstLetter(tema)} // Mostrar el tema con la primera letra en mayúscula
                        value={tema}
                      />
                    ))}
                </Picker>

                {/* Botón para iniciar la consulta */}
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                  <Text style={styles.buttonText}>Iniciar Consulta</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Si hay más pasos por seguir, mostrar las preguntas */}
            {paso > 0 && paso <= preguntasRelacionadas[tema]?.length && (
              <Animated.View style={{ opacity: fadeAnim }}>
                <View>
                  {/* Barra de progreso */}
                  <View style={styles.progressBarBackground}>
                    <View
                      style={[
                        styles.progressBarFill,
                        {
                          width: `${
                            (paso / preguntasRelacionadas[tema].length) * 100
                          }%`,
                        },
                      ]}
                    />
                  </View>

                  {/* Mostrar la pregunta actual */}
                  <Text style={styles.question}>
                    {preguntasRelacionadas[tema][paso - 1]?.texto}
                  </Text>

                  {/* Mostrar las opciones de respuesta */}
                  {preguntasRelacionadas[tema][paso - 1]?.opciones.map(
                    (opcion, index) => (
                      <TouchableOpacity
                        key={index}
                        style={styles.button}
                        onPress={() => handleRespuesta(opcion)}
                      >
                        <Text style={styles.buttonText}>{opcion}</Text>
                      </TouchableOpacity>
                    )
                  )}
                </View>
              </Animated.View>
            )}

            {/* Mostrar el resultado del precio al final de las preguntas */}
            {paso > preguntasRelacionadas[tema]?.length && (
              <Animated.View
                style={[styles.resultContainer, { opacity: fadeAnim }]}
              >
                <Text style={styles.resultTitle}>
                  Precio estimado de la consulta:
                </Text>
                <Text style={styles.resultPrice}>{precio}</Text>

                {/* Mostrar información de contacto */}
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
