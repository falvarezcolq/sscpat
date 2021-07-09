import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getNameType } from "../../actions/helper";
import { listUsers } from "../../actions/users";
import NavPagination from "./NavPagination";
import Config from "../../utils/Config";
import PropTypes from "prop-types";
import { validateInput } from "../../utils/Validations";

  
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

class TutorTable extends React.Component {
  static propTypes = {
    users: PropTypes.object.isRequired,
  };

  state = {
    search: "",
    size: 10,
    type: "",
    ordering:null,
    page:1
  };

  errors = {};

  onChange = (e) => {
    const { name, value: newValue, type } = e.target;
    const value = type === "number" ? +newValue : newValue;
    this.setState({ [name]: value });
    const error = validateInput(name, value, validate[name]);
    this.errors={...this.errors,[name]:error }
  };

  componentDidMount() {
    this.props.listUsers(Config.UserApiUrl);
  }

  onSubmit=(e)=>{
    e.preventDefault()
    if (Object.values(this.errors).every((t) => t === null)) {
      this.props.listUsers(Config.UserApiUrl,this.state);
    }
  }

  render() {
    const users = this.props.users;
    const { results, size } = users;
    return (
      <div className="row">
        <form onSubmit={this.onSubmit}>
        <div className="col-lg-6">
          <div className="form-group">
            <label>Buscar</label>
            <div className="form-line">
              <input
                type="text"
                className="form-control"
                name="search"
                placeholder="Buscar..."
                onChange={this.onChange}
                value={this.state.search}
              ></input>
            </div>
            {this.errors.search ? (
              <label id="search-error" className="error" htmlFor="search">
                {this.errors.search}
              </label>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="col-lg-2">
          <div className="form-group">
            <label>Cantidad</label>
            <div className="form-line">
              <input
                type="number"
                className="form-control"
                name="size"
                onChange={this.onChange}
                value={this.state.size}
              ></input>
            </div>
            {this.errors.size ? (
              <label id="size-error" className="error" htmlFor="username">
                {this.errors.size}
              </label>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="col-lg-2">
          <div className="form-group">
            <label htmlFor="type">Tipo de usuario</label>
            <select
              name="type"
              className="form-control show-tick"
              tabIndex="-98"
              onChange={this.onChange}
            >
              <option value="">Todos</option>
              <option value="ADMIN">Administrador</option>
              <option value="TUTOR">Tutor</option>
              <option value="EXTERNAL_TUTOR">Tutor Externo</option>
              <option value="STUDENT">Estudiante</option>
            </select>
          </div>
        </div>
        <div className="col-lg-2">
          <div className="form-group">
            <button type="submit" className="btn btn-primary pt-20">
              Buscar
            </button>
          </div>
        </div>
        </form>
        <div className="col-lg-12">
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
                          <i class="material-icons">edit</i>
                          </Link>

                          <Link to={Config.aUsersUrl+"/"+user.id+"/password"} className={user.is_active ? "col-green" :"col-red"} title="Permiso de acceso al sistema"> 
                            <i class="material-icons">security</i> 
                            <span className="font-10"> {user.is_active ? "" : "Sin acceso"}</span>
                          </Link>

                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <NavPagination
                  context={users.context}
                  loadList={this.props.listUsers}
                />
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.users,
});

const mapDispatchToProps = {
  listUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(TutorTable);
