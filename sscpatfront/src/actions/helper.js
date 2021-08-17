import { ADMIN, TUTOR, EXTERNAL_TUTOR, STUDENT } from "./types";
import HOST from "../utils/global";

export const getNameType = (type) => {
  switch (type) {
    case ADMIN:
      return "administrador";
    case TUTOR:
      return "Tutor";
    case EXTERNAL_TUTOR:
      return "Tutor externo";
    case STUDENT:
      return "Estudiante";
    default:
      return "";
  }
};


export const getNameMonth = (month) => {
  switch (month) {
    case 1:
      return "Enero";
    case 2:
      return "Febrero";
    case 3:
      return "Marzo";
    case 4:
      return "Abril";
    case 5:
      return "Mayo";
    case 6:
      return "Junio";
    case 7:
      return "Julio";
    case 8:
      return "Agosto";
    case 9:
      return "Septiembre";
    case 10:
      return "Octubre";
    case 11:
      return "Noviembre";
    case 12:
      return "Diciembre";
    default:
      return "";
  }
};  

export const  getNameDateMonth = (date_month) =>{
  if (!date_month){
    return ""
  }
  const date = date_month.split("-")
  return (
    getNameMonth( Number(date[1]) )+ " " + date[0] 
  )
}



export const getSizeByte = (num_bytes) =>{
  if (num_bytes < 1000 ){
    return num_bytes+" Bytes";
  } else if ( num_bytes < 1000000){
    // return  Math.round((num_bytes/1024)*10)/10+" KiB";
    return  (Math.round(num_bytes/(100))/10)+" KB";
  }
  else if ( num_bytes < 100000000){
    // return  (num_bytes/1024)*10)/10+" KiB";
    return  (Math.round(num_bytes/(100000))/10)+" MB";
  }
  return null
}


const minorTen = (num)=>{
  return num < 10 ? "0"+num:num;
}

export const getDateTime = (dateTime)=>{
  const date =  new Date(dateTime)
  return (
    date.getDate() + " de " +
    getNameMonth( date.getMonth() +1).toLocaleLowerCase() + " " +
    date.getFullYear() + " " +
    minorTen(date.getHours())  + ":" +
    minorTen(date.getMinutes())  
  )
}



export const getDate = (datetimes)=>{
  const date =  new Date(datetimes)
  return (
    date.getDate() + " de " +
    getNameMonth( date.getMonth() +1).toLocaleLowerCase() + " " +
    date.getFullYear() 
  )
}


export const getTypeFile = (type) => {
  switch (type) {
    case "application/pdf":
      return "PDF";
    case "image/jpeg":
      return "JPG";
    case "image/png":
      return "PNG";
    default:
      return "";
  }
}
    


export const getTypeTracing = (type) => {
  switch (type) {
    case "COMMENT":
      return "Comentario";
    case "INSTITUTION_REPORT":
      return "Reporte de la institución";
    case "INTERNAL_TUTOR":
      return "Revisión del tutor";
    case "EXTERNAL_TUTOR":
      return "Revisión del tutor externo";
    case "Revisión de Dirección de Carrera":
      return "Revisión del tutor externo";
    default:
      return "";
  }
}



export const getTimeSendDocument = (time) => {
  switch (time) {
    case -2 :
      return "Cualquier momento";
    case -1 :
      return "Al finalizar";
    case 0 :
      return "Al inicio";

    default:
      if (time > 0 ){
        return `A los ${time} dias del inicio del proyecto`;
      }
      return "";
  }
}


export const filePath=(path)=>{
    if(!path.includes(HOST)){
      return HOST+path
    }
    return path;
}