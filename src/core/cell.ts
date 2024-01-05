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

	setStatus(status: CellStatus) {
		this.status = status;
	}

	/*
	 * Any live cell with fewer than two live neighbours dies, as if caused by underpopulation
	 * Any live cell with more than three live neighbours dies, as if by overcrowding
	 * Any live cell with two or three live neighbours lives on the next generation
	 * Any dead cell with exactly three live neighbours becomes a live cell
	 */
	calculateStatusBasedOnNeighbours(neighbors: number): CellStatus {
		if (this.isAlive() && neighbors < 2) return CellStatus.dead;
		if (this.isAlive() && neighbors > 3) return CellStatus.dead;
		if (this.isAlive() && (neighbors === 2 || neighbors === 3)) return CellStatus.alive;
		if (this.isDead() && neighbors === 3) return CellStatus.alive;
		return this.status;
	}
}

export { Cell, CellStatus };
export default Cell;
