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
  "accidente de transito": [
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
  "violencia domestica": [
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
  "responsabilidad civil": [
    {
      id: 1,
      texto: "¿El daño fue causado por negligencia o intencional?",
      opciones: ["Negligencia", "Intencional"],
    },
    {
      id: 2,
      texto: "¿El daño es a personas o propiedad?",
      opciones: ["Personas", "Propiedad"],
    },
    {
      id: 3,
      texto: "¿Hay seguros que cubran los daños?",
      opciones: ["Sí", "No"],
    },
  ],
  "contratos laborales": [
    {
      id: 1,
      texto: "¿El contrato es indefinido o temporal?",
      opciones: ["Indefinido", "Temporal"],
    },
    {
      id: 2,
      texto: "¿Existen cláusulas de confidencialidad o no competencia?",
      opciones: ["Sí", "No"],
    },
    {
      id: 3,
      texto: "¿Se ha cumplido con el período de prueba?",
      opciones: ["Sí", "No"],
    },
  ],
  "derechos de los consumidores": [
    {
      id: 1,
      texto: "¿El producto o servicio fue adquirido recientemente?",
      opciones: ["Sí", "No"],
    },
    {
      id: 2,
      texto: "¿El producto está defectuoso o el servicio fue insatisfactorio?",
      opciones: ["Defectuoso", "Insatisfactorio"],
    },
    {
      id: 3,
      texto: "¿Intentaste resolver el problema con el proveedor?",
      opciones: ["Sí", "No"],
    },
  ],
  "custodia de menores": [
    {
      id: 1,
      texto: "¿Es custodia compartida o exclusiva?",
      opciones: ["Compartida", "Exclusiva"],
    },
    {
      id: 2,
      texto: "¿Existen antecedentes de violencia o abuso?",
      opciones: ["Sí", "No"],
    },
    {
      id: 3,
      texto: "¿Ambas partes están de acuerdo con el acuerdo de custodia?",
      opciones: ["Sí", "No"],
    },
  ],
  extranjeria: [
    {
      id: 1,
      texto: "¿El trámite es de residencia o de ciudadanía?",
      opciones: ["Residencia", "Ciudadanía"],
    },
    {
      id: 2,
      texto: "¿Tienes visa vigente?",
      opciones: ["Sí", "No"],
    },
    {
      id: 3,
      texto: "¿Has tenido problemas legales en el país?",
      opciones: ["Sí", "No"],
    },
  ],
  "contratos mercantiles": [
    {
      id: 1,
      texto: "¿Es un contrato de compraventa o de servicios?",
      opciones: ["Compraventa", "Servicios"],
    },
    {
      id: 2,
      texto: "¿Existe algún tipo de garantía o fianza en el contrato?",
      opciones: ["Sí", "No"],
    },
    {
      id: 3,
      texto: "¿Las partes involucradas son empresas o individuos?",
      opciones: ["Empresas", "Individuos"],
    },
  ],
};

export default preguntasRelacionadas;
