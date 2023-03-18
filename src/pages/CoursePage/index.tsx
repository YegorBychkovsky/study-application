import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import {
  courseIdSelect,
  courseSelect,
  fetchingCourseById,
  firstVideoSelect,
} from '../../redux/slices/courseSlice/slice';
import { useAppDispatch } from '../../redux/store';
import styles from './CoursePage.module.scss';

import Hls from 'hls.js';
import { setInterval } from 'timers/promises';

const CoursePage = () => {
  const id = useSelector(courseIdSelect);
  const course = useSelector(courseSelect);
  const firstVideo = useSelector(firstVideoSelect);

  // const [progress, setProgress] = React.useState(0);

  // const handleProgress = (event: any) => {
  //   const video = event.target;
  //   const currentTime = video.currentTime;
  //   setProgress(currentTime);
  // };

  // React.useEffect(() => {
  //   localStorage.setItem('videoProgress', `${progress}`);
  // }, [progress]);

  // React.useEffect(() => {
  //   const storedProgress = localStorage.getItem('videoProgress');
  //   if (storedProgress) {
  //     setProgress(parseFloat(storedProgress));
  //   }
  // }, []);

  console.log(firstVideo);

  const [videoUrl, setVideoUrl] = React.useState(`${course?.lessons[0].link}`);
  const appDispatch = useAppDispatch();

  React.useEffect(() => {
    appDispatch(fetchingCourseById({ id }));
  }, []);

  React.useEffect(() => {
    console.log(course);
    console.log(firstVideo);

    handleMouseEnter(firstVideo);
  }, [firstVideo]);

  let i = 0;
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const handleMouseEnter = React.useCallback(
    (videoUrl: string, duration?: number, id?: string) => {
      const video = videoRef.current;
      const config = {
        startPosition: 1, // can be any number you want
      };
      if (video) {
        if (Hls.isSupported()) {
          const hls = new Hls(config);
          hls.loadSource(videoUrl);
          console.log(videoUrl);
          hls.attachMedia(video);
          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            video.play();
          });
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
          video.src = videoUrl + '?autoplay=1&second=15';
          video.addEventListener('loadedmetadata', () => {
            video.play();
          });
        }
      }
    },
    // },
    [videoUrl],
  );

  const video = document.createElement('video');

  const handleLessonClick = (status: string, url: string, duration: number, id: string) => {
    if (status === 'unlocked') {
      setVideoUrl(url);
      handleMouseEnter(url, duration, id);
    } else {
      alert('this video is locked');
    }
  };

  return (
    <div className={styles.container}>
      <Card
        sx={{
          maxWidth: 500,
          height: 1600,
          position: 'relative',
        }}>
        <video
          className={styles.video}
          height={300}
          ref={videoRef}
          // onTimeUpdate={handleProgress}
          controls
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" sx={{ height: 80 }}>
            {course?.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ height: 50 }}>
            {course?.description}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              paddingLeft: '10%',
              textAlign: 'start',
              paddingTop: '20px',
              height: 120,
            }}>
            <span>Lessons :</span> <br />
            {course?.lessons.map((lesson) => {
              i++;
              return (
                <span key={lesson.id} style={{ cursor: 'pointer' }}>
                  {i + '. '}
                  <b
                    onClick={() =>
                      handleLessonClick(lesson.status, lesson.link, lesson.duration, lesson.id)
                    }>
                    {lesson.title}
                    {lesson.status === 'unlocked' ? (
                      <>
                        <span style={{ color: 'green' }}> unlocked</span>
                        <br />
                      </>
                    ) : (
                      <>
                        <span style={{ color: 'red' }}> locked</span>
                        <br />
                      </>
                    )}
                  </b>
                </span>
              );
            })}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ paddingTop: '20px' }}></Typography>
        </CardContent>
        <CardActions sx={{ position: 'absolute', bottom: '10px' }}>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </div>
  );
};
export default CoursePage;
