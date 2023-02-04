import React, { useState } from 'react'

function PlayerArea({ movie }) {

    const [playerState, setPlayerState] = useState("movie");


    return (
        movie.map((mov) => (
            <div key={mov.id} className='container player-area pt-3'>
                <div >
                    <div className='row'>
                        <iframe width="100%" height="480" src={playerState === "movie" && mov.link !== "" ? mov.link : mov.fragman} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen="1"></iframe>
                    </div>
                    <div className='ps-2 pe-2 d-flex justify-content-between align-items-center'>
                        <div className='player-buttons p-3 col-7'>
                            {mov.link !== "" ?
                                <button className={playerState === "movie" ? 'btn btn-primary btn-player rounded-pill active' : 'btn btn-primary btn-player rounded-pill'} onClick={() => setPlayerState("movie")}>Filmi İzle</button>
                                : null}
                            {mov.fragman !== null ?
                                <button className={playerState === "fragman" || mov.link === "" ? 'btn btn-primary active btn-player rounded-pill' : 'btn btn-primary btn-player rounded-pill'} onClick={() => setPlayerState("fragman")} >Fragman</button>
                                : null}
                        </div>
                        <div className="player-views p-3 pe-4  col-5 ">
                            <h6 className='text-end' style={{ color: "#62687c" }}><i className="fa-solid fa-eye"></i> <span style={{ color: "azure" }}>{mov.views}</span> Görüntülenme</h6>
                        </div>
                    </div>
                </div>
            </div>
        ))
    )
}


export default PlayerArea;
