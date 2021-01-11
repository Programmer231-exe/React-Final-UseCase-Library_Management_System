import { FormControlLabel } from "@material-ui/core";
import {FormControl , FormLabel,RadioGroup,Radio as MuiRadio } from "@material-ui/core";

export default function Radio(props){

    const {label,name,value,onChange,items,...others} = props;

    return  <FormControl component="fieldset">
    <FormLabel component="legend">{label}</FormLabel>
    <RadioGroup aria-label={name} name={name} value={value} onChange={onChange} {...others}>

    {items.map(item =><FormControlLabel key= {item.id} value = {item.value} control = {<MuiRadio/>} label = {item.label} />)}
    </RadioGroup>
</FormControl>
}