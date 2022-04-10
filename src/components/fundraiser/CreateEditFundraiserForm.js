// Author: Akanksha Singh (B00892887)

import { React, Component } from "react";
import { Row, Col, Form, Button, Container } from "react-bootstrap";
import Axios from "axios";
import FundraiserStatus from "./FundraiserStatus";
import * as FundraiserConstants from "./FundraiserConstants";
import FundrasierResponsePopup from "./FundraiserResponsePopup";
import "./styles/createEditFundraiserForm.css";

export default class CreateEditFundraiserForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formField: {
                title: '',
                description: '',
                goalAmount: 0,
                image: null,
                imageName: '',
                status: 'Draft',
                activeDays: 0,
                cause: '',
            },
            formErrors: {
                title: '',
                description: '',
                goalAmount: '',
                image: '',
                activeDays: '',
                cause: '',
            },
            showCreateSuccess: false,
            showUpdateSuccess: false,
            savedFundraiser: null
        }
    }

    componentDidMount() {
        const action = this.props.action;
        const fundraiserId = this.props.fundraiserId;
        if (action === 'update') {
            const getFundraiserDetailsURI = FundraiserConstants.apiBaseUrl + `/${fundraiserId}`;            
            Axios.get(getFundraiserDetailsURI)
                .then((response) => {
                    if (response.status === 200) {
                        const fundraiser = response.data;
                        this.setState({
                            formField: fundraiser,
                        });
                    }
                })
                .catch((error) => {
                    console.log('Error in getting details of the fundraiser :' + error);
                });
        }
    }

    handleValueChange = (event) => {
        const field = event.target.name;
        const value = event.target.value;
        const fields = { ...this.state.formField };
        fields[field] = value;
        this.setState({ formField: fields })
        if (!!this.state.formErrors[field]) {
            this.setState({
                formErrors: {
                    ...this.state.formErrors,
                    [field]: ""
                }
            })
        }
    }

    handleFileUpload = (event) => {
        const { target } = event;
        const { files } = target;
        if (files && files[0]) {
            const image = files[0];
            if (!FundraiserConstants.allowedImageType.includes(image.type)) {
                this.setState({
                    formErrors: { ...this.state.formErrors, image: "Allowed image types are .jpg, .jpeg, .png, .bmp" }
                })
            }
            else if (image.size > 1000000) {
                this.setState({
                    formErrors: { ...this.state.formErrors, image: "Maximum size of the image should be 1 MB" }
                })
            }
            else {
                var reader = new FileReader();
                reader.onload = (event) => {
                    this.setState({
                        formField: {
                            ...this.state.formField,
                            image: event.target.result,
                            imageName: image.name,
                        }
                    });
                }
                reader.readAsDataURL(image)

                this.setState({
                    formErrors: {
                        ...this.state.formErrors,
                        image: ""
                    }
                })
            }
        }
    }

    validateForm = () => {      
        const form = this.state.formField;
        let errors = { ...this.state.formErrors };

        if (!form.title || form.title === '') {
            errors['title'] = 'Title cannot be blank';
        }

        if (!form.description || form.description === '') {
            errors['description'] = 'Description cannot be blank';
        }

        if (form.goalAmount <= 0) {
            errors['goalAmount'] = 'Please set the amount to raise for this fundraiser';
        }

        if (!form.image || form.image === '') {
            errors['image'] = 'Please upload an image for this fundraiser';
        }

        if (form.activeDays <= 0) {
            errors['activeDays'] = 'Please set the number of days for which this fundraiser should be active';
        }
        else if (form.activeDays > FundraiserConstants.fundraiserMaxActiveDays) {
            errors['activeDays'] = 'Fundraiser can be created for a maximum period of 180 days';
        }
        if (!form.cause || form.cause === '') {
            errors['cause'] = 'Please select a cause for this fundraiser';
        }
        this.setState({
            formErrors: errors,
        });
        return errors;
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const errors = this.validateForm();
        const numberOfErrors = Object.values(errors)
            .filter(value => value.length > 0)
            .length;
        if (numberOfErrors === 0) {
            if (this.props.action === 'create') {
                this.createFundraiser();
            }
            else if (this.props.action === 'update') {
                this.updateFundraiser()
            }
        }
    }

    updateFundraiser = () => {
        let formField = this.state.formField;
        const editedFundraiser = {
            title: formField.title,
            description: formField.description,
            goalAmount: formField.goalAmount,
            cause: formField.cause,
            activeDays: formField.activeDays,
            image: formField.image,
            imageName: formField.imageName,
        }

        const updateFundraiserUrl = FundraiserConstants.apiBaseUrl + `/${formField._id}/ngo/${formField.ngoId}`;
        Axios
            .put(updateFundraiserUrl, editedFundraiser)
            .then((response) => {
                if (response.status === 200) {                    
                    this.setState({ showUpdateSuccess: true })
                }
            })
            .catch((error) => alert("Error in updating fundraiser"));
    }

    createFundraiser = () => {
        const formField = this.state.formField;
        const createFundraiserUrl = FundraiserConstants.apiBaseUrl;
        const ngoId = FundraiserConstants.getNgoId();

        const formData = {
            title: formField.title,
            description: formField.description,
            goalAmount: formField.goalAmount,
            currency: FundraiserConstants.defaultCurrency,
            image: formField.image,
            imageName: formField.imageName,
            status: formField.status,
            cause: formField.cause,
            activeDays: formField.activeDays,
            ngoId: ngoId
        }

        Axios
            .post(createFundraiserUrl, formData)
            .then((response) => {
                if (response.status === 201) {
                    const fundraiser = response.data.data;
                    this.setState({ showCreateSuccess: true, savedFundraiser: fundraiser })
                }
            })
            .catch((error) => alert("Error in creating fundraiser, please try again"));
    }

    handleCloseCreateSuccess = () => {
        this.setState({ showCreateSuccess: false })
        this.props.onCreateSuccess(this.state.savedFundraiser._id);
    }

    handleCloseUpdateSuccess = () => {
        this.setState({ showUpdateSuccess: false })
        this.props.onUpdateSuccess(this.state.formField);
    }

    render() {
        const maxGoalAmount = FundraiserConstants.maxGoalAmount;
        const maxDescriptionLength = 1000;
        const action = this.props.action;

        const errorLabelStyle = {
            width: '100%',
            marginTop: '0.25rem',
            fontSize: '0.875em',
            color: '#dc3545'
        }

        return (
            <>
                <Container className='mb-5' id="create-update-form">
                    <Row>
                        <Col xs={0} md={3}></Col>
                        <Col xs={12} md={6}>
                            <Row className='mb-3'>
                                <Col style={{marginTop:'1rem'}}>
                                    <h5 id='create-update-form-label' style={{fontWeight: 700}}>                                        
                                        {action === 'create' && "Create Fundraiser"}
                                        {action === 'update' && "Update Fundraiser"}                                        
                                    </h5>
                                </Col>
                                <Col style={{ textAlign: "right", marginTop: '1rem', fontStyle: 'italic' }}>
                                    <FundraiserStatus statusValue={this.state.formField.status} />
                                </Col>
                            </Row>
                            <Form noValidate
                                onSubmit={this.handleSubmit}>
                                <Row className='mb-3'>
                                    <Form.Group as={Col} xs="12" md="12" controlId="validationCustom01">
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control
                                            required
                                            name="title"
                                            type="text"
                                            placeholder="Title for the fundraiser"
                                            maxLength="100"
                                            value={this.state.formField.title}
                                            onChange={this.handleValueChange}
                                            isInvalid={!!this.state.formErrors.title}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {this.state.formErrors.title}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>

                                <Row className='mb-3'>
                                    <Form.Group as={Col} xs="12" md="12" controlId="validationCustom02">
                                        <Form.Label>
                                            Description&nbsp;                                             
                                        </Form.Label>
                                        <span style={{fontWeight:'500'}}>
                                            <small><em>(Describe the purpose, beneficiaries, and other information about the fundraiser)</em></small>
                                        </span>
                                        <Form.Control
                                            required
                                            as="textarea"
                                            name="description"
                                            placeholder="Describe the purpose, beneficiaries, and other information about the fundraiser"
                                            rows="7"
                                            value={this.state.formField.description}
                                            onChange={this.handleValueChange}
                                            isInvalid={ !!this.state.formErrors.description }
                                            style={{marginTop:'0.5rem'}}
                                        />

                                        <div style={{ textAlign: 'right' }}>
                                            <span>
                                                <small>
                                                    <strong>
                                                        {maxDescriptionLength - this.state.formField.description.length}
                                                    </strong>
                                                    &nbsp;characters remaining
                                                </small>
                                            </span>
                                        </div>

                                        <Form.Control.Feedback type="invalid">
                                            {this.state.formErrors.description}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>

                                <Row className='mb-3'>
                                    <Form.Group as={Col} xs="12" md="12" controlId="validationCustom03">
                                        <Form.Label>
                                            Amount to raise:
                                        </Form.Label>
                                        &nbsp;{FundraiserConstants.defaultCurrency} {this.state.formField.goalAmount}
                                        {(action === 'create' 
                                            || (action === 'update' && this.state.formField.status === 'Pending Admin Approval')) &&
                                            <>
                                                <input
                                                    required
                                                    type="range"
                                                    name="goalAmount"
                                                    max={maxGoalAmount}
                                                    step="1000"
                                                    value={this.state.formField.goalAmount}
                                                    onChange={this.handleValueChange}                                                    
                                                    style={{width:'100%'}}
                                                />
                                                <Row>
                                                    <Col>
                                                        <span>
                                                            <small>0 {FundraiserConstants.defaultCurrency}</small>
                                                        </span>  
                                                    </Col>
                                                    <Col style={{textAlign:'right'}}>
                                                        <span>
                                                            <small>{FundraiserConstants.maxGoalAmountFormatted} {FundraiserConstants.defaultCurrency}</small>
                                                        </span>
                                                    </Col>
                                                </Row>
                                            </>
                                        }

                                        {this.state.formErrors.goalAmount &&
                                            <div style={errorLabelStyle}>
                                                {this.state.formErrors.goalAmount}
                                            </div>
                                        }
                                    </Form.Group>
                                </Row>

                                <Row>
                                    <Form.Group className="position-relative mb-3">
                                        <Form.Label>
                                            {(action === 'create' 
                                            || (action === 'update' && this.state.formField.status === 'Pending Admin Approval')) &&
                                            <label>For how many days do you want this fundraiser to be active?</label>}
                                            
                                            {(action === 'update' && this.state.formField.status !== 'Pending Admin Approval') &&
                                            <label>Duration of the fundraiser</label>}
                                            
                                            {(action === 'update' && this.state.formField.status === 'Active') &&
                                            <label>End Date</label>}
                                        </Form.Label>
                                        <Form.Control
                                            type="number"
                                            required
                                            name="activeDays"
                                            step="1"
                                            min="0"
                                            max="180"
                                            value={this.state.formField.activeDays}
                                            readOnly={this.state.formField.status === 'Active'}
                                            onChange={this.handleValueChange}
                                            isInvalid={!!this.state.formErrors.activeDays}
                                            />
                                        <Form.Control.Feedback type="invalid">
                                            {this.state.formErrors.activeDays}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>

                                <Row className='mb-3'>
                                    <Form.Group as={Col} xs="12" md="12" controlId="validationCustom03">
                                        {this.state.formField.status !== 'Active' &&
                                            <>
                                                <Form.Label>
                                                    Cause
                                                </Form.Label> 
                                                <Form.Select
                                                    name="cause"
                                                    isInvalid={!!this.state.formErrors.cause}
                                                    onChange={this.handleValueChange}
                                                    value={this.state.formField.cause}
                                                >
                                                    <option value="">Please select a cause</option>
                                                    <option value="Education">Education</option>
                                                    <option value="Animal Welfare">Animal Welfare</option>
                                                    <option value="Environment">Environment</option>
                                                </Form.Select>
                                            </>
                                        }

                                        {
                                            this.state.formField.status === 'Active' &&
                                            <Form.Label>
                                                <label>Cause:</label> <label>{this.state.formField.cause }</label> 
                                            </Form.Label> 
                                        }

                                        <Form.Control.Feedback type="invalid">
                                            {this.state.formErrors.cause}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>

                                <Row className='mb-3'>
                                    <Form.Group className="position-relative mb-3">
                                        <Form.Label>
                                            {   
                                                action === 'create' && 
                                                <label>Upload an image that relates to this fundraiser</label>
                                            }
                                            {   
                                                action === 'update' && 
                                                <label>Update the image for this fundraiser</label>                                                    
                                            }
                                        </Form.Label>
                                        <Form.Control
                                            type="file"
                                            required
                                            name="image"
                                            id="image"
                                            onChange={this.handleFileUpload}
                                            isInvalid={!!this.state.formErrors.image}
                                            accept=".jpg, .jpeg, .png, .bmp"
                                        />
                                        {action === 'update' && 
                                        <>
                                            <label>Current image:&nbsp;</label>
                                            <a href={this.state.formField.image} target="_blank" rel="noopener">
                                                {this.state.formField.imageName}
                                            </a>
                                            </>
                                        }
                                        <Form.Control.Feedback type="invalid">
                                            {this.state.formErrors.image}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>

                                <Row className='mb-4 text-center'>
                                    <Col as={Col} md="6" xs="6">
                                        <Button type="button"
                                            id='form-cancel-button'
                                            href="/ngo/fundraiser">
                                            Cancel
                                        </Button>
                                    </Col>
                                    <Col as={Col} md="6" xs="6">
                                        <Button type="submit"
                                            id='form-create-update-button' >
                                            {action === 'create' && "Create"}
                                            {action === 'update' && "Update"}
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                        <Col xs={0} md={3}></Col>
                    </Row>
                {
                this.state.showCreateSuccess && 
                <FundrasierResponsePopup type="success"
                                        show={true}
                                        message="Fundraiser created successfully!"
                                        onHide={this.handleCloseCreateSuccess}/>
               
                }
                {
                this.state.showUpdateSuccess && 
                <FundrasierResponsePopup type="success"
                                        show={true}
                                        message="Fundraiser updated successfully!"
                                        onHide={this.handleCloseUpdateSuccess}/>
               
                }
                </Container>
            </>
        );
    }
}
