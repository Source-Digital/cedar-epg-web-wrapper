import React, { useState, useEffect } from 'react';
import './EpgComponent.css';

const EpgComponent = ({
  type = "FullEPG",
  onSelectEpgChannel,
  onSelectEpgChannelProgram,
  onDataLoaded,
  activeChannelIndex = 0,
  logoAspectRatio = 1,
  numberOfDays = 7,
  buttonIcon,
  style = {}
}) => {
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock data for demonstration
  const mockChannels = [
    {
      id: 1,
      name: "BKFC TV",
      logo: "https://via.placeholder.com/80x40/ff6b35/white?text=BKFC",
      programs: [
        {
          id: 101,
          title: "Bare Knuckle Championship",
          startTime: new Date().toISOString(),
          endTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
          description: "Live championship fight"
        },
        {
          id: 102,
          title: "Fight Highlights",
          startTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
          endTime: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(),
          description: "Best moments compilation"
        }
      ]
    }
  ];

  useEffect(() => {
    // Simulate loading EPG data
    setLoading(true);
    setTimeout(() => {
      setChannels(mockChannels);
      setLoading(false);
      if (onDataLoaded) {
        onDataLoaded(mockChannels);
      }
    }, 1000);
  }, [numberOfDays]);

  const handleChannelClick = (channel, index) => {
    if (onSelectEpgChannel) {
      onSelectEpgChannel(channel, index);
    }
  };

  const handleProgramClick = (program, channel, index) => {
    if (onSelectEpgChannelProgram) {
      onSelectEpgChannelProgram(program, channel, index);
    }
  };

  const formatTime = (timeString) => {
    return new Date(timeString).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (loading) {
    return (
      <div className="epg-loading" style={style}>
        <div className="spinner">Loading EPG...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="epg-error" style={style}>
        <p>Error loading EPG: {error}</p>
      </div>
    );
  }

  return (
    <div className={`epg-component epg-${type.toLowerCase()}`} style={style}>
      <div className="epg-header">
        <h3>TV Guide - Next {numberOfDays} Days</h3>
      </div>
      
      <div className="epg-grid">
        {channels.map((channel, channelIndex) => (
          <div 
            key={channel.id} 
            className={`epg-channel ${channelIndex === activeChannelIndex ? 'active' : ''}`}
            onClick={() => handleChannelClick(channel, channelIndex)}
          >
            <div className="channel-info">
              <div 
                className="channel-logo"
                style={{ aspectRatio: logoAspectRatio }}
              >
                <img 
                  src={channel.logo} 
                  alt={channel.name}
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/80x40/666/white?text=${channel.name.substring(0, 3)}`;
                  }}
                />
              </div>
              <div className="channel-name">{channel.name}</div>
            </div>
            
            <div className="programs-list">
              {channel.programs?.map((program, programIndex) => (
                <div 
                  key={program.id}
                  className="program-item"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleProgramClick(program, channel, channelIndex);
                  }}
                >
                  <div className="program-time">
                    {formatTime(program.startTime)} - {formatTime(program.endTime)}
                  </div>
                  <div className="program-title">{program.title}</div>
                  <div className="program-description">{program.description}</div>
                  {buttonIcon && (
                    <div className="program-button">
                      <img src={buttonIcon} alt="Play" className="button-icon" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EpgComponent;