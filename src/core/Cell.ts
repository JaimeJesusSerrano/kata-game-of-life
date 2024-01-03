enum CellStatus {
	alive = 'alive',
	dead = 'dead',
}

class Cell {
	private status: CellStatus;

	constructor(status: CellStatus) {
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

	calculateStatusBasedOnNeighbors(neighbors: number): CellStatus {
		if (this.isAlive() && neighbors < 2) return CellStatus.dead;
		if (this.isAlive() && neighbors > 3) return CellStatus.dead;
		if (this.isAlive() && (neighbors === 2 || neighbors === 3)) return CellStatus.alive;
		if (this.isDead() && neighbors === 3) return CellStatus.alive;
		return this.status;
	}
}

export { Cell, CellStatus };
export default Cell;
