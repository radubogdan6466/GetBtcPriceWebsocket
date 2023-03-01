import React, {Component} from 'react';
class Navbar extends Component{
    render(){
        return(
                //react have built in <nav> for navbar
            <nav className="text-center fixed-top" style={{background:"black", color:"white"}}>
                <h2>Live bitcoin price from binance</h2>
                <p>It was done out of curiosity</p>
            </nav>

        )
    }
}
export default Navbar;