import { reducerCases } from "./constants"



export const initialState = {
    token:null,
    playlists:[],
    userInfo: null,
    selectedPlaylistId:"4HXMPRVKOAfzoUwws8fqHW",
    selectedPlaylist: null,
    currentlyPlaying: null,
    playerstate: false

}

  const reducer = (state,action) => {
    switch(action.type) {
        case reducerCases.set_token : {
            return {
                ...state, token : action.token 
            }
        }
        case reducerCases.set_playlist: {
            return {
                ...state,
                playlists: action.playlists
            }
        }
        case reducerCases.set_user: {
            return {
                ...state, 
                userInfo:action.userInfo
            }
        }
        case reducerCases.selected_playlist: {
           return {
            ...state, 
            selectedPlaylist: action.selectedPlaylist
           }
        }
        case reducerCases.set_playing: {
            return {
                ...state,
              currentlyPlaying: action.currentlyPlaying
            }
        }
        case reducerCases.set_player_state: {
            return {
                ...state,
                playerstate: action.playerstate
            }
        }
        case reducerCases.set_playlist_id: {
            return {
                ...state,
                selectedPlaylistId: action.selectedPlaylistId
            }
        }
        default:
            return state
    }
}

export default reducer