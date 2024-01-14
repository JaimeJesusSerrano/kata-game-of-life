enum CellStatus {
	alive = 'alive',
	dead = 'dead',
}

class Cell {
	constructor(private status: CellStatus) {
		this.status = status;
	}

	isAlive() {
		return this.status === CellStatus.alive;
	}

	isDead() {
		return this.status === CellStatus.dead;
	}

	getStatus() {
		return this.status;
	}

	nextCellStatus(neighbours: number) {
		return new Cell(this.calculateNextStatusBasedOnNeighbours(neighbours));
	}

	/*
	 * Any live cell with fewer than two live neighbours dies, as if caused by underpopulation
	 * Any live cell with more than three live neighbours dies, as if by overcrowding
	 * Any live cell with two or three live neighbours lives on the next generation
	 * Any dead cell with exactly three live neighbours becomes a live cell
	 */
	private calculateNextStatusBasedOnNeighbours(neighbours: number): CellStatus {
		if (this.isAlive() && neighbours < 2) return CellStatus.dead;
		if (this.isAlive() && neighbours > 3) return CellStatus.dead;
		if (this.isAlive() && (neighbours === 2 || neighbours === 3)) return CellStatus.alive;
		if (this.isDead() && neighbours === 3) return CellStatus.alive;
		return this.status;
	}
}

export { Cell, CellStatus };
export default Cell;
