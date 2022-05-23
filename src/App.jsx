import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import BandList from './components/BandList';
import BandAdd from './components/BandAdd';

const connectSocketServer = () => {
  const socket = io.connect('http://localhost:8080', {
    transports: ['websocket'],
    autoConnect: true,
  });

  return socket;
};

function App() {
  const [socket] = useState(() => connectSocketServer());
  const [isOnline, setIsOnline] = useState(false);
  const [bands, setBands] = useState([]);

  useEffect(() => {
    setIsOnline(socket.connected);
  }, [socket]);

  useEffect(() => {
    socket.on('connect', () => {
      setIsOnline(true);
    });
  }, [socket]);

  useEffect(() => {
    socket.on('disconnect', () => {
      setIsOnline(false);
    });
  }, [socket]);

  useEffect(() => {
    socket.on('current-bands', (bands) => {
      setBands(bands);
    });
  }, [socket]);

  const vote = (id) => {
    socket.emit('vote-band', id);
  };

  const deleteBand = (id) => {
    socket.emit('delete-band', id);
  };

  const renameBand = (id, newName) => {
    socket.emit('rename-band', { id, newName });
  };

  const createBand = (bandName) => {
    socket.emit('create-band', { bandName });
  };

  return (
    <div className='container'>
      <div className='alert'>
        <p>
          Service status:
          {isOnline ? (
            <span className='text-success'> Online</span>
          ) : (
            <span className='text-danger'> Offline</span>
          )}
        </p>
      </div>

      <h1>Band Names</h1>
      <hr />
      <div className='row'>
        <div className='col-8'>
          <BandList
            data={bands}
            vote={vote}
            deleteBand={deleteBand}
            renameBand={renameBand}
          />
        </div>
        <div className='col-4'>
          <BandAdd createBand={createBand} />
        </div>
      </div>
    </div>
  );
}

export default App;
