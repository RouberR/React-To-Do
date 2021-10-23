
import "./Badge.scss";
const Badge = ({color, onClick, className}) => {
    return (
         <i onClick={onClick} className={`badge badge--${color} ${className}`  }></i>
    )
}
export default Badge;