const getAll = () => {
  const encoded = localStorage.getItem('savedData')
  return encoded ? JSON.parse(encoded) : []
};
const getFiltered = () => {
  const encoded = localStorage.getItem('savedFData')
  return encoded ? JSON.parse(encoded) : []
};

const getOnlyWithErrors = () => {
  const encoded = localStorage.getItem('onlyWithErrors')
  return encoded ? JSON.parse(encoded) : false
};

/** @var { DataState } */
const STATE = () => ({
  all: getAll(),
  filtered: getFiltered(),
  onlyWithErrors: getOnlyWithErrors(),
});

export default STATE;
