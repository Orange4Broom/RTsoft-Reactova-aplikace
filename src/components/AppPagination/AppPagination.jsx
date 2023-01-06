import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate"



function AppPagination( data ) {
    const { post } = data;
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 20;

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(post.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(post.lenght / itemsPerPage));
    }, [itemOffset, itemsPerPage, post]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % post.lenght;
        setItemOffset(newOffset);
    };

    return (
        <ReactPaginate 
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            pageCount={pageCount}
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