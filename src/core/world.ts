import { Cell } from './cell';

class World {
	private cells: Cell[][];

	getCells = () => this.cells;
}

export default World;
