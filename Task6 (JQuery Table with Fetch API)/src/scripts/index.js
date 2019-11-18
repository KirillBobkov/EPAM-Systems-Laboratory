import '../styles/index.scss';
import { TableController } from './controller';
import { TableView } from './view';
import { TableModel } from './model';


function init() {
  const table = new TableController(new TableView(), new TableModel());
  table.loadTable();
}

init();

