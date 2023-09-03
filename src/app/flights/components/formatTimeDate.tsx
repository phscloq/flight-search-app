const formatTime = (isoTimestamp: any) => {
    const timestamp = new Date(isoTimestamp).getTime();
    const formattedTime = new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'UTC',
      hour12:false
    });
    return formattedTime;
  };
  const formatDate = (isoTimestamp: any) => {
    const timestamp = new Date(isoTimestamp).getTime();
    const formattedDate = new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    return formattedDate;
  };

  export {formatDate, formatTime};