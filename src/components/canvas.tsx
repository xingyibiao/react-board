import { MouseEvent } from 'react';
import * as React from 'react';
import './canvas.css';

export default class ICanvas extends React.Component<IcanvasProps, IcanvasState> {
  public canvas: HTMLCanvasElement | null = null
  private ctx: CanvasRenderingContext2D | null = null
  private isDrawing: boolean = false
  constructor(prop: IcanvasProps) {
    super(prop)

    this.move = this.move.bind(this)
    this.beginDraw = this.beginDraw.bind(this)
    this.endDraw = this.endDraw.bind(this)
    this.clear = this.clear.bind(this)

    this.state = {
      beginDraw: false,
    }
  }
  
  /**
   * render
   */
  public render() {
    return (
      <div>
        <canvas className="canvas"
          onMouseMove={this.move}
          onMouseDown={this.beginDraw}
          onMouseUp={this.endDraw}
          id="canvas"
         />
         <button onClick={this.clear}>清空</button>

      </div>
    )
  }

  /**
   * CompomentDid
   */
  public componentDidMount() {
    this.canvas = document.getElementById('canvas') as HTMLCanvasElement
    this.ctx = this.canvas.getContext('2d')
    // this.ctx.stroke
  }

  private beginDraw() {
    if (this.ctx) {
      this.ctx.moveTo(0, 0)
      this.ctx.beginPath()
      this.ctx.strokeStyle = this.props.color
    }
    this.isDrawing = true
  }

  private endDraw(e: MouseEvent) {
    this.isDrawing = false
    this.draw(e.clientX - this.canvasLeft, e.clientY - this.canvasTop)
  }


  //
  private move(e: MouseEvent) {
    // console.log(this.canvas && this.canvas.offsetTop, this.canvas && this.canvas.getBoundingClientRect().top)
    if (this.isDrawing) {
      this.draw(e.clientX - this.canvasLeft, e.clientY - this.canvasTop)
    }
  }

  private get canvasTop() {
    return this.canvas ? this.canvas.getBoundingClientRect().top : 0
  }

  private get canvasLeft() {
    return this.canvas ? this.canvas.getBoundingClientRect().left: 0
  }

  private draw(x: number, y: number) {
    if (this.ctx && this.isDrawing) {
      this.ctx.lineTo(x, y)
      this.ctx.stroke()
      // console.log(x, y)
    } else if (this.ctx && !this.isDrawing) {
      this.ctx.lineTo(x, y)
      this.ctx.stroke()
      // console.log(x, y)
      this.ctx.closePath()
    }
  }

  private clear() {
    if (this.ctx && this.canvas) {
      this.ctx.clearRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight)

    }
  }
}

interface IcanvasState {
  beginDraw: boolean,
}

interface IcanvasProps {
  color: string
}