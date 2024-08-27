import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import * as DocumentPicker from "expo-document-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { url_backend } from "../configuration/config";
import { useSelector } from "react-redux";
import Dropdown from "react-native-input-select";

const AddFuelExpenseScreen = ({ navigation }) => {
  const user = useSelector((state) => state.user.value);

  //STATE OF INPUT
  const [liter, setLiter] = useState("");
  const [receipt, setReceipt] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [comment, setComment] = useState("");

  //DATE
  const [date, setDate] = useState(new Date());
  const [inputDate, setInputDate] = useState(
    moment().local().format("DD-MM-YYYY")
  );
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("date");

  const [thevehicle, setTheVehicle] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState("");

  const [uploadName, setUploadName] = useState("");
  const [uploadUri, setUploadUri] = useState("");
  const [uploadType, setUploadType] = useState("");

  const handleDate = (e, selectedDate) => {
    setDate(selectedDate);
    setInputDate(moment(selectedDate).local().format("DD-MM-YYYY"));
    setShow(false);
  };

  const showMode = (modeToShow) => {
    setShow(true);
    setMode(modeToShow);
  };

  const leavePage = () => {
    navigation.navigate("Welcome");
  };

  //IMPORT DOCUMENT :

  _pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});

    if (result) {
      Alert.alert("Document séléctionné !");
    }

    console.log(result);

    /*  setReceipt(result.assets[0].uri) */

    setUploadName(result.assets[0].name);
    setUploadUri(result.assets[0].uri);
    setUploadType(result.assets[0].mimeType);
  };

  const photoUri = user.pic[0];
  const formData = new FormData();

  if (photoUri) {
    // console.log({coucou: photoUri});

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

  const category = "carburant";
  const expenses = { liter, price, location, comment, category };

  formData.append("vehicle_id", selectedVehicle);
  formData.append("liter", liter);
  formData.append("amount", price);
  formData.append("location", location);
  formData.append("comment", comment);
  formData.append("category", category);

  //FETCH BACKEND
  const handleSubmit = () => {
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
        if (data.result) {
          Alert.alert("Succès", "Dépense ajoutée avec succès !");
        } else {
          Alert.alert("Erreur", data.error);
        }
      });
  };

  //FETCH VEHICLE
  useEffect(() => {
    fetch(`${url_backend}/vehicles/get`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTheVehicle(data.vehicles);
      });
  }, []);
  console.log(receipt);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView style={styles.scrollView}>
          <TouchableOpacity onPress={() => leavePage()}>
            <Text style={styles.leave}>Retour</Text>
          </TouchableOpacity>

          {/* TITLE*/}
          <View style={styles.title}>
            <Text style={styles.thetitle}>
              Ajouter une dépense de carburant
            </Text>
          </View>

          <Dropdown
            placeholder="Quel véhicule est concerné par votre dépense ?"
            options={thevehicle?.map((e) => {
              return { label: e.name, value: e._id };
            })}
            selectedValue={selectedVehicle}
            onValueChange={(value) => setSelectedVehicle(value)}
            primaryColor={"green"}
          />
          <View style={styles.addreceipt}>
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

          <View style={styles.addliter}>
            <TextInput
              style={styles.textlitter}
              placeholder="Nombre de littre"
              keyboardType="numeric"
              onChangeText={(value) => setLiter(value)}
              value={liter}
            />
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

          <View style={styles.addadress}>
            <TextInput
              style={styles.textlocation}
              placeholder="Adresse de la station service"
              onChangeText={(value) => setLocation(value)}
              value={location}
            />
          </View>

          <View style={styles.addnote}>
            <TextInput
              style={styles.textnote}
              placeholder="Ajouter une note à propos de cette dépense ?"
              onChangeText={(value) => setComment(value)}
              value={comment}
            />
          </View>

          <View style={styles.btnaddexpense}>
            <TouchableOpacity onPress={() => handleSubmit()}>
              <Text style={styles.addexpense}>Ajouter cette dépense</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddFuelExpenseScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  baseText: {
    fontSize: 25,
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
  addreceipt: {
    fontSize: 20,
    marginBottom: 70,
    padding: 10,
    borderWidth: 1,
    borderColor: "#038737",
    marginTop: 20,
    marginBottom: 10,
  },
  receipt: {
    textAlign: "center",
    padding: 20,
  },
  addpicture: {
    padding: 34,
    marginTop: 20,
    marginBottom: 10,
  },
  thetitle: {
    fontSize: 20,
    padding: 34,
  },
  camera: {
    flex: 1,
    padding: 34,
  },
  snapContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 25,
    padding: 34,
  },
  addupload: {
    marginTop: 20,
    marginBottom: 10,
    padding: 1,
  },
  theupload: {
    fontSize: 15,
    color: "black",
    padding: 15,
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#038737",
  },
  textlitter: {
    textAlign: "center",
  },
  textprice: {
    textAlign: "center",
  },
  addliter: {
    padding: 34,
    padding: 20,
    borderWidth: 1,
    borderColor: "#038737",
    marginTop: 20,
    marginBottom: 10,
  },
  location: {
    padding: 34,
    borderWidth: 1,
    borderColor: "#038737",
  },
  addprice: {
    padding: 34,
    padding: 20,
    borderWidth: 1,
    borderColor: "#038737",
    marginTop: 20,
    marginBottom: 10,
  },
  btnaddexpense: {
    marginTop: 30,
    elevation: 8,
    backgroundColor: "#038737",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  addexpense: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  addadress: {
    padding: 34,
    padding: 20,
    borderWidth: 1,
    borderColor: "#038737",
    marginTop: 10,
    marginBottom: 10,
  },
  addnote: {
    padding: 34,
    padding: 20,
    borderWidth: 1,
    borderColor: "#038737",
    marginTop: 10,
    marginBottom: 10,
  },
});
