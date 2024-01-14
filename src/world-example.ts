import { Cell, CellStatus } from './core/cell';
import { World } from './core/world';

const Alive = CellStatus.alive;
const Dead = CellStatus.dead;

const initialStatus = [
	[
		Cell.create(Dead),
		Cell.create(Dead),
		Cell.create(Dead),
		Cell.create(Dead),
		Cell.create(Dead),
		Cell.create(Dead),
		Cell.create(Dead),
		Cell.create(Dead),
	],
	[
		Cell.create(Dead),
		Cell.create(Alive),
		Cell.create(Dead),
		Cell.create(Dead),
		Cell.create(Dead),
		Cell.create(Dead),
		Cell.create(Dead),
		Cell.create(Dead),
	],
	[
		Cell.create(Dead),
		Cell.create(Dead),
		Cell.create(Alive),
		Cell.create(Dead),
		Cell.create(Dead),
		Cell.create(Dead),
		Cell.create(Dead),
		Cell.create(Dead),
	],
	[
		Cell.create(Alive),
		Cell.create(Alive),
		Cell.create(Alive),
		Cell.create(Dead),
		Cell.create(Dead),
		Cell.create(Dead),
		Cell.create(Dead),
		Cell.create(Dead),
	],
	[
		Cell.create(Dead),
		Cell.create(Dead),
		Cell.create(Dead),
		Cell.create(Dead),
		Cell.create(Dead),
		Cell.create(Dead),
		Cell.create(Dead),
		Cell.create(Dead),
	],
	[
		Cell.create(Dead),
		Cell.create(Dead),
		Cell.create(Dead),
		Cell.create(Dead),
		Cell.create(Dead),
		Cell.create(Dead),
		Cell.create(Dead),
		Cell.create(Dead),
	],
	[
		Cell.create(Dead),
		Cell.create(Dead),
		Cell.create(Dead),
		Cell.create(Dead),
		Cell.create(Dead),
		Cell.create(Dead),
		Cell.create(Dead),
		Cell.create(Dead),
	],
	[
		Cell.create(Dead),
		Cell.create(Dead),
		Cell.create(Dead),
		Cell.create(Dead),
		Cell.create(Dead),
		Cell.create(Dead),
		Cell.create(Dead),
		Cell.create(Dead),
	],
];

let world = World.createFrom(initialStatus);
console.log(world.toString());

setInterval(() => {
	world = world.getNextGeneration();
	console.log(world.toString());
}, 1000);
