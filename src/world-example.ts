import { Cell, CellStatus } from './core/cell';
import { World } from './core/world';

const Alive = CellStatus.alive;
const Dead = CellStatus.dead;

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
		new Cell(Alive),
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
		new Cell(Alive),
		new Cell(Dead),
		new Cell(Dead),
		new Cell(Dead),
		new Cell(Dead),
		new Cell(Dead),
	],
	[
		new Cell(Alive),
		new Cell(Alive),
		new Cell(Alive),
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

let world = new World(initialStatus);
console.log(world.toString());

setInterval(() => {
	world = new World(world.getNextGenerationCellMatrix());
	console.log(world.toString());
}, 1000);
