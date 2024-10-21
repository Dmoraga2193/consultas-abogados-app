import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

// Color Palettes
const colorPalettes = {
  midnightBlueSilver: {
    primary: "#0C2340", // Midnight Blue
    secondary: "#939393", // Silver
    background: "#F8F9FA", // Off-White
    text: "#333333", // Dark Gray
    accent: "#4A90E2", // Sky Blue
  },
  graphiteCoral: {
    primary: "#3C4048", // Graphite
    secondary: "#FF6B6B", // Coral
    background: "#FFFFFF", // White
    text: "#2C3E50", // Dark Slate Gray
    accent: "#34C759", // Green
  },
  forestGreenIvory: {
    primary: "#2C5F2D", // Forest Green
    secondary: "#FFFFF0", // Ivory
    background: "#F4F9F4", // Light Mint
    text: "#1A1A1A", // Almost Black
    accent: "#FFB30F", // Golden Yellow
  },
  slateBlueChampagne: {
    primary: "#4E5D94", // Slate Blue
    secondary: "#F7E7CE", // Champagne
    background: "#FAFAFA", // Light Gray
    text: "#2F3542", // Dark Slate
    accent: "#FF6B6B", // Coral
  },
  charcoalTeal: {
    primary: "#2F4F4F", // Dark Slate Gray
    secondary: "#40E0D0", // Turquoise
    background: "#F5F5F5", // White Smoke
    text: "#333333", // Dark Gray
    accent: "#FF7F50", // Coral
  },
};

// Choose a color palette here
const colors = colorPalettes.midnightBlueSilver;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    backgroundColor: colors.background,
  },
  safeArea: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: `${colors.background}CC`,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  gradient: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: colors.background,
    padding: 30,
    marginVertical: 20, // Más espacio vertical entre los elementos
    borderRadius: 10,
    width: 380,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconContainer: {
    position: "absolute",
    top: -40,
    alignSelf: "center",
    backgroundColor: "#ffffff",
    borderRadius: 50,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logo: {
    width: 80,
    height: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: colors.text,
    textAlign: "center",
    marginTop: 40,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    color: colors.secondary,
    textAlign: "center",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: colors.text,
  },
  dropdown: {
    borderColor: colors.secondary,
    borderWidth: 1, // Ancho del borde
    backgroundColor: colors.background,
    borderRadius: 8, // Bordes redondeados
    paddingVertical: 8, // Relleno vertical
    paddingHorizontal: 12, // Relleno horizontal
    height: 50, // Altura del dropdown
    marginBottom: 20, // Espacio entre el dropdown y el botón
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dropdownText: {
    fontSize: 16, // Tamaño del texto
    color: colors.text,
    textAlign: "left", // Alinear el texto a la izquierda
    fontWeight: "500", // Peso del texto
  },
  dropdownContainer: {
    borderColor: "#ddd", // Color del borde del contenedor de opciones
    borderWidth: 1, // Ancho del borde del contenedor
    borderRadius: 8, // Bordes redondeados
    backgroundColor: "#ffffff", // Fondo blanco
  },
  dropdownArrow: {
    color: "#666", // Color del ícono de la flecha
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: "center",
    width: "100%",
    shadowColor: "#000", // Sombra suave
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Para Android
  },
  buttonText: {
    color: colors.background,
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  questionContainer: {
    marginBottom: 20,
  },
  question: {
    fontSize: 18,
    marginBottom: 10,
    color: "#333",
  },
  resultContainer: {
    alignItems: "center",
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  resultPrice: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.primary,
    marginTop: 3,
    textAlign: "center",
  },
  contactCard: {
    backgroundColor: `${colors.secondary}22`,
    padding: 20,
    borderRadius: 10,
    width: "100%",
    alignItems: "flex-start",
    marginTop: 5,
    borderColor: colors.secondary,
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
    marginLeft: 10,
    color: "#333",
  },
  contactButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
    marginBottom: 20,
  },
  contactButtonWhatsApp: {
    backgroundColor: "#25D366",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginRight: 10,
    shadowColor: "#000", // Sombra suave
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Para Android
  },
  contactButtonLlamar: {
    backgroundColor: "#34B7F1",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginLeft: 10,
    shadowColor: "#000", // Sombra suave
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Para Android
  },
  contactButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 8,
  },
  buttonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  buttonNuevaConsulta: {
    alignSelf: "center",
    marginTop: 20,
    width: "100%",
  },
  priceInfo: {
    fontSize: 14,
    marginBottom: 3,
    color: "#555",
    textAlign: "left",
  },
  priceNote: {
    fontSize: 10,
    marginTop: 3,
    color: "#666",
    fontStyle: "italic",
    textAlign: "center",
  },
});

export default styles;
