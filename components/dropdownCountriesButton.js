import { countries } from "react-native-international-phone-number/lib/constants/countries";
import Dropdown from "react-native-input-select";
import React, { useState } from "react";
import { gColor } from "../styles/variablesCSS";

const DropdownCountriesButton = ({ callback, ...props }) => {
  const countriesList = countries;

  const count = countriesList.map((e) => {
    return { label: `${e.flag}  ${e.name.fr}`, value: e.name.fr };
  });

  return (
    <Dropdown
      placeholder="Pays"
      options={count?.map((e) => {
        return e;
      })}
      selectedValue={props.country}
      onValueChange={(value) => props.setCountry(value)}
      dropdownStyle={{
        borderColor: gColor.mainColor,
        backgroundColor: "transparent",
      }}
    />
  );
};

export default DropdownCountriesButton;
