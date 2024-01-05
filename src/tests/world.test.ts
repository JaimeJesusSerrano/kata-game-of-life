import { Cell, CellStatus } from '../core/cell';

const Alive = CellStatus.alive;
const Dead = CellStatus.dead;

class World {
	private readonly lastYIndex: number;
	private readonly lastXIndex: number;

	constructor(private cellMatrix: Cell[][]) {
		this.cellMatrix = cellMatrix;
		this.lastYIndex = cellMatrix.length - 1;
		this.lastXIndex = cellMatrix.length - 1;
	}

	getCellMatrix = () => this.cellMatrix;

	calculateNeighboursFromCoors(x: number, y: number) {
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
	}

	private isCellMatrixValidByCoors = (x: number, y: number) => {
		return x >= 0 && x <= this.lastXIndex && y >= 0 && y <= this.lastYIndex;
	};

	private isAliveNeighboursByCoors = (x: number, y: number) => {
		return this.isCellMatrixValidByCoors(x, y) && this.cellMatrix[x][y].getStatus() === Alive;
	};
}

describe('The World', () => {
	it('creates a cell matrix for a given cell status', () => {
		const initialStatus = [
			[new Cell(Dead), new Cell(Dead), new Cell(Dead)],
			[new Cell(Dead), new Cell(Alive), new Cell(Alive)],
			[new Cell(Alive), new Cell(Dead), new Cell(Dead)],
		];

		const world = new World(initialStatus);

		expect(world.getCellMatrix()).toEqual(initialStatus);
	});

	it('number of alive neighbours is calculate correctly', () => {
		const initialStatus = [
			[new Cell(Dead), new Cell(Dead), new Cell(Dead)],
			[new Cell(Dead), new Cell(Alive), new Cell(Alive)],
			[new Cell(Alive), new Cell(Dead), new Cell(Dead)],
		];

		const world = new World(initialStatus);

		expect(world.calculateNeighboursFromCoors(0, 0)).toBe(1);
		expect(world.calculateNeighboursFromCoors(0, 1)).toBe(2);
		expect(world.calculateNeighboursFromCoors(0, 2)).toBe(2);

		expect(world.calculateNeighboursFromCoors(1, 0)).toBe(2);
		expect(world.calculateNeighboursFromCoors(1, 1)).toBe(2);
		expect(world.calculateNeighboursFromCoors(1, 2)).toBe(1);

		expect(world.calculateNeighboursFromCoors(2, 0)).toBe(1);
		expect(world.calculateNeighboursFromCoors(2, 1)).toBe(3);
		expect(world.calculateNeighboursFromCoors(2, 2)).toBe(2);
	});
});
