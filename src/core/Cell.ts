enum CellStatus {
  alive = 'alive',
  dead = 'dead'
}

class Cell {
  private status: CellStatus

  constructor (status: CellStatus) {
    this.status = status
  }

  getStatus () {
    return this.status
  }

  setStatus (status: CellStatus) {
    this.status = status
  }
}

export {Cell, CellStatus}
export default Cell
