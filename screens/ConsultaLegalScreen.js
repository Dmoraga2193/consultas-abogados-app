import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  Alert,
  ImageBackground,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import DropdownTema from "../components/DropdownTema";
import ConsultarButton from "../components/ConsultarButton";
import styles from "../styles/styles";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import categoriasYTemas from "../data/categoriasYTemas";

SplashScreen.preventAutoHideAsync();

export default function ConsultaLegalScreen() {
  const [paso, setPaso] = useState(0);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [temaSeleccionado, setTemaSeleccionado] = useState("");
  const [precio, setPrecio] = useState(0);
  const [desglosePrecio, setDesglosePrecio] = useState({});

  useEffect(() => {
    const hideSplash = setTimeout(async () => {
      await SplashScreen.hideAsync();
    }, 2000);
    return () => clearTimeout(hideSplash);
  }, []);

  const handleCategoriaSelect = (categoria) => {
    setCategoriaSeleccionada(categoria);
  };

  const handleTemaSelect = (tema) => {
    setTemaSeleccionado(tema);
  };

  const handleSubmit = (categoria, tema) => {
    setCategoriaSeleccionada(categoria);
    setTemaSeleccionado(tema);
    calcularPrecio(categoria, tema);
    setPaso(1);
  };

  const calcularPrecio = (categoria, tema) => {
    const categoriaInfo = categoriasYTemas[categoria];
    if (!categoriaInfo) {
      Alert.alert(
        "Error",
        "No se encontró información de precios para esta categoría."
      );
      return;
    }

    let precioBase, precioAdicional;

    if (
      categoria === "Familia" &&
      categoriaInfo.preciosEspecificos &&
      categoriaInfo.preciosEspecificos[tema]
    ) {
      ({ precioBase, precioAdicional } =
        categoriaInfo.preciosEspecificos[tema]);
    } else {
      precioBase = categoriaInfo.precioBase;
      precioAdicional = categoriaInfo.precioAdicional;
    }

    let precioTotal = precioBase;
    let precioAdicionalEstimado = precioAdicional;

    if (typeof precioAdicional === "string") {
      if (precioAdicional.includes("valor juicio")) {
        precioAdicionalEstimado = 200000; // Valor estimado, se debe ajustar según el caso
        precioTotal += precioAdicionalEstimado;
      } else if (precioAdicional.includes("%")) {
        precioAdicionalEstimado = "Por determinar (% del juicio)";
      }
    } else if (typeof precioAdicional === "number") {
      precioTotal += precioAdicional;
    }

    setDesglosePrecio({
      precioBase,
      precioAdicional: precioAdicionalEstimado,
    });

    setPrecio(precioTotal);
  };

  const formatearPrecio = (valor) => {
    if (typeof valor === "string") return valor;
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
    }).format(valor);
  };

  const reiniciarConsulta = () => {
    setPaso(0);
    setCategoriaSeleccionada("");
    setTemaSeleccionado("");
    setPrecio(0);
    setDesglosePrecio({});
  };

  const contactarPorWhatsApp = () => {
    const mensaje = `Hola, hice una consulta sobre "${categoriaSeleccionada} - ${temaSeleccionado}" con la cotización de "${formatearPrecio(
      precio
    )}" y me gustaría proseguir.`;
    const url = `whatsapp://send?phone=+56938706522&text=${encodeURIComponent(
      mensaje
    )}`;
    Linking.openURL(url).catch(() => {
      Alert.alert("Error", "No se pudo abrir WhatsApp");
    });
  };

  const llamarDirectamente = () => {
    const phoneNumber = "+56938706522";
    Linking.openURL(`tel:${phoneNumber}`);
  };

  return (
    <ImageBackground
      source={require("../assets/fondo.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <StatusBar style="dark" />
      <LinearGradient
        colors={["rgba(255,255,255,0.1)", "rgba(255,255,255,0.1)"]}
        style={styles.gradient}
      >
        <SafeAreaView style={styles.safeArea}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.keyboardAvoidingView}
          >
            <View style={styles.contentContainer}>
              <View style={styles.card}>
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
                    onCategoriaSelect={handleCategoriaSelect}
                    onTemaSelect={handleTemaSelect}
                    onSubmit={handleSubmit}
                    categoriasYTemas={categoriasYTemas}
                  />
                )}

                {paso === 1 && (
                  <View style={styles.resultContainer}>
                    <Text style={styles.resultTitle}>
                      Resultado de la consulta:
                    </Text>
                    <Text style={styles.resultInfo}>
                      Categoría: {categoriaSeleccionada}
                    </Text>
                    <Text style={styles.resultInfo}>
                      Tema: {temaSeleccionado}
                    </Text>
                    <Text style={styles.priceInfo}>
                      Precio adicional:{" "}
                      {formatearPrecio(desglosePrecio.precioAdicional)}
                    </Text>
                    <Text style={styles.priceTitle}>Precio estimado:</Text>
                    <Text style={styles.resultPrice}>
                      {formatearPrecio(precio)}
                    </Text>
                    <Text style={styles.priceNote}>
                      Nota: El costo final puede variar dependiendo de la
                      complejidad del caso y el valor del juicio.
                    </Text>

                    <View style={styles.contactCard}>
                      <Text style={styles.contactTitle}>
                        Ejecutivo de Contacto
                      </Text>
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
                        <Text style={styles.contactText}>
                          jperez@abogados.com
                        </Text>
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

                    <ConsultarButton
                      onPress={reiniciarConsulta}
                      title="Nueva Consulta"
                      style={styles.buttonNuevaConsulta}
                    />
                  </View>
                )}
              </View>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </LinearGradient>
    </ImageBackground>
  );
}
