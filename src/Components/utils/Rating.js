import StarIcon from '@material-ui/icons/Star';
import StarOutlineIcon from '@material-ui/icons/StarOutline';

export default function rating(props){
    const {review} = props;

    let reviews = parseInt(review);
        switch(reviews){
            case 1: 
                return <><StarIcon /><StarOutlineIcon /><StarOutlineIcon /><StarOutlineIcon /><StarOutlineIcon /></>
            case 2: 
                return <><StarIcon/><StarIcon/><StarOutlineIcon /><StarOutlineIcon /><StarOutlineIcon /></>
            case 3: 
                return <><StarIcon/><StarIcon/><StarIcon /><StarOutlineIcon /><StarOutlineIcon /></>
            case 4: 
                return <><StarIcon/><StarIcon/><StarIcon /><StarIcon /><StarOutlineIcon /></>
            case 5:
                return <><StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon /></>
            
            }
    
}