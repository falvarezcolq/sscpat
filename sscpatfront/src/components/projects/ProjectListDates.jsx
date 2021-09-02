import React from "react";
import { connect } from "react-redux";
// import { getNameType } from "../../actions/helper";
import { getDateLogs } from "../../actions/projects";

import { messageWarning } from "../../actions/messages";
// import NavPagination from "./NavPagination";
import NavPagination from "../tables/NavPagination";
import Config from "../../utils/Config";
import PropTypes from "prop-types";
import { validateInput } from "../../utils/Validations";
import { Link } from "react-router-dom";
import Spinner from "../atoms/Spinner";
import { getDate } from "../../actions/helper";


class ProjectListDates extends React.Component {
 
  static propTypes = {
    students: PropTypes.object.isRequired,
    project: PropTypes.object.isRequired,
  };

  state = {
    search: "",
    size: 10,
    type: "",
    ordering: null,
    page: 1,
    loading: false,
  };

  errors = {};

  
  componentDidMount() {
   
    this.props.getDateLogs(this.props.id);
  }

  onSubmit = (e) => {
    e.preventDefault();
    if (Object.values(this.errors).every((t) => t === null)) {
      this.props.listStudents(this.url, this.state);
    }
  };

  save_authors = async () => {
    const project = this.props.project;
    const authors = this.props.authors;
    if (project) {
     
      if (authors.length <= project.modality.config.max_author) {
        const users = Array.from(authors, (obj) => obj.id);
        this.setLoading(true);
        await this.props.add_authors(project.id, { users: users });
        this.setLoading(false);
      } else {
        this.props.messageWarning({
          detail:
            "¡No esta permitido registrar mas de " +
            project.modality.config.max_author +
            " autor(es)  en esta modalidad!",
        });
      }
    }
  };

  render() {
    const datelogs = this.props.datelogs;
    
    return (

          <div className="row">
            <div className="col-lg-12">
              <div
                className="table-responsive"
                style={{ boxShadow: "0px 0px 2px 5px rgba(0, 0, 0, 0.2)" }}
              >
                {datelogs.length === 0 ? (
                  <h3> No se tiene cambios  de las fechas del proyecto</h3>
                ) : (
                  <>
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Realizado en </th>
                          <th>Fechas anteriores</th>
                          <th>Fechas nuevas del proyecto</th>
                          <th>Realizado por</th>
                        </tr>
                      </thead>
                      <tbody>
                        {datelogs.map((date) => (
                          <tr key={date.id}>
                            <td>{getDate(date.created_at)}</td>
                            <td>{getDate(date.date_init_old)+ " / "+getDate(date.date_end_old)}</td>
                            <td>{getDate(date.date_init)+ " / "+getDate(date.date_end)}</td>
                            <td>
                              {date.created_by && (
                                <>
                                 {date.created_by.last_name} {date.created_by.last_name2}{" "}
                                {date.created_by.first_name}
                                </>
                              )}
                            </td>

                          
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </>
                )}
              </div>
            </div>
          </div>
     
    );
  }
}

const mapStateToProps = (state) => ({
  datelogs: state.projects.datelogs,
});

const mapDispatchToProps = {
  getDateLogs,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectListDates);
