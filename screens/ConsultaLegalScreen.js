import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Alert,
  Animated,
  ImageBackground,
  TouchableOpacity,
  Linking,
  Image,
  SafeAreaView,
} from "react-native";
import preguntasRelacionadas from "../data/preguntasRelacionadas";
import DropdownTema from "../components/DropdownTema";
import Preguntas from "../components/Preguntas";
import ProgressBar from "../components/ProgressBar";
import ConsultarButton from "../components/ConsultarButton";
import styles from "../styles/styles";
import fondo from "../assets/fondo.jpg";
import * as SplashScreen from "expo-splash-screen";
import { MaterialCommunityIcons } from "@expo/vector-icons";

SplashScreen.preventAutoHideAsync();

export default function ConsultaLegalScreen() {
  const [tema, setTema] = useState("");
  const [paso, setPaso] = useState(0);
  const [respuestas, setRespuestas] = useState([]);
  const [precio, setPrecio] = useState(0);
  const [fadeAnim] = useState(new Animated.Value(0));
  const progressAnim = useRef(new Animated.Value(0)).current;

  const normalizarTexto = (texto) => {
    return texto
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/\bpencion\b/, "pension");
  };

  const actualizarProgreso = () => {
    const totalPreguntas =
      preguntasRelacionadas[normalizarTexto(tema.trim())]?.length || 1;
    const nuevoProgreso = paso / totalPreguntas;

    Animated.timing(progressAnim, {
      toValue: nuevoProgreso,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    if (paso > 0) actualizarProgreso();
  }, [paso]);

  useEffect(() => {
    const hideSplash = setTimeout(async () => {
      await SplashScreen.hideAsync();
    }, 2000);
    return () => clearTimeout(hideSplash);
  }, []);

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
      Alert.alert(
        "Lo siento",
        "No tenemos información sobre ese tema específico."
      );
    }
  };

  const handleRespuesta = (respuesta) => {
    const nuevasRespuestas = [...respuestas, respuesta];
    if (paso < preguntasRelacionadas[tema].length) {
      setPaso(paso + 1);
      setRespuestas(nuevasRespuestas);
    } else {
      const precioBase = 100000;
      const precioAdicional = nuevasRespuestas.reduce((acc, resp) => {
        return (
          acc +
          (resp === "3 o más" || resp === "Alto" || resp === "No"
            ? 50000
            : 25000)
        );
      }, 0);
      const precioFinal = precioBase + precioAdicional;
      setPrecio(
        new Intl.NumberFormat("es-CL", {
          style: "currency",
          currency: "CLP",
        }).format(precioFinal) + " + IVA"
      );
    }
  };

  const reiniciarConsulta = () => {
    setTema("");
    setPaso(0);
    setRespuestas([]);
    setPrecio(0);
  };

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

  const llamarDirectamente = () => {
    const phoneNumber = "+56938706522";
    Linking.openURL(`tel:${phoneNumber}`).catch(() => {
      Alert.alert("Error", "No se pudo realizar la llamada");
    });
  };

  return (
    <ImageBackground
      source={fondo}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.card}>
            {/* Logo y título */}
            <View style={styles.iconContainer}>
              <Image
                source={require("../assets/logo_2.png")}
                style={styles.logo}
              />
            </View>
            <Text style={styles.title}>Consulta Legal</Text>
            <Text style={styles.description}>
              Calcula el precio de tu consulta legal
            </Text>

            {paso === 0 && (
              <DropdownTema
                tema={tema}
                setTema={setTema}
                handleSubmit={handleSubmit}
              />
            )}

            {paso > 0 &&
              paso <=
                preguntasRelacionadas[normalizarTexto(tema.trim())]?.length && (
                <Animated.View style={{ opacity: fadeAnim }}>
                  <ProgressBar progressAnim={progressAnim} />
                  <Preguntas
                    tema={tema}
                    paso={paso}
                    setPaso={setPaso}
                    respuestas={respuestas}
                    setRespuestas={setRespuestas}
                    setPrecio={setPrecio}
                  />
                </Animated.View>
              )}

            {paso >
              preguntasRelacionadas[normalizarTexto(tema.trim())]?.length && (
              <Animated.View
                style={[styles.resultContainer, { opacity: fadeAnim }]}
              >
                <Text style={styles.resultTitle}>
                  Precio estimado de la consulta:
                </Text>
                <Text style={styles.resultPrice}>{precio}</Text>

                {/* Sección de contacto */}
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
                <ConsultarButton
                  onPress={reiniciarConsulta}
                  title="Nueva Consulta"
                />
              </Animated.View>
            )}
          </View>
        </View>

        {/* Agregar Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © 2024 Consultas Legales APP Todos los derechos reservados.
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
}
