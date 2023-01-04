import Pages from "../Pages/Pages";
import './TableFooter.css';

function TableFooter() {
    return (
        <div id="table-footer">
            <Pages/>
            <select name="result-sum" id="result-sum">
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
            </select>
        </div>
    )
}

export default TableFooter;