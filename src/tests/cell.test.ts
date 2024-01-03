import { Cell, CellStatus } from '../core/Cell';

describe('The Bowling Game', () => {
	let cell: Cell;

	beforeEach(() => {
		cell = new Cell(CellStatus.dead);
	});

	it('should be able to create a cell', () => {
		expect(cell).toBeInstanceOf(Cell);
	});

	it('should be able to get the cell status as dead by default', () => {
		cell.getStatus();
		expect(cell.getStatus()).toBe(CellStatus.dead);
	});

	it('should be able to modify the cell status', () => {
		cell.setStatus(CellStatus.alive);
		expect(cell.getStatus()).toBe(CellStatus.alive);
	});

	it('Cualquier célula viva con menos de dos vecinos vivos muere, por poca población', () => {
		expect(cell.calculateStatusBasedOnNeighbors(1)).toBe(CellStatus.dead);
	});

	it('Cualquier célula viva con mas de tres vecinos muere, por sobrepoblación', () => {
		expect(cell.calculateStatusBasedOnNeighbors(4)).toBe(CellStatus.dead);
	});
});
