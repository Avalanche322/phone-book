import { View } from "react-native";
import SortComments from "./components/SortComments";
import List from "../../../../components/List";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import ListItem from "./components/ListItem";
import {
  clearDataComments,
  clearErrorComments,
  selectCommentsPaginationState,
  selectCommentsState,
} from "../../../../store/features/numberInfoSlice";
import { getComments } from "../../../../store/thunk/numberInfoThunk";
import useShowError from "../../../../hooks/useShowError";
import { useRoute } from "@react-navigation/native";
import { PhonePageRouteProp } from "../../../../modals/phonePageModal";
import { TypeDangerous } from "../../../../modals/allNumbersModal";

const Comments = () => {
  const dispatch = useAppDispatch();
  const route = useRoute<PhonePageRouteProp>();
  const { number } = route.params;

  const [page, setPage] = useState<number>(1);
  const { items, loading, error } = useAppSelector(selectCommentsState);
  const { totalPage } = useAppSelector(selectCommentsPaginationState);

  const [selected, setSelected] = useState<TypeDangerous>(
    TypeDangerous.Default
  );

  const handleSelectSort = (type: TypeDangerous) => {
    if (selected === type) {
      setSelected(TypeDangerous.Default);
    } else {
      setSelected(type);
    }
  };

  const handleClearData = () => {
    dispatch(clearDataComments());
  };

  useEffect(() => {
    const data = {
      page,
      number,
      typeFilter: selected,
    };
    dispatch(getComments(data));

    return () => {
      dispatch(clearDataComments());
    };
  }, [page, selected]);

  useShowError({ error, clearError: clearErrorComments });

  return (
    <View style={{ marginBottom: 50 }}>
      <SortComments handleSelectSort={handleSelectSort} selected={selected} />
      <View style={{ marginTop: 20 }}>
        <List
          items={items}
          page={page}
          setPage={setPage}
          loading={loading}
          totalPage={totalPage}
          clearData={handleClearData}
          keyExtractor={({ id }) => id}
          renderItem={({ item, index }) => (
            <ListItem item={item} index={index} lastIndex={items.length - 1} />
          )}
        />
      </View>
    </View>
  );
};

export default Comments;
