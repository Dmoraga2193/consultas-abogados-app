import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { View, Text } from "react-native";
import preguntasRelacionadas from "../data/preguntasRelacionadas";
import styles from "../styles/styles";
import ConsultarButton from "./ConsultarButton";

export default function DropdownTema({ tema, setTema, handleSubmit }) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(
    Object.keys(preguntasRelacionadas)
      .sort()
      .map((tema) => ({
        label: tema.charAt(0).toUpperCase() + tema.slice(1),
        value: tema,
      }))
  );

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>Tema de consulta</Text>
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
      <ConsultarButton onPress={handleSubmit} title="Iniciar Consulta" />
    </View>
  );
}
