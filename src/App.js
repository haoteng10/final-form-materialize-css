import React, { Component } from "react";
import moment from "moment";
import "materialize-css";
import { Form, Field } from "react-final-form";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";

export default class App extends Component {
  state = {
    dueDate: null,
    dueTime: null
  };

  selectorInit = () => {
    const elems = document.querySelectorAll("select");
    M.FormSelect.init(elems, {});
  };

  datePickerInit = () => {
    const elems = document.querySelectorAll(".datepicker");
    M.Datepicker.init(elems, {
      autoClose: true,
      format: "mm/dd/yyyy",
      defaultDate: new Date(),
      disableWeekends: false,
      yearRange: 10,
      container: "body",
      onSelect: date => {
        this.setState({ dueDate: moment(date).format("MM/DD/YYYY") }); // Select date is saved into the state
      }
    });
  };

  timePickerInit = () => {
    const elems = document.querySelectorAll(".timepicker");
    const that = this;
    M.Timepicker.init(elems, {
      onCloseEnd: function() {
        that.setState({ dueTime: this.time + " " + this.amOrPm });
      }
    });
  };

  componentDidMount() {
    this.selectorInit();
    this.datePickerInit();
    this.timePickerInit();
  }

  onSubmit(values) {
    console.log(values);
    console.log(this.state);
  }

  render() {
    return (
      <div className="container">
        <Form
          onSubmit={this.onSubmit.bind(this)}
          initialValues={{ types: "homework" }}
          render={({ handleSubmit, form, submitting, pristine, values }) => (
            <div className="row">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="input-field col s12">
                    <Field name="name" component="input" type="text" />
                    <label>Name</label>
                  </div>
                </div>

                <div className="row">
                  <div className="input-field col s12">
                    <Field name="types" component="select">
                      <option value="homework">Homework</option>
                      <option value="classwork">Classwork</option>
                      <option value="extracurricular">Extracurricular</option>
                    </Field>
                    <label>Types</label>
                  </div>
                </div>

                <div className="row">
                  <div className="input-field col s6">
                    <Field
                      name="dueDate"
                      render={() => {
                        return <input type="text" className="datepicker" />;
                      }}
                    />
                    <label>Due Date</label>
                  </div>
                  <div className="input-field col s6">
                    <Field
                      name="dueTime"
                      render={() => {
                        return <input type="text" className="timepicker" />;
                      }}
                    />
                    <label>Due Time</label>
                  </div>
                </div>

                <div className="row">
                  <div className="input-field col s12">
                    <Field name="description" component="input" type="text" />
                    <label>Description</label>
                  </div>
                </div>

                <div className="row">
                  <button className="btn" type="submit">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          )}
        />
      </div>
    );
  }
}
