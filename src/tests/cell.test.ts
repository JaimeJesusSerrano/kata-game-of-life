import { Cell, CellStatus } from '../core/cell';

describe('Cell', () => {
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

	it('any live cell with fewer than two live neighbours dies, as if caused by underpopulation', () => {
		expect(cellAlive.calculateStatusBasedOnNeighbours(0)).toBe(CellStatus.dead);
		expect(cellAlive.calculateStatusBasedOnNeighbours(1)).toBe(CellStatus.dead);
	});

	it('any live cell with more than three live neighbours dies, as if by overcrowding', () => {
		expect(cellAlive.calculateStatusBasedOnNeighbours(4)).toBe(CellStatus.dead);
		expect(cellAlive.calculateStatusBasedOnNeighbours(5)).toBe(CellStatus.dead);
		expect(cellAlive.calculateStatusBasedOnNeighbours(6)).toBe(CellStatus.dead);
	});

	it('any live cell with two or three live neighbours lives on the next generation', () => {
		expect(cellAlive.calculateStatusBasedOnNeighbours(2)).toBe(CellStatus.alive);
		expect(cellAlive.calculateStatusBasedOnNeighbours(3)).toBe(CellStatus.alive);
	});

	it('any dead cell with exactly three live neighbours becomes a live cell', () => {
		expect(cellDead.calculateStatusBasedOnNeighbours(3)).toBe(CellStatus.alive);
	});
});
