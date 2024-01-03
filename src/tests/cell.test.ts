import { Cell, CellStatus } from '../core/Cell';

describe('The Bowling Game', () => {
	let cellAlive: Cell;
	let cellDead: Cell;

	beforeEach(() => {
		cellAlive = new Cell(CellStatus.alive);
		cellDead = new Cell(CellStatus.dead);
	});

	it('should be able to create a cell', () => {
		expect(cellAlive).toBeInstanceOf(Cell);
	});

	it('should be able to get the cell status', () => {
		expect(cellAlive.getStatus()).toBe(CellStatus.alive);
		expect(cellDead.getStatus()).toBe(CellStatus.dead);
	});

	it('should be able to modify the cell status', () => {
		cellDead.setStatus(CellStatus.alive);
		expect(cellDead.getStatus()).toBe(CellStatus.alive);
	});

	it('Cualquier célula viva con menos de dos vecinos vivos muere, por poca población', () => {
		expect(cellAlive.calculateStatusBasedOnNeighbors(1)).toBe(CellStatus.dead);
	});

	it('Cualquier célula viva con mas de tres vecinos muere, por sobrepoblación', () => {
		expect(cellAlive.calculateStatusBasedOnNeighbors(4)).toBe(CellStatus.dead);
	});

	it('Cualquier célula viva con dos o tres vecinos, vive', () => {
		expect(cellAlive.calculateStatusBasedOnNeighbors(2)).toBe(CellStatus.alive);
	});

	it('Célula muerta con 3 vecinos, resucita', () => {
		expect(cellDead.calculateStatusBasedOnNeighbors(3)).toBe(CellStatus.alive);
	});
});
