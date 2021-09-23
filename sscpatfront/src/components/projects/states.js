export const initialValues = {
    student: "",
    modality: "",
    academic_period:"",
    title_academic_project:"",
    // date_init:"2020-01-01",
    // date_end:"2020-06-01",
    tutors: [],
    external_tutors: [],
    tutors_review_commission:[],
    tutors_evaluating_court:[],
    institution:"",
};

export const validate = {
    title_academic_project: {
    is_required: true,
    max_length: 1024,
    min_lenght: 10,
  },
  modality: {
    is_required: true,
  },
  academic_period: {
    is_required: true,
  },
};
