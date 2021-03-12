//Реализация кастомных валидаторов: обязательное поле и максимальная длина символов

export const requiredField = value => {
    if (value) return undefined
    return "Field is required"
}
export const maxLengthCustom = (maxLength) => (value) => {
    if (value === undefined) return undefined
    else if (value === null) return undefined
    else if (value.length > maxLength) return `Max length is ${maxLength} symbols`
}
