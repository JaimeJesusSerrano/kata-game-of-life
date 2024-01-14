import { Cell, CellStatus } from '../core/cell';

const Alive = CellStatus.alive;

class World {
	private readonly lastYIndex: number;
	private readonly lastXIndex: number;

	constructor(private cellMatrix: Cell[][]) {
		this.cellMatrix = cellMatrix;
		this.lastYIndex = cellMatrix.length - 1;
		this.lastXIndex = cellMatrix.length - 1;
	}

	calculateNeighboursFromCoors = (x: number, y: number): number => {
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

	getCellMatrix = () => this.cellMatrix;

	getNextGeneration = (): World => {
		const newCellMatrix: Cell[][] = [];

		for (let x = 0; x <= this.lastXIndex; x++) {
			newCellMatrix[x] = [];
			for (let y = 0; y <= this.lastYIndex; y++) {
				const neighbors = this.calculateNeighboursFromCoors(x, y);
				newCellMatrix[x][y] = this.cellMatrix[x][y].nextCellStatus(neighbors);
			}
		}

		return new World(newCellMatrix);
	};

	toString = (): string => {
		let stringToPrint = '';
		const aliveCell = ' [O]';
		const deadCell = ' [ ]';
		const endOfLine = '\n';

		for (let x = 0; x <= this.lastXIndex; x++) {
			for (let y = 0; y <= this.lastYIndex; y++) {
				const isCellAlive = this.cellMatrix[x][y].getStatus() === Alive;
				stringToPrint += isCellAlive ? aliveCell : deadCell;
			}
			stringToPrint += endOfLine;
		}
		return stringToPrint;
	};

	private isAliveNeighboursByCoors = (x: number, y: number): boolean => {
		return this.isCellMatrixValidByCoors(x, y) && this.cellMatrix[x][y].getStatus() === Alive;
	};

	private isCellMatrixValidByCoors = (x: number, y: number): boolean => {
		return x >= 0 && x <= this.lastXIndex && y >= 0 && y <= this.lastYIndex;
	};
}

export { World };
export default World;
