import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  background: { flex: 1, resizeMode: "cover", justifyContent: "center" },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  card: {
    backgroundColor: "white",
    padding: 30,
    marginVertical: 20, // Más espacio vertical entre los elementos
    borderRadius: 10,
    width: 350,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logo: { width: 80, height: 80 },
  iconContainer: {
    position: "absolute",
    top: -85,
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
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  description: { marginBottom: 20, color: "#6c757d", textAlign: "center" },
  inputContainer: { width: "100%", alignItems: "center", marginTop: 20 },
  label: { marginBottom: 10, fontSize: 16, fontWeight: "500", color: "#333" },
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
    backgroundColor: "#007bff",
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
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  progressBarBackground: {
    width: "100%",
    height: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
    overflow: "hidden", // Asegura que el contenido no se desborde
    marginBottom: 20,
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4, // Para Android
  },
  animatedProgressBar: {
    position: "absolute",
    height: "100%",
    width: "100%", // Asegura que la barra ocupe todo el ancho
  },
  question: { fontSize: 18, marginBottom: 20, textAlign: "center" },
  resultContainer: { alignItems: "center" },
  resultTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
  resultPrice: { fontSize: 32, fontWeight: "bold", marginBottom: 5 },
  contactCard: {
    backgroundColor: "#f9f9f9",
    padding: 20,
    borderRadius: 10,
    width: "100%",
    alignItems: "flex-start",
    marginTop: 5,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  contactTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  contactInfo: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  contactText: { fontSize: 16, color: "#333", marginLeft: 10 },
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
  dropdown: {
    borderColor: "#ddd", // Color del borde
    borderWidth: 1, // Ancho del borde
    backgroundColor: "#f9f9f9", // Fondo claro
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
    color: "#333", // Color del texto
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
  footer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10, // Espaciado
    position: "relative", // Puede ser absolute si deseas que esté siempre al fondo
    bottom: 0,
    width: "100%", // Asegúrate de que ocupe todo el ancho
  },
  footerText: {
    color: "#888", // Color del texto
    fontSize: 12, // Tamaño del texto
  },
});

export default styles;
