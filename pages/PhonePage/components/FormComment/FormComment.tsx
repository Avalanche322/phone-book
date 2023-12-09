import { View, Text, StyleSheet, TextInput } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRoute } from "@react-navigation/native";

import { COLORS, BORDER_RADIUS } from "../../../../constants/theme";
import { PhonePageRouteProp } from "../../../../modals/phonePageModal";
import Button from "../../../../components/Button";
import { ICommentRequest } from "../../../../modals/numberInfoModal";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { addComment, addNumberHistory, getNumberInfo } from "../../../../store/thunk/numberInfoThunk";
import { TypeDangerous } from "../../../../modals/allNumbersModal";
import { clearDataComments, selectCommentsState, selectNumberInfoState } from "../../../../store/features/numberInfoSlice";
import { regexDate } from "../../../../constants/regex";

const styles = StyleSheet.create({
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
  },
});

const data = [
  {
    label: "Небезпечний",
    value: TypeDangerous.Dangerous,
    color: COLORS.red,
  },
  {
    label: "Нейтральний",
    value: TypeDangerous.Neutral,
    color: COLORS.blue,
  },
  {
    label: "Безпечний",
    value: TypeDangerous.Safe,
    color: COLORS.green,
  },
];

const FormComment = () => {
  const dispatch = useAppDispatch();
  const route = useRoute<PhonePageRouteProp>();
  const { number } = route.params;
  const { loading } = useAppSelector(selectCommentsState);
  const { data: numberInfo } = useAppSelector(selectNumberInfoState);


  const [selected, setSelected] = useState<TypeDangerous>(
    TypeDangerous.Neutral
  );
  const [text, setText] = useState<string>("");

  const RenderItem = (item: any) => {
    return (
      <View
        style={{
          padding: 15,
          borderBottomWidth: 1,
          borderColor: COLORS.gray,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          key={item.value}
          style={{
            color: item.value === selected ? COLORS.primary : undefined,
          }}
        >
          {item.label}
        </Text>
        {item.value === selected && (
          <FontAwesome
            type="font-awesome"
            name="check"
            style={{ fontSize: 18, color: COLORS.primary }}
          />
        )}
      </View>
    );
  };

  const onSubmit = () => {
    const data: ICommentRequest = {
      number,
      comment: text,
      typeDangerous: Number(selected),
    };
    dispatch(addComment(data))
      .unwrap()
      .then(() => {
        setSelected(TypeDangerous.Neutral);
        setText("");
		  if (!regexDate.test(numberInfo.last_date_mark)) {
        dispatch(addNumberHistory(number));
        dispatch(getNumberInfo(number))
          .unwrap()
          .then(() => {
            dispatch(clearDataComments()); // очистити коментарі при створенні номеру телефону
          });
      }
      });
  };

  return (
    <View style={styles.сontainer}>
      <Text style={styles.statisticTitle}>Додати коментар</Text>
      <View style={{ padding: 15 }}>
        <TextInput
          multiline
          numberOfLines={4}
          maxLength={250}
          value={text}
          onChangeText={(text) => setText(text)}
          placeholder={`Ваш досвід з номером ${number}`}
          style={styles.textEditor}
        />
        <Dropdown
          data={data}
          labelField="label"
          valueField="value"
          value={selected}
          onChange={({ value }) => setSelected(value)}
          renderItem={RenderItem}
          style={{
            backgroundColor: data.find((i) => i.value === selected)?.color,
            borderRadius: BORDER_RADIUS.xLarge,
            marginVertical: 15,
            padding: 2,
            paddingHorizontal: 15,
          }}
          iconStyle={{ tintColor: COLORS.white, width: 25, height: 25 }}
          selectedTextStyle={{ color: COLORS.white }}
          itemContainerStyle={{ paddingHorizontal: 8 }}
          disable={loading}
        />
        <Button
          disabled={!Boolean(text.trim().length) || loading}
          text="Відправити"
          onPress={onSubmit}
        />
      </View>
    </View>
  );
};

export default FormComment;
