import { useEffect } from "react";
import { useAppDispatch } from "./reduxHooks";
import { Alert } from "react-native";
import { AnyAction } from "@reduxjs/toolkit";

type Props = {
	error: string;
	clearError: () => AnyAction;
}

const useShowError = ({error, clearError}: Props) => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (error.length) {
			Alert.alert("Error", error, [
			{ text: "Close", onPress: () => dispatch(clearError()) },
			]);
		}
	}, [error]);
}
 
export default useShowError;