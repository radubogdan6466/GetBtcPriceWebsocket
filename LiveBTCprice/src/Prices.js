import React, { Component } from 'react';

let wsBTC = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@trade');

class Prices extends Component {
state = {
price: '',
countdownTime: 4,
priceEvolution: '',
storedPrice: null,
diff:'',
points: '',
pcts: ''
};

componentDidMount() {
wsBTC.onmessage = (event) => {
let stockObject = JSON.parse(event.data);
let price = parseFloat(stockObject.p).toFixed(2);
this.setState({ price });
if (this.state.storedPrice) {
    let priceEvolution = ((price - this.state.storedPrice) / this.state.storedPrice * 10000).toFixed(1);
    this.setState({ priceEvolution });
    //console.log(priceEvolution);
    //console.log({price})
}    

}
}

startStream = () => {
    const intervalId = setInterval(() => {
    this.setState(prevState => {
    return { countdownTime: prevState.countdownTime - 1 };
    });
    if (this.state.countdownTime === 0) {
    clearInterval(intervalId);
    wsBTC.close();
    }
    this.setState({ diff:(this.state.price - this.state.storedPrice).toFixed(2)})
    console.log('Actual Price: '+ this.state.price);
    console.log('Stored Price: '+ this.state.storedPrice);
    console.log('Result:'+ (this.state.price - this.state.storedPrice).toFixed(2));
    //console.log(this.setState.priceEvolution);
    let points = this.state.priceEvolution;
    this.setState({points});
    console.log('points ' + this.state.priceEvolution)
    let pcts = this.state.points;
    this.setState({pcts: pcts = pcts + this.state.points});
    console.log('pctsv'+ pcts);

    }, 1000);

    };
    storePrice = () =>{
        this.setState({ storedPrice: this.state.price });
        //afis pret consola
        console.log({ storedPrice: this.state.price })
    }
    
    /*
    math = () =>{
        //this.setState({ storedPrice: this.state.price });
        this.setState({ diff:(this.state.price - this.state.storedPrice).toFixed(2)})
        console.log('Actual Price: '+ this.state.price);
        console.log('Stored Price: '+ this.state.storedPrice);
        console.log('Result:'+ (this.state.price - this.state.storedPrice).toFixed(2));

        //console.log(diff);
    }
    */
    
    render() {
        return (
        <div className='Container'>
            <div>
            <p>What does it do? <br/>
                1)Price start<br/>
                2)Store Price btn have a formula which convert % into number(like a score)<br/>
                3)Start btn for countdown to -1
            </p>
            </div>
                  <div id="col-sm-4">
                  <h1>Stored price: {this.state.storedPrice}</h1>
                  <h1>RESULT:{this.state.priceEvolution}</h1>
                  </div>

            <div className='button-start' id="col-sm-4" padding="10px">
                <button onClick={this.startStream}>Start</button>
                <button onClick={this.storePrice}>Store Price</button>
            </div>

            <div className='Countdown'>
                countdown:  {this.state.countdownTime}
            </div>

            <div className='Price'>

                <h2>BTC/USDT:</h2>  <h2>{this.state.price}</h2>

            </div>
        </div>
        )
        }
        }
        
        export default Prices