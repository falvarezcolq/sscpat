
const initialRules={
    is_boolean:false,
    is_required:false,
    integer:false,
    double:false,
    date:false,
    pattern:null,
    email:false,
    pattern_email:/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    format_date:'dd-mm-aaaa',
    max_decimal:null,
    min_decimal:null,
    max_integer:null,
    min_integer:null,
    positive:false,
    only_character:false,
    min_length:null,
    max_length:null,
    min_date:null,
    max_date:null,
    select:false,
    not_valid_value:""
}

export const validateInput = (fieldName, fieldValue,rules)=>{
    
    const state = {
        ...initialRules,
        ...rules
    } 

    // console.log(`${fieldName} : ${typeof(fieldValue)} : ${fieldValue}`)

    

    if( state.is_boolean && typeof fieldValue !== "boolean"){
      return `El valor no esta booleano`;
    }

    fieldValue = ""+fieldValue;

    if( state.is_required && fieldValue.trim() === '' ){

        return `Este campo es requerido`;
    }
    if( state.pattern && !state.pattern.test(fieldValue)){
        return 'Caracteres invalidos'
    }

    if( state.min_length && state.min_length > fieldValue.trim().length ){
        return `Este campo necesita tener al menos ${state.min_length} caracteres`;
    }

    if( state.max_length && state.max_length < fieldValue.trim().length ){
        return `Este campo debe tener hasta ${state.max_length} caracteres`;
    }

  

    // email 
    if(state.email){
        if(!state.pattern_email.test(fieldValue)){
            return "Ingrese correo válido porfavor"
        }
    }

    // email 
    if(state.select){
        if(state.not_valid_value ===  fieldValue){
            return "Seleccione un opcion válida"
        }
    }

    if(state.integer){
       
        if(isNaN(Number(fieldValue))){
            return "Ingrese un número"
        }

        
        if(state.max_integer && state.max_integer < Number(fieldValue) ){
            return `El número ingresado no debe ser mayor a ${state.max_integer}`
        }
        if(state.min_integer && state.min_integer > Number(fieldValue) ){
            return `El número ingresado no debe ser menor a ${state.min_integer}`
        }
    }

    return null
}



export const formGeneralValidation = (values,validate,setErrors,) => {
    const formValidate = Object.keys(values).reduce(
      (acc, key) => {
        const newError = validateInput(key, values[key], validate[key]);
        const newTouched = { [key]: true };
        return {
          errors: {
            ...acc.errors,
            ...(newError && { [key]: newError }),
          },
          touched: {
            ...acc.touched,
            ...newTouched,
          },
        };
      },
    //   {
    //     errors: { ...errors },
    //     touched: { ...touched },
    //   }
    );
    setErrors(formValidate.errors);
    // setTouched(formValidate.touched);

    // return if has an error in form
    return Object.values(formValidate.errors).every((t) => t === null);
  };


export const loadGeneralErrorForm = (res,setErrors) => {
    const serverErrorValidate = Object.keys(res).reduce(
      (acc, key) => {
        const textError = res[key].join();
        const newTouched = { [key]: true };
        return {
          errors: {
            ...acc.errors,
            [key]: textError,
          },
          touched: {
            ...acc.touched,
            ...newTouched,
          },
        };
      },
    //   {
    //     errors: { ...errors },
    //     touched: { ...touched },
    //   }
    );
    setErrors(serverErrorValidate.errors);
    // setTouched(serverErrorValidate.touched);
  };