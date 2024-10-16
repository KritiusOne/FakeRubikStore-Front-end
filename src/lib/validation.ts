export const nameRegEx =  /^[a-zA-Z ]{3,30}$/
export const emailRegEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
export const passwordRegEx = /^(?=.*[a-z])(?=.*[0-9])(?=.{8,}$)[a-zA-Z0-9!@#$%^&*()_+=-]{8,}$/;
export const onlyNumbersRegEx = /\d{10}$/
export const sitesRegEx = /^[0-9a-zA-ZáéíóúñÁÉÍÓÚÑ#.-\s\-]{2,}$/;
export const onlyNumberAnyExtention = /\d$/