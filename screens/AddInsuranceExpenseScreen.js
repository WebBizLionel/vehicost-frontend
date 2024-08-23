import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { useSelector } from "react-redux";
import { url_backend } from "../configuration/config";
import React, { useState, useEffect } from "react";
import * as DocumentPicker from "expo-document-picker";
import Dropdown from "react-native-input-select";

const AddInsuranceExpenseScreen = ({ navigation }) => {
  const user = useSelector((state) => state.user.value);

  const leavePage = () => {
    navigation.navigate("Welcome");
  };

  //SELECT VEHICLE
  const [concernedVehicle, setConcernedVehicle] = useState([]);
  const [chosenVehicle, setChosenVehicle] = useState("");

  //STATES INPUT
  const [price, setPrice] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState(new Date());
  const [receipt, setReceipt] = useState("");
  const [inputDate, setInputDate] = useState(
    moment().local().format("DD-MM-YYYY")
  );
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("date");

  //STATE UPLOAD FILE
  const [uploadName, setUploadName] = useState("");
  const [uploadUri, setUploadUri] = useState("");
  const [uploadType, setUploadType] = useState("");

  const showMode = (modeToShow) => {
    setShow(true);
    setMode(modeToShow);
  };

  const handleDate = (e, selectedDate) => {
    setDate(selectedDate);
    setInputDate(moment(selectedDate).local().format("DD-MM-YYYY"));
    setShow(false);
  };

  _pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});

    if (result) {
      Alert.alert("Document séléctionné !");
    }

    setUploadName(result.assets[0].name);
    setUploadUri(result.assets[0].uri);
    setUploadType(result.assets[0].mimeType);
  };
  const photoUri = user.pic[0];
  const formData = new FormData();

  if (photoUri) {
    formData.append("fileUpload", {
      uri: uploadUri,
      name: "receiptPhoto",
      type: "image/jpeg",
    });
  }
  //
  if (receipt) {
    formData.append("fileUpload", {
      uri: uploadName,
      name: uploadName,
      type: uploadType,
    });
  }

  //FETCH
  const category = "assurance";

  formData.append("vehicle_id", chosenVehicle);
  formData.append("amount", price);
  formData.append("comment", note);
  formData.append("category", category);

  /* console.log(price, note, category) */

  const handleExpense = () => {
    fetch(`${url_backend}/vehicles/expenses/add`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.result && data.modifiedCount > 0) {
          Alert.alert("Succès", "Dépense ajoutée avec succès !");
        } else {
          Alert.alert("Erreur", data.error);
        }
      });
  };

  useEffect(() => {
    fetch(`${url_backend}/vehicles/get`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setConcernedVehicle(data.vehicles);
      });
  }, []);
  
  return (
    <View style={styles.container}>
      <View style={styles.back}>
        <TouchableOpacity onPress={() => leavePage()}>
          <Text style={styles.leave}>Retour</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.title}>
        <Text style={styles.texttitle}>Ajouter une dépense d'assurance</Text>
      </View>

      <Dropdown
        placeholder="Quel véhicule est concerné par votre dépense ?"
        options={concernedVehicle?.map((e) => {
          return { label: e.name, value: e._id };
        })}
        selectedValue={chosenVehicle}
        onValueChange={(value) => setChosenVehicle(value)}
        primaryColor={"green"}
      />

      <View style={styles.addphoto}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Camera", {
              type: "receipt",
              redirection: "Add Fuel Exprense",
            })
          }
        >
          <Text style={styles.receipt}>Ajouter un reçu</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.addupload}>
        <TouchableOpacity onPress={this._pickDocument}>
          <Text style={styles.theupload}> Joindre un fichier</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.adddate}>
        <TextInput
          onPress={() => showMode("date")}
          title="DATE"
          color="#841584"
          placeholder="dd/mm/yyyy"
          value={inputDate}
          style={styles.textdate}
        />
        {show && (
          <DateTimePicker
            value={date}
            locale={"fr"}
            mode={mode}
            display={"date"}
            is24Hour={true}
            onChange={handleDate}
          />
        )}
      </View>

      <View style={styles.addprice}>
        <TextInput
          style={styles.textprice}
          placeholder="Exemple : 50 €"
          keyboardType="numeric"
          onChangeText={(value) => setPrice(value)}
          value={price}
        />
      </View>

      <View style={styles.addnote}>
        <TextInput
          style={styles.textnote}
          placeholder="Ajouter une note à propos de cette dépense ?"
          keyboardType="text"
          onChangeText={(value) => setNote(value)}
          value={note}
        />
      </View>

      <View style={styles.button}>
        <TouchableOpacity onPress={() => handleExpense()}>
          <Text style={styles.textbtn}>Ajouter cette dépense</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddInsuranceExpenseScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  texttitle: {
    fontSize: 20,
    padding: 34,
  },
  addInsuranceReceipt: {
    fontSize: 20,
    marginBottom: 70,
    padding: 10,
    borderWidth: 1,
    borderColor: "#038737",
    marginTop: 20,
    marginBottom: 10,
  },
  textInsuranceReceipt: {
    textAlign: "center",
    padding: 20,
  },
  adddate: {
    textAlign: "center",
    padding: 20,
    borderWidth: 1,
    borderColor: "#038737",
    marginTop: 20,
    marginBottom: 10,
    alignItems: "center",
    width: "100%",
  },
  addphoto: {
    textAlign: "center",
    padding: 20,
    borderWidth: 1,
    borderColor: "#038737",
    marginTop: 20,
    marginBottom: 10,
    alignItems: "center",
    width: "100%",
  },
  addprice: {
    textAlign: "center",
    padding: 20,
    borderWidth: 1,
    borderColor: "#038737",
    marginTop: 20,
    marginBottom: 10,
    alignItems: "center",
    width: "100%",
  },
  textprice: {
    textAlign: "center",
  },
  addnote: {
    textAlign: "center",
    padding: 20,
    borderWidth: 1,
    borderColor: "#038737",
    marginTop: 20,
    marginBottom: 10,
    alignItems: "center",
    width: "100%",
  },
  button: {
    marginTop: 30,
    elevation: 8,
    backgroundColor: "#038737",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  textbtn: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
});
