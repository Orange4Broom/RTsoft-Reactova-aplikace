import ReactPaginate from "react-paginate"
import './AppPagination.css';



function AppPagination( props ) {
    const { totalPages, onChange } = props;

    return (
        
            <ReactPaginate 
                breakLabel="..."
                nextLabel=">"
                onPageChange={onChange}
                pageRangeDisplayed={3}
                pageCount={totalPages}
                previousLabel="<"
                renderOnZeroPageCount={null}
                containerClassName="pagination"
                pageClassName="page-num"
                previousLinkClassName="page-num"
                nextLinkClassName="page-num"
                activeLinkClassName="active"
            />
        
    )
}

export default AppPagination;