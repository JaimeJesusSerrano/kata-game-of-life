import { Cell, CellStatus } from '../core/cell';

const Alive = CellStatus.alive;
// const Dead = CellStatus.dead;

class World {
	private readonly lastYIndex: number;
	private readonly lastXIndex: number;

	constructor(private cellMatrix: Cell[][]) {
		this.cellMatrix = cellMatrix;
		this.lastYIndex = cellMatrix.length - 1;
		this.lastXIndex = cellMatrix.length - 1;
	}

	getCellMatrix = () => this.cellMatrix;

	getStringToPrint = (): string => {
		let stringToPrint = '';
		for (let x = 0; x <= this.lastXIndex; x++) {
			for (let y = 0; y <= this.lastYIndex; y++) {
				const isCellAlive = this.cellMatrix[x][y].getStatus() === Alive;
				stringToPrint += isCellAlive ? ' [O]' : ' [ ]';
			}
			stringToPrint += '\n';
		}
		return stringToPrint;
	};

	calculateNeighboursFromCoors = (x: number, y: number) => {
		let numberOfNeighbours = 0;

		/**
		 * [x-1 & y-1] [ x  & y-1] [x+1 & y-1]
		 * [x-1 &  y ] [   x y   ] [x+1 &  y ]
		 * [x-1 & y+1] [ x  & y+1] [x+1 & y+1]
		 */
		if (this.isAliveNeighboursByCoors(x - 1, y - 1)) numberOfNeighbours++;
		if (this.isAliveNeighboursByCoors(x - 1, y)) numberOfNeighbours++;
		if (this.isAliveNeighboursByCoors(x - 1, y + 1)) numberOfNeighbours++;

		if (this.isAliveNeighboursByCoors(x, y - 1)) numberOfNeighbours++;
		if (this.isAliveNeighboursByCoors(x, y + 1)) numberOfNeighbours++;

		if (this.isAliveNeighboursByCoors(x + 1, y - 1)) numberOfNeighbours++;
		if (this.isAliveNeighboursByCoors(x + 1, y)) numberOfNeighbours++;
		if (this.isAliveNeighboursByCoors(x + 1, y + 1)) numberOfNeighbours++;

		return numberOfNeighbours;
	};

	getNextCellMatrix = (): Cell[][] => {
		const newCellMatrix = [...this.cellMatrix];

		for (let x = 0; x <= this.lastXIndex; x++) {
			for (let y = 0; y <= this.lastYIndex; y++) {
				const neighbors = this.calculateNeighboursFromCoors(x, y);
				const newStatus = this.cellMatrix[x][y].calculateNextStatusBasedOnNeighbours(neighbors);
				newCellMatrix[x][y].setStatus(newStatus);
			}
		}

		return newCellMatrix;
	};

	private isCellMatrixValidByCoors = (x: number, y: number) => {
		return x >= 0 && x <= this.lastXIndex && y >= 0 && y <= this.lastYIndex;
	};

	private isAliveNeighboursByCoors = (x: number, y: number) => {
		return this.isCellMatrixValidByCoors(x, y) && this.cellMatrix[x][y].getStatus() === Alive;
	};
}

export { World };
export default World;
