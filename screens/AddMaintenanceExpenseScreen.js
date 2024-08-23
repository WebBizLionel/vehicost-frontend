import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Modal,
  Pressable,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import React, { useState, useEffect } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import Dropdown from "react-native-input-select";
import moment from "moment";
import { useSelector } from "react-redux";
import { url_backend } from "../configuration/config";
import * as DocumentPicker from "expo-document-picker";

const AddMaintenanceExpenseScreen = ({ navigation }) => {
  const user = useSelector((state) => state.user.value);

  //STATE
  const [date, setDate] = useState(new Date());
  const [inputDate, setInputDate] = useState(
    moment().local().format("DD-MM-YYYY")
  );
  const [receipt, setReceipt] = useState("");
  const [maintenance, setMaintenance] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [note, setNote] = useState("");
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("date");
  const [modalVisible, setModalVisible] = useState(false);

  //SELECT VEHICLE
  const [concernedVehicle, setConcernedVehicle] = useState([]);
  const [chosenVehicle, setChosenVehicle] = useState("");

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
      setModalVisible(!modalVisible);
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
  const category = "maintenance";

  formData.append("vehicle_id", chosenVehicle);
  formData.append("amount", price);
  formData.append("comment", note);
  formData.append("category", category);
  formData.append("type", maintenance);
  formData.append("location", location);

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
        console.log(data.modifiedCount);
        if (data.result && data.expense.modifiedCount > 0) {
          Alert.alert("Succès", "Dépense ajoutée avec succès !");
        } else {
          Alert.alert("Erreur", data.error);
        }
      });
  };

  const leavePage = () => {
    navigation.navigate("Welcome");
  };

  const handlePhoto = () => {
    setModalVisible(!modalVisible);
    navigation.navigate("Camera", {
      type: "receipt",
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView style={styles.scrollView}>
          <TouchableOpacity onPress={() => leavePage()}>
            <FontAwesome
              name="arrow-left"
              size={40}
              color="rgba(220, 86, 78, 1)"
            />
          </TouchableOpacity>
          <View style={styles.title}>
            <Text style={styles.texttitle}>
              Ajouter une dépense d'entretien
            </Text>
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
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Sélectionnez une option :</Text>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <View style={styles.option}>
                    <View style={styles.addphoto}>
                      <TouchableOpacity onPress={() => handlePhoto()}>
                        <Text style={styles.receipt}>Ajouter un reçu</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.addupload}>
                      <TouchableOpacity onPress={this._pickDocument}>
                        <Text style={styles.theupload}>
                          Joindre un fichier
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <Text style={styles.textClose}>X</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
          <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.textStyle}>
              Joindre un fichier liée à ma dépense
            </Text>
          </Pressable>

          <View style={styles.choiceMaintenance}>
            <Dropdown
              placeholder="Nature de l'entretien"
              options={[
                { label: "Batterie", value: "Batterie" },
                { label: "Vidange", value: "Vidange" },
                {
                  label: "Remplacement des filtres",
                  value: "Remplacement des filtres",
                },
              ]}
              selectedValue={maintenance}
              onValueChange={(value) => setMaintenance(value)}
              primaryColor={"green"}
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
              placeholder="Adresse de la prestation"
              onChangeText={(value) => setLocation(value)}
              value={location}
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

          <View style={styles.btnaddexpense}>
            <TouchableOpacity onPress={() => handleExpense()}>
              <Text style={styles.textbtn}>Ajouter cette dépense</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddMaintenanceExpenseScreen;

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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 50,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "80%",
  },
  option: {
    flexDirection: 'row',      
    justifyContent: 'space-between', 
    alignItems: 'center', 
  },
  button: {
    padding: 25,
    elevation: 2,
    margin: 1,
  },
  buttonOpen: {
    backgroundColor: "#038737",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  textClose: {
    color: "black",
    marginTop: 30,
    textAlign: "center",
  },
  receipt: {
    marginHorizontal: 20, 
    borderWidth: 1,
    borderColor: "#038737",
    padding: 10,
  },
  theupload: {
    marginHorizontal: 20, 
    borderWidth: 1,
    borderColor: "#038737",
    padding: 10,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
    color: "rgba(220, 86, 78, 1)",
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
  addadress: {
    padding: 34,
    padding: 20,
    borderWidth: 1,
    borderColor: "#038737",
    marginTop: 10,
    marginBottom: 10,
  },
  location: {
    padding: 34,
    borderWidth: 1,
    borderColor: "#038737",
  },
  addnote: {
    padding: 34,
    padding: 20,
    borderWidth: 1,
    borderColor: "#038737",
    marginTop: 10,
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
  textbtn: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
});
