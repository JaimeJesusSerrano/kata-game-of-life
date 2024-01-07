import { Cell, CellStatus } from '../core/cell';
import { World } from '../core/world';

const Alive = CellStatus.alive;
const Dead = CellStatus.dead;

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

	it('print it correctly', () => {
		const initialStatus = [
			[new Cell(Dead), new Cell(Dead), new Cell(Dead)],
			[new Cell(Dead), new Cell(Alive), new Cell(Alive)],
			[new Cell(Alive), new Cell(Dead), new Cell(Dead)],
		];

		const world = new World(initialStatus);

		expect(world.toString()).toBe(' [ ] [ ] [ ]\n [ ] [O] [O]\n [O] [ ] [ ]\n');
	});

	it('print next status correctly', () => {
		const initialStatus = [
			[new Cell(Dead), new Cell(Dead), new Cell(Dead)],
			[new Cell(Dead), new Cell(Alive), new Cell(Alive)],
			[new Cell(Alive), new Cell(Dead), new Cell(Dead)],
		];

		const world = new World(initialStatus);
		const worldNextTick = new World(world.getNextGenerationCellMatrix());

		expect(worldNextTick.toString()).toBe(' [ ] [ ] [ ]\n [ ] [O] [ ]\n [ ] [O] [ ]\n');
	});

	it('print next status correctly with a complex example', () => {
		const initialStatus = [
			[
				new Cell(Dead),
				new Cell(Dead),
				new Cell(Dead),
				new Cell(Dead),
				new Cell(Dead),
				new Cell(Dead),
				new Cell(Dead),
				new Cell(Dead),
			],
			[
				new Cell(Dead),
				new Cell(Dead),
				new Cell(Dead),
				new Cell(Dead),
				new Cell(Alive),
				new Cell(Dead),
				new Cell(Dead),
				new Cell(Dead),
			],
			[
				new Cell(Dead),
				new Cell(Dead),
				new Cell(Dead),
				new Cell(Alive),
				new Cell(Alive),
				new Cell(Dead),
				new Cell(Dead),
				new Cell(Dead),
			],
			[
				new Cell(Dead),
				new Cell(Dead),
				new Cell(Dead),
				new Cell(Dead),
				new Cell(Dead),
				new Cell(Dead),
				new Cell(Dead),
				new Cell(Dead),
			],
			[
				new Cell(Dead),
				new Cell(Dead),
				new Cell(Dead),
				new Cell(Dead),
				new Cell(Dead),
				new Cell(Dead),
				new Cell(Dead),
				new Cell(Dead),
			],
			[
				new Cell(Dead),
				new Cell(Dead),
				new Cell(Dead),
				new Cell(Dead),
				new Cell(Dead),
				new Cell(Dead),
				new Cell(Dead),
				new Cell(Dead),
			],
			[
				new Cell(Dead),
				new Cell(Dead),
				new Cell(Dead),
				new Cell(Dead),
				new Cell(Dead),
				new Cell(Dead),
				new Cell(Dead),
				new Cell(Dead),
			],
			[
				new Cell(Dead),
				new Cell(Dead),
				new Cell(Dead),
				new Cell(Dead),
				new Cell(Dead),
				new Cell(Dead),
				new Cell(Dead),
				new Cell(Dead),
			],
		];

		const world = new World(initialStatus);
		const worldNextTick = new World(world.getNextGenerationCellMatrix());

		expect(worldNextTick.toString()).toBe(
			' [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ]\n [ ] [ ] [ ] [O] [O] [ ] [ ] [ ]\n [ ] [ ] [ ] [O] [O] [ ] [ ] [ ]\n [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ]\n [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ]\n [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ]\n [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ]\n [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ]\n'
		);
	});
});
