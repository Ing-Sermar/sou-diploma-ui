import React, { Component } from 'react';
import './style.scss';
import user from '../../assets/imgs/user.jpg';
import Submit from '../../components/Submit';
import Dowloand from '../../components/Dowloand';
import ButtonSearch from '../../components/BtnSearch';
import Menu from '../../components/Menu';
import BtnEmail from '../../components/BtnEmail';
import Audited from '../../../src/services/diplomaApi';
import Pagination from 'react-js-pagination';

class Enable extends Component {
  state = {
    courses: [],
    search: '',
    activePage: 1,
    countPerPage: 5
  };

  async componentDidMount() {
    const res = await Audited.get('v_auditados');
    this.setState({ courses: res.data });
  }

  handleClick = id => {
    this.props.history.push(`/diploma/${id}`);
  };

  render() {
    return (
      <div>
        <div className="container">
          <h2 className="title">Nome do Curso - 1º VIA</h2>
          <fieldset>
            <Menu />
          </fieldset>
          <fieldset>
            <div class="row">
              <div className="col-md-6">
                <div class="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    id="defaultChecked2"
                  />
                  {/*<label class="custom-control-label" for="defaultChecked2">
                  Selecionar Todos
  </label>*/}
                </div>
              </div>
              {/*<div className="col-md-6">
              <div className="right" /> <Dowloand />
</div>*/}
            </div>
            <table className="table table-hover borda-tabela-titulos table2">
              <thead>
                <tr>
                  <th scope="col">Nome</th>
                  <th scope="col">RA</th>
                  <th scope="col">Curso</th>
                  <th scope="col">
                    Semestre / <br /> Ano de Ingresso
                  </th>
                  <th scope="col">
                    Semestre / <br /> de Conclusão
                  </th>
                  <th scope="col" />
                  <th scope="col" />
                </tr>
              </thead>
              <tbody>
                {this.state.courses
                  .filter(data => RegExp(this.state.search).test(data.name))
                  .filter(
                    (data, index) =>
                      index >=
                        this.state.countPerPage * (this.state.activePage - 1) &&
                      index < this.state.countPerPage * this.state.activePage
                  )
                  .map(data => (
                    <tr>
                      <td onClick={() => this.handleClick(data.id)}>
                        {data.student_name}
                      </td>
                      <td onClick={() => this.handleClick(data.id)}>
                        {data.ra_student}
                      </td>
                      <td onClick={() => this.handleClick(data.id)}>
                        {data.course_name}
                      </td>
                      <td onClick={() => this.handleClick(data.id)}>
                        {data.year_entry}
                      </td>
                      <td onClick={() => this.handleClick(data.id)}>
                        {data.year_conclusion}
                      </td>
                      <td>
                        <ButtonSearch id={data.ra_student} />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <div className="float-right">
              <div className="padding">
                <Pagination
                  activePage={this.state.activePage}
                  itemsCountPerPage={5}
                  totalItemsCount={this.state.courses.length}
                  pageRangeDisplayed={5}
                  onChange={this.handlePageChange}
                  innerClass="pagination"
                  itemClass="page-item"
                  linkClass="page-link"
                />
              </div>
            </div>
          </fieldset>
          <br />
          {/* <div className="row">
            <div className="col-md-12">
              <div className="float-right">
                <a className="selecionar" href="tg">
                IMPRIMIR
                 </a>
              </div>
            </div>
          </div> */}
        </div>
        <br />
      </div>
    );
  }
}

export default Enable;
