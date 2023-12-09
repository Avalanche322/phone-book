import { ColorByTypeDangerous, TypeDangerous } from "../modals/allNumbersModal";

export function getColorByTypeDangerous (type: TypeDangerous) {
	return type === TypeDangerous.Safe
    ? ColorByTypeDangerous.Safe
    : type === TypeDangerous.Neutral
    ? ColorByTypeDangerous.Neutral
    : type === TypeDangerous.Dangerous
    ? ColorByTypeDangerous.Dangerous
    : ColorByTypeDangerous.Safe;
}
export function getTextByTypeDangerous (type: TypeDangerous) {
	return type === TypeDangerous.Safe
    ? "Безпечний"
    : type === TypeDangerous.Neutral
    ? "Нейтральний"
    : type === TypeDangerous.Dangerous
    ? "Небезпечний"
    : "";
}
