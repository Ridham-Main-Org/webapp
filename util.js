const validateEmptyAndType = (value) => {
    if (!value || typeof (value) !== 'string') {
        return false;
    }
    return true;
}

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const isEmailValid = (value) => {
    return emailRegex.test(value);
}

const alphabetRegex = /^[a-zA-Z ]+$/;
const isNameValid = (value) => {
    if (!alphabetRegex.test(value)) {
        console.log("it cam here in isname")
        return false;  
    }
    return true;
}

module.exports = { validateEmptyAndType, isEmailValid, isNameValid }