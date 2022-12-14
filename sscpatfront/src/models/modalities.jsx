export const GeneralModality = {
    "0":"TESIS",
    "1":"PROYECTO DE GRADO",
    "2":"EXAMEN DE GRADO",
    "3":"TRABAJO DIRIGIDO",
    "4":"EXCELENCIA",
    "6":"MODALIDAD ESPECIAL",
}



export const Modality = {

    title: "",
    description: "",
    documents: [],
    document_inscription: [],
    document_student: [],
    general_modality:"",
  
    max_author: "1",
    month_duration: "6",
    month_max_duration: "6",
    has_time_extension: false,
    month_extension: "0",
  
    has_tutors: true,
    has_review_commission:true,
    has_evaluating_court:true,
    has_institution: false,
  
    mandatory_month_report_progress_student: false,
    frequency_report_student: "1",
    mandatory_month_report_tutor: false,
    frequency_report_tutor: "1",
    mandatory_month_report_external_tutor: false,
    frequency_report_external_tutor: "1",
    mandatory_month_report_institution: false,
    frequency_report_institution: "1",
  
    send_final_document: true,
    send_abstract_final_document: true,
    send_resolution_commission_aproval: false,
  };

export const ModalityValidate = {
    title: {
      is_required: true,
      max_length: 255,
      min_lenght: 2,
    },
    description: {
      is_required: false,
      max_length: 1024,
    },
    max_author:{
      is_required:true,
      integer:true,
      max_integer:2,
      min_integer:1,
    },
    month_duration:{
      is_required:true,
      integer:true,
      max_integer:12,
      min_integer:1,
    },
    month_max_duration:{
      is_required:true,
      integer:true,
      max_integer:12,
      min_integer:1,
    },
    month_extension:{
      is_required:true,
      integer:true,
      max_integer:6,
      min_integer:0,
    }
  
  };