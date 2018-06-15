import * as React from 'react';
import './App.css';
import ICanvas from "./components/canvas";
import Tools from "./components/tools";

class App extends React.Component<any, IappState> {
  private canvas: ICanvas | null = null
  constructor(props: any) {
    super(props)

    this.colorChange = this.colorChange.bind(this)
    this.reset = this.reset.bind(this)

    this.state = {
      color: '#000'
    }
  }

  public render() {
    return (
      <div className="App">
        <Tools onColorChange={this.colorChange} color={this.state.color} onReset={this.reset} />
        <ICanvas color={this.state.color} ref={(c) => this.canvas = c}/>
      </div>
    );
  }

  private colorChange(color: string) {
    this.setState({color})
  }

  private reset() {
    if (this.canvas) {
      this.canvas.clear()
    }
  }
}

export default App;

interface IappState {
  color: string
}
