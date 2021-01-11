import { useState } from "react";
import Controls from "./Controls";
import { Grid } from "@material-ui/core";
import SaveIcon from '@material-ui/icons/Save';


const saveUser = () => 
{
    console.log("User saved");
}

const initialData = {
    id : "",
    firstname : "",
    lastname : "",
    gender : "Female",
    email : "",
    contactno : "",
    isVerified : false
}

const menuItemsforRadio = [
    {id : "male",value : "Male",label: "Male"},
    {id : "female",value : "Female",label:"Female"},
    {id : "other",value : "Other",label: "Others"}
]


const Login = (props) => {
    const {initialValues = initialData} = props;
    const [formData, setFormData] = useState(initialValues);
    const [formError, setError] = useState({});
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(e);
        let values = {...formData,[name]:value}
        setFormData({ ...formData, [name]: value })
        console.log("State " + formData.state);
        validate(values);
    }

    const handleCheckChange = (e) => {
        const { name,checked} = e.target;
        let values = {...formData,[name]:checked}
        setFormData({ ...formData, [name]: checked })
        validate(values);
    }
    const validate = (formValues = formData) => {
        let temp = {...formError};
        temp.username = "";

        if ("firstname" in formValues) {
            temp.firstname = formValues.firstname.length < 3 ? "Length should be more than 3" : "";

        }
        if ("lastname" in formValues) {
            temp.lastname = formValues.lastname.length < 3 ? "Length shout be more than 3" : "";
        }
        if ("email" in formValues) {
            temp.email = formValues.email.length < 3 ? "Length shout be more than 3" : "";
        }

        if("contactno" in formValues){
            temp.contactno = formValues.contactno.length < 10 ? "Please enter a valid phone number": "";
        }

       
        if("isVerified" in formValues){
            temp.isVerified = formValues.isVerified ? "" : "Please check the box";
        }
      
        setError({
            ...temp
        })
        Object.values(formError).map(P => console.log("sssss" + P));
        return Object.values(temp).every(x => x === "");
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(validate());
        if(validate(formData)){
            alert("FormSuccessfully submitted");
            setFormData(initialData);
            saveUser(formData);
            props.callback();
        }else{
            alert("please enter the required details");
        }
        
    }
    return <><Controls.Form onSubmit = {handleSubmit}>
        <Grid container>
            <Grid item xs={12} sm={6}><Controls.Input variant="outlined" label="First Name" name="firstname" value={formData.firstname} onChange={handleChange}
                error={formError.firstname} />
            </Grid>

            <Grid item xs={12} sm={6}>
                <Controls.Input variant="outlined" label="Last Name" name="lastname" value={formData.lastname} onChange={handleChange}
                    error={formError.lastname} />
            </Grid>
        
            <Grid item xs = {12} sm = {12}>
                <Controls.Radio label = "Gender" name = "gender" value = {formData.gender} onChange = {handleChange} row = {true} items = {menuItemsforRadio} />
            </Grid>
            <Grid item xs={12} sm={6}>
                <Controls.Input variant="outlined" label="Email" name="email" value={formData.email} onChange={handleChange}
                    error={formError.email}  />
            </Grid>
            <Grid item xs={12} sm={6}>
                <Controls.Input variant="outlined" label="Contact No" name="contactno" value={formData.contactno} onChange={handleChange}
                    error={formError.contactno}  />
            </Grid>
        <Grid item xs = {12} sm = {12}>
            <Controls.CheckBox checked = {formData.isVerified} error = {formError.isVerified} onChange = {handleCheckChange} name = "isVerified" label = "All the above details are correct" />
        </Grid>
       
       <Grid item xs = {12} sm = {12}>
        <Controls.Button
        StartIcon={SaveIcon}
        type = "submit"
        >Save</Controls.Button>
        </Grid>

</Grid>
    </Controls.Form>
    
    </>
}

export default Login;

