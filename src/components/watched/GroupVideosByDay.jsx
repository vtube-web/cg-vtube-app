const groupVideosByDay = (videos, existingGroupedVideos) => {
    const groupedVideos = { ...existingGroupedVideos };
  videos.forEach((video) => {
    if (video && video.watchedAt) {
      const dateParts = video.watchedAt.split("T");
      if (dateParts.length > 0) {
        const date = dateParts[0];
        if (!groupedVideos[date]) {
          groupedVideos[date] = [];
        }
        groupedVideos[date].push(video);
      }
    }
  });
  return groupedVideos;
};

export default groupVideosByDay;
