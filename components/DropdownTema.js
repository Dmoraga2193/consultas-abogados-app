import React, { useState, useEffect } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { View, Text, Dimensions } from "react-native";
import styles from "../styles/styles";
import ConsultarButton from "../components/ConsultarButton";

const { height } = Dimensions.get("window");

export default function DropdownTema({
  onCategoriaSelect,
  onTemaSelect,
  onSubmit,
  categoriasYTemas,
}) {
  const [openCategoria, setOpenCategoria] = useState(false);
  const [openTema, setOpenTema] = useState(false);
  const [categoriaValue, setCategoriaValue] = useState(null);
  const [temaValue, setTemaValue] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [temas, setTemas] = useState([]);

  useEffect(() => {
    if (categoriasYTemas) {
      setCategorias(
        Object.keys(categoriasYTemas).map((categoria) => ({
          label: categoria,
          value: categoria,
        }))
      );
    }
  }, [categoriasYTemas]);

  const handleCategoriaChange = (categoria) => {
    setCategoriaValue(categoria);
    onCategoriaSelect(categoria);
    if (
      categoriasYTemas &&
      categoriasYTemas[categoria] &&
      categoriasYTemas[categoria].temas
    ) {
      setTemas(
        categoriasYTemas[categoria].temas.map((tema) => ({
          label: tema,
          value: tema,
        }))
      );
    } else {
      setTemas([]);
    }
    setTemaValue(null);
  };

  const handleTemaChange = (tema) => {
    setTemaValue(tema);
    onTemaSelect(tema);
  };
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>Categoría de consulta</Text>
      <DropDownPicker
        open={openCategoria}
        value={categoriaValue}
        items={categorias}
        setOpen={setOpenCategoria}
        setValue={setCategoriaValue}
        setItems={setCategorias}
        onChangeValue={handleCategoriaChange}
        placeholder="Selecciona una categoría"
        zIndex={3000}
        zIndexInverse={1000}
        style={styles.dropdown}
        dropDownContainerStyle={[
          styles.dropdownContainer,
          { maxHeight: height * 0.3 },
        ]}
        textStyle={styles.dropdownText}
        arrowIconStyle={styles.dropdownArrow}
        dropDownDirection="BOTTOM"
      />

      {categoriaValue && (
        <>
          <Text style={[styles.label, { marginTop: 20 }]}>
            Tema de consulta
          </Text>
          <DropDownPicker
            open={openTema}
            value={temaValue}
            items={temas}
            setOpen={setOpenTema}
            setValue={setTemaValue}
            setItems={setTemas}
            onChangeValue={handleTemaChange}
            placeholder="Selecciona un tema"
            zIndex={2000}
            zIndexInverse={2000}
            style={styles.dropdown}
            dropDownContainerStyle={[
              styles.dropdownContainer,
              { maxHeight: height * 0.3 },
            ]}
            textStyle={styles.dropdownText}
            arrowIconStyle={styles.dropdownArrow}
            dropDownDirection="BOTTOM"
          />
        </>
      )}

      {categoriaValue && temaValue && (
        <ConsultarButton
          onPress={() => onSubmit(categoriaValue, temaValue)}
          title="Consultar"
          style={styles.buttonConsultar}
        />
      )}
    </View>
  );
}
