import * as React from 'react';
import './App.css';
import ICanvas from "./components/canvas";
import Tools from "./components/tools";

class App extends React.Component<any, IappState> {
  constructor(props: any) {
    super(props)

    this.colorChange = this.colorChange.bind(this)

    this.state = {
      color: '#000'
    }
  }

  public render() {
    return (
      <div className="App">
        <Tools onColorChange={this.colorChange} color={this.state.color}/>
        <ICanvas color={this.state.color}/>
      </div>
    );
  }

  private colorChange(color: string) {
    this.setState({color})
  }
}

export default App;

interface IappState {
  color: string
}
