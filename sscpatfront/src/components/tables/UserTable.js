import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getNameType } from "../../actions/helper";
import { listUsers,removeUser } from "../../actions/users";
import NavPagination from "./NavPagination";
import Config from "../../utils/Config";
import { validateInput } from "../../utils/Validations";
import InputForm from "../atoms/InputForm";
import Spinner from "../atoms/Spinner";
import Modal from "../atoms/Modal";
  
const initialValues = {
  search: "",
  size: 10,
  type: "",
  ordering: null,
  page: 1,
};

const validate = {
  search: {
    max_length: 50,
  },
  size: {
    integer: true,
    max_integer: 100,
    min_integer: 1,
  },
};


const modalValues = {
  title: "",
  message: "",
  cancel: null,
  confirm: null,
  accept: null,
};

const TutorTable = (props) => {
  const { users ,listUsers, removeUser} = props;
  const { results } = users;

  const url = Config.UserApiUrl;

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [modal, setModal] = useState(modalValues);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loadingTable, setLoadingTable] = useState(false);
 

  useEffect(() => {
    loadTable();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loadTable = async () => {
    setLoadingTable(true);
    loadData(url,null);
  };

  const loadData = async (url,value) => {
    await listUsers(url,value);
    setLoadingTable(false);
  };

  const onChange = (e) => {
    const { name, value: newValue, type } = e.target;
    const value = type === "number" ? +newValue : newValue;
    setValues({ ...values, [name]: value });
    const error = validateInput(name, value, validate[name]);
    setErrors({ ...errors, [name]: error });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (Object.values(errors).every((t) => t === null)) {
      setLoadingTable(true)
      loadData(url,values);
    }
  };

  const removeObject = (id) => {
    const obj = results.find((obj) => obj.id === id);
    setModal({
      title: "¿Borrar usuario del sistema?",
      message: (<p>Confirmar que desea eliminar el usuario <strong>{obj.first_name + " " + obj.last_name + " " +obj.last_name2} </strong></p>),
      cancel: setOpenModal.bind(this, false),
      confirm: deleteObj.bind(this, obj),
    });
    setOpenModal(true);
  };

  const deleteObj = async (obj) => {
    setIsDeleting(true);
    const res = await removeUser(obj.id);
    setIsDeleting(false);
    if (res) {
      setModal({
        title: "Restricción",
        message: (<>
          <p>No se puede eliminar el Usuario: <strong>{obj.first_name + " " + obj.last_name + " " +obj.last_name2}</strong></p>
          <p style={{color:"red"}}>{res.detail}</p>
          </>),
        cancel: null,   
        confirm: null,  
        accept: setOpenModal.bind(this, false),
      });
    } else {
      setOpenModal(false);
    }
  };

    return (
      <>
      <div className="row">
        <form onSubmit={onSubmit}>
        <div className="col-md-6 col-lg-8 m-0 p-0">
          <InputForm
            name="search"
            value={values.search}
            error={errors.search}
            placeholder="Buscar tutor.. "
            onChange={onChange}
            title="Buscar:"
            touched={true}
          />
        </div>
        <div className="col-md-4 col-lg-2 m-0 p-0">
                <InputForm
                  type="number"
                  name="size"
                  value={values.size}
                  touched={true}
                  error={errors.size}
                  placeholder="Cantidad"
                  onChange={onChange}
                  title="Cantidad"
                />
        </div>

        <div className="col-md-4 col-lg-2 m-0 p-0">
          <div className="form-group">
            <label htmlFor="type">Tipo de usuario</label>
            <select
              name="type"
              className="form-control show-tick"
              tabIndex="-98"
              onChange={onChange}
            >
              <option value="">Todos</option>
              <option value="ADMIN">Administrador</option>
              <option value="TUTOR">Tutor</option>
              <option value="EXTERNAL_TUTOR">Tutor Externo</option>
              <option value="STUDENT">Estudiante</option>
            </select>
          </div>
        </div>
        <div className="col-md-4 col-lg-2 m-0 p-0">
          <div className="form-group">
            <button type="submit" className="btn btn-primary pt-20">
              Buscar
            </button>
          </div>
        </div>
        </form>

        {loadingTable ? (
          <div className="align-center"><Spinner /> </div>
        ) : (

        <div className="col-md-12 col-lg-12 m-0 p-0">
          <div className="table-responsive">
            {results.length === 0 ? (
              <h2> No hay usuarios </h2>
            ) : (
              <>
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Apellidos y Nombres</th>
                      <th>Tipo de usuario</th>
                      <th>Registrado</th>
                      <th>Opciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((user) => (
                      <tr key={user.id}>
                        <td>
                          {user.last_name} {user.last_name2} {user.first_name} 
                        </td>
                        <td>{getNameType(user.type)}</td>
                        <td>{new Date(user.created_at).toLocaleString()}</td>
                        <td>
                          <Link to={Config.aUsersUrl+"/"+user.id} className="" title="Editar información del usuario" style={{"paddingRight":"5px"}}> 
                          <i className="material-icons">edit</i>
                          </Link>

                          <Link to={Config.aUsersUrl+"/"+user.id+"/password"} className={user.is_active ? "col-green" :"col-red"} title="Permiso de acceso al sistema"> 
                            <i className="material-icons">security</i> 
                            <span className="font-10"> {user.is_active ? "" : "Sin acceso"}</span>
                          </Link>

                            <button
                              className="btn-link col-grey"
                              onClick={removeObject.bind(this, user.id)}
                              title="Borrar"
                            >
                              <i className="material-icons">delete</i>
                            </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <NavPagination
                  context={users.context}
                  loadList={listUsers}
                />
              </>
            )}
          </div>
        </div>
        )}
      </div>

      <Modal open={openModal}>
        <div className="modal-header">
          <h4 className="modal-title" id="defaultModalLabel">
            {modal.title}
          </h4>
        </div>
        <div className="modal-body">{modal.message}</div>
        <div className="modal-footer">
          {modal.cancel && (
            <button
              type="button"
              className="btn btn-link waves-effect pull-left"
              onClick={modal.cancel}
            >
              Cancelar
            </button>
          )}

          {modal.confirm && (
            <button
              type="button"
              className="btn btn-success waves-effect"
              onClick={modal.confirm}
            >
              {isDeleting ? "Eliminando...":"Confirmar"}
            </button>
          )}

          {modal.accept && (
            <button
              type="button"
              className="btn btn-primary waves-effect"
              onClick={modal.accept}
            >
              Aceptar
            </button>
          )}
        </div>
      </Modal>
      </>
    );
}

const mapStateToProps = (state) => ({
  users: state.users,
});

const mapDispatchToProps = {
  listUsers,
  removeUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(TutorTable);
