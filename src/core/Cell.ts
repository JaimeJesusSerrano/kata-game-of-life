enum CellStatus {
	alive = 'alive',
	dead = 'dead',
}

class Cell {
	private status: CellStatus;

	constructor(status: CellStatus) {
		this.status = status;
	}

	getStatus() {
		return this.status;
	}

	setStatus(status: CellStatus) {
		this.status = status;
	}

	calculateStatusBasedOnNeighbors(neighbors: number): CellStatus {
		if (neighbors < 2) return CellStatus.dead;
		if (neighbors > 3) return CellStatus.dead;
		return undefined;
	}
}

export { Cell, CellStatus };
export default Cell;
