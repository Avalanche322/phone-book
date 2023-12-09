import React from "react";
import { View, Text, StyleSheet } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { COLORS, BORDER_RADIUS } from "../../../../constants/theme";
import { useAppSelector } from "../../../../hooks/reduxHooks";
import { ColorByTypeDangerous, TypeDangerous } from "../../../../modals/allNumbersModal";
import {
  clearError,
  selectNumberInfoState,
} from "../../../../store/features/numberInfoSlice";
import { phoneNumberRegex, regexDate } from "../../../../constants/regex";
import useShowError from "../../../../hooks/useShowError";
import { getColorByTypeDangerous } from "../../../../helper/helper";

interface INumberInfoListItem {
  title: string;
  item: string;
  typeDangerous?: TypeDangerous;
}

interface INumberInfoList {
  title: string;
  info: Array<INumberInfoListItem>;
}

const titleLevelDangerous = "Ступінь небезпеки";

const styles = StyleSheet.create({
  title: {
    fontWeight: "600",
    fontSize: 20,
  },

  сontainer: {
    marginTop: 20,
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.xLarge,
  },

  noComments: {
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },

  noCommentsIcon: {
    backgroundColor: COLORS.secondary + "7F",
    borderRadius: 100,
    padding: 10,
    fontSize: 20,
  },

  noCommentsText: {
    lineHeight: 22,
    flex: 1,
    flexWrap: "wrap",
  },

  noNumber: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: 22,
  },
  // @ts-ignore
  statisticTitle: (index) => ({
    fontWeight: "600",
    padding: 15,
    backgroundColor: COLORS.secondary + "7F",
    borderTopRightRadius: index === 0 ? BORDER_RADIUS.xLarge : 0,
    borderTopLeftRadius: index === 0 ? BORDER_RADIUS.xLarge : 0,
  }),

  // @ts-ignore
  statisticBox: (index, lastIndex) => ({
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: index !== lastIndex ? COLORS.gray : "transparent",
  }),

  // @ts-ignore
  levelDangerous: (type: TypeDangerous) => ({
    backgroundColor: getColorByTypeDangerous(type) + '4D',
    color: getColorByTypeDangerous(type),
    borderRadius: BORDER_RADIUS.xLarge,
    textAlign: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
  }),
});

const Info = () => {
  const { data, loading, error } = useAppSelector(selectNumberInfoState);
  const numberInfo: Array<INumberInfoList> = [
    {
      title: "Оцінка",
      info: [
        {
          title: titleLevelDangerous,
          item: `${data.level_dangerous}%`,
          typeDangerous: data.typeDangerous,
        },
        {
          title: "Кількість оцінок",
          item: `${data.count_marks}x`,
        },
      ],
    },
    {
      title: "Дати",
      info: [
        {
          title: "Остання оцінка",
          item: `${data.last_date_mark}`,
        },
      ],
    },
  ];

  const getLevelDangerousColor = (item: INumberInfoListItem) => {
    return item.title === titleLevelDangerous
      ? /* 
		// @ts-ignore */
        styles.levelDangerous(item.typeDangerous)
      : {};
  };

  useShowError({ error, clearError });

  return (
    <>
		{Boolean(Object.keys(data).length) && !loading && (
			<>
			<Text style={styles.title}>Статистика</Text>
			<View style={styles.сontainer}>
				{numberInfo.map(({ title, info }, i) => (
					<View key={title}>
					<Text
						/* 
					// @ts-ignore */
						style={styles.statisticTitle(i)}
					>
						{title}
					</Text>
					{info.map((item, i) => (
						<View
							/* 
						// @ts-ignore */
							style={styles.statisticBox(i, info.length - 1)}
							key={item.title}
						>
							<Text>{item.title}</Text>
							<Text style={getLevelDangerousColor(item)}>
							{item.item}
							</Text>
						</View>
					))}
					</View>
				))}
			</View>
			</>
		)}
		{!regexDate.test(data.last_date_mark) && !loading && (
			<View style={[styles.сontainer, styles.noComments]}>
			<FontAwesome
				type="font-awesome"
				name="check"
				style={styles.noCommentsIcon}
			/>
			<Text style={styles.noCommentsText}>
				Цей номер ще ніхто не коментував. Допоможіть нам дізнатися, хто це
				є.
			</Text>
			</View>
		)}
    </>
  );
};

export default Info;
