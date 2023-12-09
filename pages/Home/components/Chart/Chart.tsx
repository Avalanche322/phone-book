import { View, Text, StyleSheet } from "react-native";
//import { DonutChart } from "react-native-circular-chart";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { COLORS } from "../../../../constants/theme";
import Title from "../../../../components/Title";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { clearData, clearError, selectStatisticsDangerousState } from "../../../../store/features/statisticsDangerousSlice";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import useShowError from "../../../../hooks/useShowError";
import { getStatisticsLevelDangerous } from "../../../../store/thunk/statisticsDangerousThunk";

const styles = StyleSheet.create({
  // @ts-ignore */
  iconChartInfo: (color) => ({
    fontSize: 16,
    color: color,
  }),
});

const Chart = () => {
  //const { width } = useWindowDimensions();
  const dispatch = useAppDispatch();
  const { stats, error } = useAppSelector(selectStatisticsDangerousState);

  const data = [
    {
      name: `${stats.dangerous}%`,
      label: "Небезпечний",
      value: Number(stats.dangerous),
      color: COLORS.red,
    },
    {
      name: `${stats.safe}%`,
      label: "Безпечний",
      value: Number(stats.safe),
      color: COLORS.green,
    },
    {
      name: `${stats.neutral}%`,
      label: "Нейтральний",
      value: Number(stats.neutral),
      color: COLORS.blue,
    },
  ];

  useFocusEffect(
    useCallback(() => {
      dispatch(getStatisticsLevelDangerous());

      return () => dispatch(clearData());
    }, [])
  );

  useShowError({ error, clearError });

  return (
    <View style={{ marginVertical: 50 }}>
      <Title text="Типологія номерів в нашій базі дaнних" />
      {/*<DonutChart
        data={data}
        strokeWidth={15}
        radius={90}
        containerHeight={105 * 2}
        containerWidth={width - 8 * 2}
        type="round"
        startAngle={0}
        endAngle={360}
        animationType="slide"
        labelValueStyle={{ display: "none" }}
        labelTitleStyle={{ fontSize: 28, fontWeight: "600" }}
      />*/}
      <View
        style={{
          flexDirection: "row",
          marginTop: 20,
          justifyContent: "space-around",
        }}
      >
        {data.map((item) => (
          <View key={item.label} style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 24, fontWeight: "600", marginBottom: 10 }}>
              {item.name}
            </Text>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <FontAwesome
                type="font-awesome"
                name="circle"
                // @ts-ignore */
                style={styles.iconChartInfo(item.color)}
              />
              <Text>{item.label}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Chart;
