import {FormControl, InputLabel, FormHelperText , Select as MuiSelect } from "@material-ui/core";


export default function Select(props){

    const {id, name, variant = "outlined",label,onChange,value,items,error = null, ...others} = props;
    return <FormControl {...(error&& {error : true})} variant={variant} >
    <InputLabel htmlFor={id}>{label}</InputLabel>
    <MuiSelect
      native
      value={value}
      onChange={onChange}
      label={label}
      name = {name}
      id = {id}
    {...others}>
      <option aria-label="None" value="" />
      {items.map(item =>{console.log(item.value); return <option key = {item.id} value={item.value}>{item.label}</option>})}
     </MuiSelect>
    {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
}