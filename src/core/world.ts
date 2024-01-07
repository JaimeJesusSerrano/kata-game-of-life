import { cloneDeep } from 'lodash';

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

	getCellMatrix = () => this.cellMatrix;

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

	getNextGenerationCellMatrix = (): Cell[][] => {
		const newCellMatrix = cloneDeep(this.cellMatrix);

		for (let x = 0; x <= this.lastXIndex; x++) {
			for (let y = 0; y <= this.lastYIndex; y++) {
				const neighbors = this.calculateNeighboursFromCoors(x, y);
				const newStatus = this.cellMatrix[x][y].calculateNextStatusBasedOnNeighbours(neighbors);
				newCellMatrix[x][y].setStatus(newStatus);
			}
		}

		return newCellMatrix;
	};

	private isCellMatrixValidByCoors = (x: number, y: number): boolean => {
		return x >= 0 && x <= this.lastXIndex && y >= 0 && y <= this.lastYIndex;
	};

	private isAliveNeighboursByCoors = (x: number, y: number): boolean => {
		return this.isCellMatrixValidByCoors(x, y) && this.cellMatrix[x][y].getStatus() === Alive;
	};
}

export { World };
export default World;
