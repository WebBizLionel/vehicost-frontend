import { Text, Dimensions, StyleSheet, View, Image } from "react-native";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import { gColor, stepSize } from "../styles/variablesCSS";
import { global } from "../styles/style";
import Image1 from "../assets/img/slider1.svg";

const slideData = [
  {
    bgcolor: gColor.lightColor,
    title: "Bienvenue sur Vehicost",
    text: "Votre copilote pour suivre et gérer facilement  toutes vos dépenses.",
    img: <Image1 style={{ marginBottom: 24 }} width={"100%"} height={300} />,
  },
  {
    bgcolor: gColor.lightAdditionalColor,
    text: "Conservez vos justificatifs en toute confiance !",
  },
  { bgcolor: gColor.lightColor },
];

const WelcomeSlider = () => (
  <View style={styles.container}>
    <SwiperFlatList
      autoplayLoop
      index={0}
      showPagination
      data={slideData}
      paginationDefaultColor={gColor.additionalColor}
      paginationActiveColor={gColor.mainColor}
      paginationStyle={styles.pageStyle}
      paginationStyleItem={styles.pageStyleItem}
      renderItem={({ item }) => (
        <View style={[styles.child, { backgroundColor: item.bgcolor }]}>
          <View style={styles.childWrapper}>
            {item.img && item.img}
            {item.text && (
              <Text style={{ ...styles.text, ...global.defaultH6 }}>
                {item.text}
              </Text>
            )}
          </View>
        </View>
      )}
    />
  </View>
);

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  child: { width, justifyContent: "flex-end", padding: 2 * stepSize },
  childWrapper: { paddingBottom: 44, paddingHorizontal: 16 },
  text: {
    lineHeight: 27,
    textAlign: "center",
    fontWeight: 700,
    fontStyle: "italic",
  },
  pageStyle: { paddingBottom: 24 },
  pageStyleItem: { borderRadius: 7 },
});

export default WelcomeSlider;
