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

export default preguntasRelacionadas;
