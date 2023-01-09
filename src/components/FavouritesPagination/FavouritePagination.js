function getTotalFavouritePages( perPage) {
    if (!localStorage.getItem('posts')) return 0;

    const favouriteCount = JSON.parse(localStorage.getItem('posts')).length;

    return Math.ceil(favouriteCount / perPage);
}

export default getTotalFavouritePages;