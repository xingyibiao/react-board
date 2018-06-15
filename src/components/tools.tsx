import * as React from 'react';
import { Button,
  Icon } from 'antd';
import { SketchPicker } from "react-color";
import './tools.css';

export default class Tools extends React.Component<ItoolProp, ItoolState> {
  constructor(prop: any) {
    super(prop)

    this.showColorBox = this.showColorBox.bind(this)
    this.colorChange = this.colorChange.bind(this)
    this.reset = this.reset.bind(this)

    this.state = {
      color: '#000',
      displayColorBox: 'none'
    }
  }
  public render() {
    return (
      <div className="toolHeader">
        <Button type="default" style={{backgroundColor: this.state.color}} className="colorBtn" onClick={this.showColorBox}/>
        <Icon type="sync" onClick={this.reset}/>
        <i className="ereaBtn" />
        <div className="tooHeader--color__box" style={{ 'display': this.state.displayColorBox}}>
          <SketchPicker 
            color={this.props.color || '#000'}
            onChangeComplete={this.colorChange}/>
        </div>
      </div>
    )
  }

  public componentDidMount() {
    const body$ = document.body
    body$.addEventListener('click', this.cancelColorCheck.bind(this))
  }

  public componentWillUnMount() {
    const body$ = document.body
    body$.removeEventListener('click', this.cancelColorCheck.bind(this))
  }

  // 点击取消显示颜色选择器
  private cancelColorCheck() {
    this.setState({
      displayColorBox: 'none'
    })
  }

  // 点击颜色选择按钮
  private showColorBox(e: React.MouseEvent<HTMLButtonElement>) {
    this.stopPropagation(e)
    this.setState({
      displayColorBox: 'block'
    })
  }

  // 阻止冒泡
  private stopPropagation(e: any) {
    e.stopPropagation()
  }

  // 点击重置
  private reset() {
    this.props.onReset()
  }

  // 选中颜色
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
  onReset: () => void
  color?: string
}

interface ItoolState {
  displayColorBox: string
  color: string
}