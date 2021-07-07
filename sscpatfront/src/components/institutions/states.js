export const initialValues = {
  // data will be for ever strings
  name: "",
  responsable: "",
  phone: "",
  address: "",
};

export const validate = {
  name: {
    is_required: true,
    max_length: 255,
    min_lenght: 2,
  },
  responsable: {
    is_required: true,
    max_length: 255,
    min_lenght: 2,
  },
  phone: {
    max_length: 60,
  },
  address: {
    max_length: 255,
  },
};
