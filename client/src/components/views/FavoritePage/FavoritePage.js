import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import './Favorite.css';
import { Popover } from 'antd';
import {IMAGE_BASE_URL} from '../Config';


function FavoritePage() {

    const [Favorite, setFavorite] = useState([]);

    useEffect(() => {
         fetchFavoratedMovie()

    }, [])

    const fetchFavoratedMovie = () => {
        Axios.post('/api/favorite/getFavoritedMovie', { userFrom: localStorage.getItem('userId') })
            .then(response => {
                if (response.data.success) {
                    setFavorite(response.data.favorites)
                } else {
                    alert('영화 정보를 가져오는데 실패 했습니다.')
                }
            })

    }

    const onClickDelete =(movieId, userFrom) => {
        const variables = {
            movieId,
            userFrom
        }

        Axios.post('/api/favorite/removeFromFavorite', variables)
        .then(response => {
            if(response.data.success){
                fetchFavoratedMovie()
            } else {
                alert("리스트에서 지우는데 실패했습니다.")
            }
        })
        
    }
    const renderCards = Favorite.map((favorite, index) => {
        const content = (
            <div>
                {favorite.moviePost ?
                    <img src={`${IMAGE_BASE_URL}w500${favorite.moviePost}`}    /> : "no Image"}
            </div>
        )
        return <tr key={index}>
            <Popover content={content} title={`${favorite.movieTitle}`}>
                <td>{favorite.movieTitle}</td>
            </Popover>
            <td>{favorite.movieRunTime} mins</td>
            <td><button onClick={() => onClickDelete(favorite.movieId, favorite.userFrom)}>Remove</button></td> 
        </tr>
    })

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <h2> Favorite Movies</h2>
            <hr />

            <table>
                <thead>
                    <tr>
                        <th>Movie title</th>
                        <th>Movie Runtime</th>
                        <td>Remove From Favorites</td>
                    </tr>
                </thead>
                <tbody>
                    {renderCards}
                </tbody>
            </table>
        </div>
    )
}

export default FavoritePage
