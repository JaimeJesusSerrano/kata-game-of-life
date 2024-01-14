import { Cell, CellStatus } from '../core/cell';

const Alive = CellStatus.alive;
const Dead = CellStatus.dead;

describe('Cell', () => {
	let cellAlive: Cell;
	let cellDead: Cell;

	beforeEach(() => {
		cellAlive = Cell.create(Alive);
		cellDead = Cell.create(Dead);
	});

	it('should be able to create a cell', () => {
		expect(cellAlive).toBeInstanceOf(Cell);
	});

	it('should be able to get the cell status', () => {
		expect(cellAlive.getStatus()).toBe(Alive);
		expect(cellDead.getStatus()).toBe(Dead);
	});

	it('any live cell with fewer than two live neighbours dies, as if caused by underpopulation', () => {
		expect(cellAlive.getNextCellStatus(0).getStatus()).toBe(Dead);
		expect(cellAlive.getNextCellStatus(1).getStatus()).toBe(Dead);
	});

	it('any live cell with more than three live neighbours dies, as if by overcrowding', () => {
		expect(cellAlive.getNextCellStatus(4).getStatus()).toBe(Dead);
		expect(cellAlive.getNextCellStatus(5).getStatus()).toBe(Dead);
		expect(cellAlive.getNextCellStatus(6).getStatus()).toBe(Dead);
	});

	it('any live cell with two or three live neighbours lives on the next generation', () => {
		expect(cellAlive.getNextCellStatus(2).getStatus()).toBe(Alive);
		expect(cellAlive.getNextCellStatus(3).getStatus()).toBe(Alive);
	});

	it('any dead cell with exactly three live neighbours becomes a live cell', () => {
		expect(cellDead.getNextCellStatus(3).getStatus()).toBe(Alive);
	});
});
