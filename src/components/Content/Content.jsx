import TableFilters from '../TableFilters/TableFilters';
import Table from '../Table/Table';
import TableFooter from '../TableFooter/TableFooter';
import './Content.css';

function Content() {
    return (
        <div id="content">
            <TableFilters />
            <Table />
            <TableFooter />
        </div>
    )
}

export default Content