import {
UNDER_DEVELOPMENT,
CONCLUDED_SUCCESSFULLY,
ABANDONED,

} from '../../actions/types';


export const LabelStatus = (status) =>{
    switch (status) {
        case UNDER_DEVELOPMENT:
            return <span className="label bg-light-blue">En desarrollo</span>;
         case CONCLUDED_SUCCESSFULLY:
             return <span className="label bg-green">Concluido</span>;
         case ABANDONED:
             return <span className="label bg-grey">Cerrado</span>;
        default:
            return "";
    }
}   