import React from 'react';
import './App.css';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listSong: [],
      songs: [],
      visual: 1,
      visible: "play",
      invisible: "pause"
      
    };
    this.player = null;

  }


  idname(e, i) {
    e.preventDefault();

    this.player = document.querySelectorAll("audio")[i];
    this.player.play()
    
  }

  componentDidMount() {
    this.getSongs('https://assets.breatheco.de/apis/sound/songs');
  }
  getSongs(url) {
    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        console.log(data);
        this.setState({
          songs: data
        });
      })
      .catch(error => console.log(error))
  }

  

  render() {
    return (
      
      <div>
        <ol>
          {
            this.state.songs.map((item, i) => (

              <li onClick={(e) => this.idname(e, i)} key={i}>
                {item.name}
                <audio ref={(t) => this.player = t}>
                  <source src={"https://assets.breatheco.de/apis/sound/" + item.url} type="audio/mp3" />
                  {console.log(item.url)}
                  Your browser does not support the audio element.
                </audio>
              </li>
            ))
          }
        </ol>
        <div className="btn-group d-flex justify-content-center" role="group" aria-label="Basic example">
          <span>
  <button type="button" class="btn btn-secondary" onClick={() => this.player.play()}>▶</button>
  <button type="button" class="btn btn-secondary" onClick={() => this.player.pause()}>||</button>
  </span>
</div>


      </div>
    )
  }

}


export default App;
