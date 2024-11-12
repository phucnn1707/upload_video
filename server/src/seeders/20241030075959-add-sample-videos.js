'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('videos', [
      {
        video_id: 1,
        user_id: 1,
        script_id: 1,
        video_url: 'https://example.com/videos/video1.mp4',
        srt_file_url: 'https://example.com/subtitles/video1.srt',
        title: 'Sample Video 1',
        duration: 120,
        is_uploaded: true,
        uploaded_at: new Date('2024-10-01T10:00:00Z'),
        image: 'https://example.com/images/video1.jpg',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        video_id: 2,
        user_id: 1,
        script_id: 2,
        video_url: 'https://example.com/videos/video2.mp4',
        srt_file_url: 'https://example.com/subtitles/video2.srt',
        title: 'Sample Video 2',
        duration: 180,
        is_uploaded: false,
        uploaded_at: null,
        image: 'https://example.com/images/video2.jpg',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        video_id: 3,
        user_id: 1,
        script_id: 3,
        video_url: 'https://example.com/videos/video3.mp4',
        srt_file_url: 'https://example.com/subtitles/video3.srt',
        title: 'Sample Video 3',
        duration: 150,
        is_uploaded: true,
        uploaded_at: new Date('2024-10-02T15:30:00Z'),
        image: 'https://example.com/images/video3.jpg',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('videos', null, {});
  },
};
