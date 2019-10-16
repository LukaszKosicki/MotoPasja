
export const email = /^[a-z\d]+[\w\d.-]*@(?:[a-z\d]+[a-z\d-]+\.){1,5}[a-z]{2,6}$/i;
export const password = /^(?!.*[\s])(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*\\\|])(?=.{8,})/;
export const nullOrEmpty = /^(?!.*[\s])(?=.*[a-zA-Z0-9])/;