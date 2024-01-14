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

	it('any live cell with fewer than two live neighbours dies, as if caused by underpopulation', () => {
		expect(cellAlive.nextCellStatus(0).getStatus()).toBe(CellStatus.dead);
		expect(cellAlive.nextCellStatus(1).getStatus()).toBe(CellStatus.dead);
	});

	it('any live cell with more than three live neighbours dies, as if by overcrowding', () => {
		expect(cellAlive.nextCellStatus(4).getStatus()).toBe(CellStatus.dead);
		expect(cellAlive.nextCellStatus(5).getStatus()).toBe(CellStatus.dead);
		expect(cellAlive.nextCellStatus(6).getStatus()).toBe(CellStatus.dead);
	});

	it('any live cell with two or three live neighbours lives on the next generation', () => {
		expect(cellAlive.nextCellStatus(2).getStatus()).toBe(CellStatus.alive);
		expect(cellAlive.nextCellStatus(3).getStatus()).toBe(CellStatus.alive);
	});

	it('any dead cell with exactly three live neighbours becomes a live cell', () => {
		expect(cellDead.nextCellStatus(3).getStatus()).toBe(CellStatus.alive);
	});
});
