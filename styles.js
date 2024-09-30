import { StyleSheet } from "react-native";

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
  picker: {
    height: 50,
    width: "100%",
    backgroundColor: "#f9f9f9", // Fondo más claro
    borderRadius: 8, // Bordes redondeados
    paddingHorizontal: 10, // Añadimos relleno horizontal
    marginVertical: 10, // Separación vertical
    borderColor: "#ccc", // Color del borde
    borderWidth: 1, // Ancho del borde
    color: "#333", // Color del texto
    elevation: 2, // Sombra en Android
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

export default styles;
