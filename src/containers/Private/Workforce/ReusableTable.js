import React, { useState, Fragment } from "react";
import { Formik, Form, Field } from "formik";
import { Table, Button, Icon, Modal, Row, Col, Select } from 'antd';
import { withRouter, Link } from "react-router-dom";

import { StateProvider } from "fe-context";

// COMPONENTS
import { InputText, CheckBox } from "fe-components";
import { SelectLocal } from "fe-components/Formik/Select";

// HELPERS
import validationSchema from "./validationSchema";

const columns = [
	{
		title: 'Employee ID',
		dataIndex: 'employee_id',
		sorter: (a, b) => a.username.length - b.username.length,
	},
	{
		title: 'Employee Name',
		dataIndex: 'employee_name',
		width: '18%',
		sorter: (a, b) => a.name.length - b.name.length,
	},
	{
		title: 'Department',
		dataIndex: 'department',
		sorter: (a, b) => a.role.length - b.role.length,
	},
	{
		title: 'Mobile Number',
		dataIndex: 'mobile_number',
		width: '18%',
		sorter: (a, b) => a.email.length - b.email.length,
	},
	{
		title: 'Immidiate Supervisor',
		dataIndex: 'immidiate_supervisor',
		width: '20%',
		sorter: (a, b) => a.age - b.age,
	},
	{
		title: 'Action',
		key: 'operation',
		width: '10%',
		render: () => <div>
			<span>
				<Button type="circle" icon="edit" style={{ color: 'rgb(106, 14, 152)', fontSize: 18 }} />
				{/* <Icon type="edit" style={{ color: 'rgb(106, 14, 152)', fontSize: 18 }}/> */}
			</span>
		</div>,
	},

];

const data = [];
for (let i = 0; i < 1000; i++) {
	data.push({
		key: `${i}-idkotest`,
		employee_id: `22-${i}1851`,
		employee_name: `Rogeli${i} Me`,
		department: `TECH`,
		mobile_number: `09${i}4563645`,
		immidiate_supervisor: `Trixie Frias ${i}`
	});
}

const ReusableTable = () => {
	const { profile } = StateProvider.useStateValue();

	const [state, setState] = useState({ selectedRowKeys: [], loading: false, visible: false, })
	const { loading, selectedRowKeys } = state;

	const rowSelection = {
		selectedRowKeys,
		onChange: onSelectChange,
	};

	const hasSelected = state.selectedRowKeys && state.selectedRowKeys.length > 0;

	function start() {
		setState({ ...state, loading: true });
		// ajax request after empty completing
		setTimeout(() => {
			setState({
				...state,
				selectedRowKeys: [],
				loading: false,
			});
		}, 1000);
	};

	function onSelectChange(selectedRowKeys) {
		console.log('selectedRowKeys changed: ', selectedRowKeys);
		setState({ ...state, selectedRowKeys });
	};

	function showModal() {
		setState({
			...state,
			visible: true,
		});
	};

	function handleCancel() {
		setState({ ...state, visible: false });
	};

	const handleCreateUser = async (values, actions) => {
    // const success = await fnCreateLED({ values, actions });
		// if(success) props.history.push("/led-screens");
		setState({ ...state, loading: true });
			setTimeout(() => {
				setState({ ...state, loading: false, visible: false });
			}, 3000);
		console.log(values,'valueessss')
  }
	return (
		<div>
			<div style={{ marginTop: 15, fontWeight: 600 }}>Worfkforce / Employee Management</div>
			<div style={{ marginTop: 15, marginBottom: 15 }}>
				<div className="table-create-user" style={{ display: 'flex', justifyContent: 'space-between' }}>
					<div className="table-create-user">
						<Button
							icon="delete"
							type="primary"
							onClick={start} disabled={!hasSelected} loading={loading}
						>
							Delete {selectedRowKeys && selectedRowKeys.length > 1 && 'all'}
						</Button>
						<span style={{ marginLeft: 8 }}>
							{hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
						</span>
					</div>
					<Button
						type="primary"
						icon="user"
						loading={state.lodaing}
						onClick={showModal}
					>
						Create Employee
					</Button>
				</div>
			</div>

			<Table
				columns={columns}
				dataSource={data}
				pagination={{ pageSize: 10 }} scroll={{ y: 280 }}
				onChange={(paras) => { console.log(paras, 'testss') }}
				rowSelection={rowSelection}
			/>

			{
				state.visible && (
					<div>
						<Modal
							visible={state.visible}
							style={{ top: '40px' }}
							title="User Information"
							// onOk={handleOk}
							onCancel={handleCancel}
							footer={false}
							width="600px"
						>
							<Formik
								enableReinitialize={true}
								initialValues={{
									username: "",
									first_name: "",
									last_name: "",
									role: "",
									email: "",
									confirm_password: "",
									password: ""
								}}
								validationSchema={validationSchema}
								onSubmit={handleCreateUser}
								render={(props) =>
									<Form noValidate>
											<Fragment>
												<Row>
													<Col span={10}>
														<Field
															name="username"
															type="text"
															placeholder="Username "
															customlabel="Username"
															component={InputText}
															isRequired
														/>
													</Col>
												</Row>
												<Row style={{ marginTop: 10 }}>
													<Col span={10} style={{ marginRight: 10 }}>
														<Field
															name="first_name"
															type="text"
															placeholder="User First name"
															customlabel="User First Name"
															component={InputText}
															isRequired
														/>
													</Col>
													<Col span={10} style={{ marginRight: 10 }}>
														<Field
															name="last_name"
															type="text"
															placeholder="User last name"
															customlabel="User Last Name"
															component={InputText}
															isRequired
														/>
													</Col>
													<Col span={2} style={{ marginRight: 10 }}>
														<Field
															name="middleinitial"
															type="text"
															placeholder="M.I"
															customlabel="M.I"
															component={InputText}
														/>
													</Col>
												</Row>
												<Row style={{ marginTop: 10 }}>
													<Col span={10} style={{ marginRight: 10 }}>
														<Field
															name="email"
															type="text"
															placeholder="E-mail Address"
															customlabel="E-mail Address"
															component={InputText}
															isRequired
														/>
													</Col>
													<Col span={10} style={{ marginRight: 10 }} className="select-field-container">
														<Field
															name        = "role"
															label       = "Role"
															placeholder = "Role"
															component   = { SelectLocal }
															isRequired
															className		= "select-field"
															options     = {{
																"super_admin": "Super Admin",
																"admin": "Admin",
																"user": "User"
															}}
															defaultValue = {props.values.smtp_protocol}
														/>
													</Col>
												</Row>
												<Row style={{ marginTop: 10 }}>
													<Col span={10} style={{ marginRight: 10 }}>
														<Field
															name="password"
															type="text"
															placeholder="Password"
															customlabel="Password"
															component={InputText}
															isRequired
														/>
													</Col>
													<Col span={10} style={{ marginRight: 10 }}>
														<Field
															name="confirm_password"
															type="text"
															placeholder="Confirm Password"
															customlabel="Confirm Password"
															component={InputText}
															isRequired
														/>
													</Col>
												</Row>
												<div className="footer-modal-buttons">
													<div style={{fontSize: 11}}>Field with asterisk (*) are required field</div>
													<div>
														<Button key="back" onClick={handleCancel}>
															Cancel
														</Button>,
														<Button key="submit" htmlType="submit" type="primary" loading={state.loading}>
															Create Employee
														</Button>
													</div>
												</div>
											</Fragment>
									</Form>		
								}
							/>
						</Modal>
					</div>
				)
			}
		</div>
	)
};

export default ReusableTable;