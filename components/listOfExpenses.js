import { StyleSheet, Text, View } from "react-native";
import moment from "moment";

const ListOfExpenses = ({ item }) => {
  const { amount, category, type, createdAt } = item;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.row}>
          <Text style={styles.title}>{category.toUpperCase()}</Text>
          <View style={styles.showPrice}>
            <Text style={styles.price}>{amount}€</Text>
          </View>

          {type && <Text style={styles.type}>{type}</Text>}
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.text}>
            {moment(createdAt).local().format("DD/MM/YYYY")}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ListOfExpenses;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 25,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 14,
    alignItems: "center",
    marginTop: 10,
  },
  header: {
    marginBottom: 16,
    alignItems: "left",
  },
  row: {
    flexDirection: "row",
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#038737",
  },
  content: {
    alignItems: "left",
  },
  price: {
    marginHorizontal: 110,
    fontSize: 15,
    fontWeight: "bold",
  },
  text: {
    fontSize: 15,
    color: "#444444",
  },
});
