import Icon from "../Icon/Icon";

function FavouritesContent() {
    return (
        <>
            <div id="content">
                <div id="table-body">
                    <div id="table-container">
                        <div id="table">

                            <table>
                                <thead>
                                    <tr id='headers'>
                                        <th>Id</th>
                                        <th>Titulek</th>
                                        <th>Autor</th>
                                        <th>Datum</th>
                                        <th>Odkaz</th>
                                        <th>Oblíbené</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr id="posts">
                                        <td>2465486</td>
                                        <td className='title-post'>Google is working on cross-device notifications to let you resume media playback on the move</td>
                                        <td className='author-post'>Haje Jan Kamps</td>
                                        <td className='date-post'>5. 1. 2023</td>
                                        <td className='link-post'><a href="" target="_blank" rel="noreferrer"><Icon name="arrow-up-right-from-square" type="fas"/></a></td>
                                        <td className='favourite'>
                                        <button><Icon name="shrimp" type="fas" /></button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FavouritesContent;