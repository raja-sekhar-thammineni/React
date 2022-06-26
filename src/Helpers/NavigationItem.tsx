import {ReactNode} from 'react';
import { Link } from 'react-router-dom';
export interface INavigationItemProps {
children:ReactNode,
className:string,
url?:string
}

const  NavigationItem =({children,className,url="#"}: INavigationItemProps) =>{
  return (
    
      <li className={className}><Link to={url}>{children}</Link></li>
    
  );
}

export default NavigationItem;
