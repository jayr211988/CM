import React, { Fragment, Component } from "react";
import { Formik, Field, Form } from "formik";
import { InputSearch } from "fe-components";
import { ISearchForm } from "../interface";

class Search extends Component {
  render() {
    return (
      <Formik
        initialValues={{
          search: "",
        }}
        onSubmit={(values) => {
          // tslint:disable-next-line: no-console
          console.log("TCL: Search -> render -> values", values);
          this.props.tableRef.fetch({ search: values.search });
        }}
        enableReinitialize={true}
        render={(props) => (
          <Fragment>
            <Form>
              <Field
                name="search"
                type="text"
                component={InputSearch}
                icon="search"
                style={{ maxWidth: 220 }}
                onSearch={() => props.submitForm()}
              />
            </Form>
          </Fragment>
        )}
      />
    );
  }
}

export default Search;
