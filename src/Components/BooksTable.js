import {useSelector} from "react-redux";
import Table from "./Table";
export default function BooksTable(props){
   
    const {category} = props;
    const role = useSelector(state => state.stateData.role);
    const headerGenerator = () => {

      
        if(role === "librarian"){
            if(category === "status") {
                return ["S.No","Book ID","Book Title","Status","By"]
            }if(category === "allbooks"){
                return ["S.No","Book ID","Book Title","Position","Status","By"]
            }if(category === "users"){
                return ["S.No","User ID","User Name", "Contact No","Books Status"]
            }
        }else{

            if (category === "Available"){
                return ["S.No","Book Title","Customer Reviews","Position","Status","Action"];
            }
            if(category === "Reserved"){
                return ["S.No","Book ID","Book Title","Position","Action"]
            }
            if(category === "Checked Out"){
                return ["S.No","Book ID","Book Title","Action"];
            }
           
        }
    }

    
    
    return <>
        <Table  category = {category} headers = {headerGenerator()} />
    </>
}

