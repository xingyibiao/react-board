import * as React from 'react';
import { SketchPicker } from "react-color";

export default class Tools extends React.Component<ItoolProp, object> {
  constructor(prop: any) {
    super(prop)

    this.colorChange = this.colorChange.bind(this)

    this.state = {
      color: '#000'
    }
  }
  public render() {
    return (
      <div>
        <SketchPicker 
          color={this.props.color || '#000'}
          onChangeComplete={this.colorChange}/>
      </div>
    )
  }

  private colorChange(color: any) {
    console.log(color)
    this.setState({
      color: color.hex
    })

    this.props.onColorChange(color.hex)
  }
}

interface ItoolProp {
  onColorChange: (color: string) => void
  color?: string
}