import { Checkbox as MuiCheckBox, FormControl, FormControlLabel, FormHelperText } from "@material-ui/core";

export default function CheckBox(props){

    const {label,checked,color = "primary" ,onChange,variant = "outlined",name, error = null} = props;



    return <FormControl {...(error && {error : true})} variant = {variant}>
    <FormControlLabel
    control={<MuiCheckBox checked={checked} onChange={onChange} color={color} name={name} />}
    label={label}
  />
  {error && <FormHelperText>{error}</FormHelperText>}
  </FormControl>
}