import { ScrollView, Text, View, StyleSheet, TextInput } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useState } from "react";

import { BORDER_RADIUS, COLORS } from "../../constants/theme";
import Comment from "./components/Comment";
import Button from "../../components/Button";
import { useRoute } from "@react-navigation/native";
import { PhonePageRouteProp } from "../../modals/phonePageModal";

const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
    backgroundColor: COLORS.lightWhite,
    flex: 1,
  },
  
  сontainer: {
    marginTop: 50,
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.xLarge,
  },

  statisticTitle: {
    fontWeight: "600",
    padding: 15,
    fontSize: 18,
    textAlign: "center",
    backgroundColor: COLORS.secondary + "7F",
    borderTopRightRadius: BORDER_RADIUS.xLarge,
    borderTopLeftRadius: BORDER_RADIUS.xLarge,
  },

  textEditor: {
    padding: 10,
    backgroundColor: COLORS.lightWhite,
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: BORDER_RADIUS.xLarge,
    lineHeight: 28,
	 marginBottom: 20
  },
});

const RequestDeleteComment = () => {
	const route = useRoute();
	const { number } = route.params as never;
	const [text, setText] = useState<string>("");

	const handleSubmit = () => {
		console.log("Допустимо ти відправив на мою пошту :)")
	}
  
  return (
    <ScrollView style={styles.wrapper}>
      <View style={{ alignItems: "center", marginBottom: 30, rowGap: 10 }}>
        <Text style={{ fontSize: 18, fontWeight: "600" }}>
          Запит на усунення коментаря про номер:
        </Text>
        <Text
          style={{
            borderRadius: BORDER_RADIUS.xLarge,
            backgroundColor: COLORS.secondary + "7F",
            padding: 10,
            fontSize: 22,
            fontWeight: "600",
          }}
        >
          {number}
        </Text>
      </View>

      <Comment />
      <View style={styles.сontainer}>
        <Text style={styles.statisticTitle}>
          Запит на усунення коментаря про номер
        </Text>

        <View style={{ padding: 15 }}>
          <Text style={{ marginBottom: 20, lineHeight: 22 }}>
            У наступній формі дайте коротке обґрунтування, чому слід видалити
            цей коментар. Дякую за те що ви з нами
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 10,
              marginBottom: 10,
            }}
          >
            <Text style={{ fontWeight: "600" }}>Причина видалення: </Text>
            {text.length <= 50 ? (
              <Text
                style={{
                  borderRadius: BORDER_RADIUS.xLarge,
                  backgroundColor: COLORS.red + "4D",
                  color: COLORS.red,
                  paddingVertical: 5,
                  paddingHorizontal: 8,
                }}
              >
                {50 - text.length}
              </Text>
            ) : (
              <FontAwesome
                name="check"
                style={{
                  borderRadius: BORDER_RADIUS.xLarge,
                  backgroundColor: COLORS.green + "4D",
                  color: COLORS.green,
                  paddingVertical: 8,
                  paddingHorizontal: 8,
                }}
              />
            )}
          </View>
          <TextInput
            multiline
            numberOfLines={4}
            maxLength={250}
            onChangeText={(text) => setText(text)}
            style={styles.textEditor}
          />
          <Button
            text="Відправити"
            onPress={handleSubmit}
            disabled={text.length <= 50}
          />
        </View>
      </View>
    </ScrollView>
  );
}
 
export default RequestDeleteComment;