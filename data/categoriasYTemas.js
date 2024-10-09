const categoriasYTemas = {
  Civil: {
    temas: [
      "Juicio de arriendo",
      "Juicio de precario",
      "Juicio ejecutivo cobranza",
      "Juicio ejecutivo embargo",
      "Ley de quiebras (declararse en quiebra)",
      "Tercerias",
      "Posesión efectiva",
      "Escrituras Públicas",
    ],
    precioBase: 150000,
    precioAdicional: 0,
  },
  Familia: {
    temas: [
      "Demanda de alimentos mayor de edad",
      "Demanda de alimentos menor de edad",
      "Demanda de violencia intrafamiliar",
      "Divorcio de mutuo acuerdo",
      "Demanda de divorcio unilateral",
      "Divorcio mas compensacion economica",
      "Cuidado personal",
      "Relacion directa y regular",
      "Juicios de paternidad",
      "Juicio autorizacion salida del pais",
    ],
    preciosEspecificos: {
      "Demanda de alimentos mayor de edad": {
        precioBase: 350000,
        precioAdicional: "200000 + valor juicio",
      },
      "Demanda de alimentos menor de edad": {
        precioBase: 300000,
        precioAdicional: "200000 + valor juicio",
      },
      "Demanda de violencia intrafamiliar": {
        precioBase: 350000,
        precioAdicional: "200000 + valor juicio",
      },
      "Divorcio de mutuo acuerdo": { precioBase: 300000, precioAdicional: 0 },
      "Demanda de divorcio unilateral": {
        precioBase: 350000,
        precioAdicional: 0,
      },
      "Divorcio mas compensacion economica": {
        precioBase: 200000,
        precioAdicional: "15% del juicio",
      },
      "Cuidado personal": {
        precioBase: 350000,
        precioAdicional: "200000 + valor juicio",
      },
      "Relacion directa y regular": {
        precioBase: 350000,
        precioAdicional: "200000 + valor juicio",
      },
      "Juicios de paternidad": { precioBase: 400000, precioAdicional: 0 },
      "Juicio autorizacion salida del pais": {
        precioBase: 250000,
        precioAdicional: 0,
      },
    },
  },
  Laboral: {
    temas: [
      "Despidos injustificados",
      "Auto despidos",
      "Derechos fundamentales",
      "Cobranza judicial de prestaciones laborales",
      "Despidos indirectos",
    ],
    precioBase: 0,
    precioAdicional: "20-25% del juicio",
  },
};

export default categoriasYTemas;
