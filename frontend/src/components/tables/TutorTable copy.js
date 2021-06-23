import React from "react";
import { connect } from "react-redux";
// import { getNameType } from "../../actions/helper";
import { listTutors } from "../../actions/tutors";
import NavPagination from "./NavPagination";
import Config from "../../utils/Config";
import PropTypes from "prop-types";
import { validateInput } from "../../utils/Validations";
import { Link } from "react-router-dom";



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

class UserTable extends React.Component {
  static url = Config.TutorApiUrl;
  static propTypes = {
    tutors: PropTypes.object.isRequired,
  };

  state = {
    search: "",
    size: 10,
    type: "",
    ordering: null,
    page: 1,
  };

  errors = {};

  onChange = (e) => {
    const { name, value: newValue, type } = e.target;
    const value = type === "number" ? +newValue : newValue;
    this.setState({ [name]: value });
    const error = validateInput(name, value, validate[name]);
    this.errors = { ...this.errors,[name]: error, };
  };

  componentDidMount() {
    this.props.listTutors(this.url);
  }

  onSubmit = (e) => {
    e.preventDefault();
    if (Object.values(this.errors).every((t) => t === null)) {
      this.props.listTutors(this.url, this.state);
    }
  };

  percentBar = (total, peding_review) => {
    if (total === 0) {
      return (
              
          <div className="progress">
            <div
              className="progress-bar bg-green"
              role="progressbar"
              style={{ width: "100%" }}
              aria-valuenow="25"
              aria-valuemin="0"
              aria-valuemax="100"
            >
              0/0
            </div>
          </div>

      );
    }
    const percentage = ((total - peding_review) / total) * 100;

    return (
        <div
          className="progress"
          style={{ margin: "0", width: "80%", display: "inline-block" }}
        >
          <div
            className={
              percentage < 30
                ? "progress-bar bg-red"
                : percentage < 60
                ? "progress-bar bg-orange"
                : "progress-bar bg-green"
            }
            style={{ width: percentage + "%" }}
          >
            {total - peding_review}/{total}
          </div>
        </div>
    );
  };

  render() {
    const tutors = this.props.tutors;
    const { results, size } = tutors;
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
                      <th>Total</th>
                      <th>Concluidos</th>
                      <th>Abandonados</th>
                      <th>
                        Proyectos <br /> actuales
                      </th>
                      <th>Proyetos revisados</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((user) => (
                      <tr key={user.id}>
                        <td>
                          <Link to={Config.aTutorUrl + "/" + user.id}>
                            {user.abbreviation} {user.last_name}{" "}
                            {user.last_name2} {user.first_name}
                          </Link>
                        </td>
                        <td>{user.total}</td>
                        <td>{user.complete}</td>
                        <td>{user.abandoned}</td>
                        <td>{user.under_development}</td>
                        <td>
                          {this.percentBar(
                            user.under_development,
                            user.pending_reviews
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <NavPagination
                  context={tutors.context}
                  loadList={this.props.listTutors}
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
  tutors: state.tutors,
});

const mapDispatchToProps = {
  listTutors,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserTable);
